import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ToggableDiv from "./components/ToggableDiv";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from "react-redux";
import { initBlogs, addBlog, deleteBlog } from "./reducers/blogReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();

  //blogs fetch
  const blogs = useSelector((state) => state);
  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);
  //blogs

  useEffect(() => {
    const userJSON = window.localStorage.getItem("userLoggedInBlogsApp");
    if (userJSON) {
      const userObj = JSON.parse(userJSON);
      setUser(userObj);
      blogService.setToken(userObj.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("userLoggedInBlogsApp", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("userLoggedInBlogsApp");
    setUser(null);
  };
  const addNewBlog = async (blogObject) => {
    try {
      blogFormRef.current.handleVisibility();
      blogService.setToken(user.token);
      dispatch(addBlog(blogObject));
      // setNotification({
      //   type: "ok",
      //   message: `New blog: ${newBlog.title} by ${newBlog.author} added to blog list`,
      // });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({ type: "error", message: error.response.data.error });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  const updateLikes = async (id) => {
    // try {
    //   // const blog = blogs.find((blog) => blog.id === id);
    //   const newBlog = {
    //     ...blog,
    //     user: blog.user.id,
    //     likes: blog.likes + 1,
    //   };
    //   const res = await blogService.update(id, newBlog);
    //   setBlogs(
    //     blogs.map((blog) =>
    //       blog.id === id ? { ...res, user: blog.user } : blog
    //     )
    //   );
    // } catch (error) {
    //   setBlogs(blogs.filter((blog) => blog.id !== id));
    //   setNotification({
    //     type: "error",
    //     message: "Blog was deleted",
    //   });
    //   setTimeout(() => {
    //     setNotification(null);
    //   }, 10000);
    // }
  };
  const deletePost = async (id) => {
    try {
      blogService.setToken(user.token);
      const blog = blogs.find((blog) => id === blog.id);
      if (
        window.confirm(
          `Do you really wish to delete ${blog.title} by ${blog.author}`
        )
      ) {
        dispatch(deleteBlog(id));
        // setNotification({
        //   type: "ok",
        //   message: `Blog ${blog.title} by ${blog.author} deleted from the server`,
        // });
        // setTimeout(() => {
        //   setNotification(null);
        // }, 5000);
      }
    } catch (error) {
      // setNotification({
      //   type: "error",
      //   message: error.response.data.error,
      // });
      // setTimeout(() => {
      //   setNotification(null);
      // }, 5000);
    }
  };

  const blogFormRef = useRef();
  if (user === null) {
    return (
      <div>
        <h2>Log In </h2>
        <Notification notification={notification} />
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
      <Notification notification={notification} />
      <div>
        {user.username} logged in
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
