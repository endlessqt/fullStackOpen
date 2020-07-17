import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      const newBlog = await blogService.create({ title, url, author });
      setBlogs(blogs.concat(newBlog));
      setAuthor("");
      setTitle("");
      setUrl("");
      setNotification({
        type: "ok",
        message: `New blog: ${newBlog.title} by ${newBlog.author} added to blog list`,
      });
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
  if (user === null) {
    return (
      <div>
        <h2>Log In </h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
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
      <h2>Add new blog</h2>
      <div>
        <form onSubmit={addNewBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="title"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="title"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
