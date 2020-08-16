import React, { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import ToggableDiv from "./components/ToggableDiv";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from "react-redux";
import { initBlogs, addBlog } from "./reducers/blogReducer";
import { userLogout, userLogin, setUser } from "./reducers/userReducer";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import { Switch, Route } from "react-router-dom";

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
      <Navigation user={user} handleLogout={handleLogout} />
      <Notification />
      <h2>Blog App</h2>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} user={user} />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <ToggableDiv btnText="create blog" ref={blogFormRef}>
            <BlogForm createBlog={addNewBlog} />
          </ToggableDiv>
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
