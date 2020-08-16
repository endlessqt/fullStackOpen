import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({ user, handleLogout }) => {
  return (
    <div>
      <Link to="/blogs">Blogs</Link> <Link to="/users">Users</Link>{" "}
      {user ? user.username : ""} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Navigation;
