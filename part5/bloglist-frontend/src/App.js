import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const userJSON = window.localStorage.getItem("userLoggedInBlogsApp");
    if (userJSON) {
      const userObj = JSON.parse(userJSON);
      setUser(userObj);
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
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("userLoggedInBlogsApp");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log In </h2>
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
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
