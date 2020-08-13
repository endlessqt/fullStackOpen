import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import ToggableDiv from "./components/ToggableDiv";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from "react-redux";
import {
  initBlogs,
  addBlog,
  deleteBlog,
  likeBlog,
} from "./reducers/blogReducer";
import { userLogout, userLogin, setUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //blogs fetch
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );
  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  const addNewBlog = (blogObject) => {
    blogFormRef.current.handleVisibility();
    blogService.setToken(user.token);
    dispatch(addBlog(blogObject));
  };
  const updateLikes = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(id, newBlog));
  };
  const deletePost = (id) => {
    blogService.setToken(user.token);
    const blog = blogs.find((blog) => id === blog.id);
    if (
      window.confirm(
        `Do you really wish to delete ${blog.title} by ${blog.author}`
      )
    ) {
      dispatch(deleteBlog(id));
    }
  };
  //blogs

  //user
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(userLogin({ username, password }));
    setUsername("");
    setPassword("");
  };
  const handleLogout = () => {
    dispatch(userLogout());
  };
  //user

  const blogFormRef = useRef();
  if (user === null) {
    return (
      <div>
        <h2>Log In </h2>
        <Notification />
        <form onSubmit={handleLogin} id="logInForm">
          <div>
            username
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="text"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.username} Logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <ToggableDiv btnText="create blog" ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </ToggableDiv>
      <div id="blogWrapper">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => updateLikes(blog.id)}
            del={() => deletePost(blog.id)}
            user={user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
