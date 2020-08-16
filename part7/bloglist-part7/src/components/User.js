import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const params = useParams();
  const user = users.find((user) => params.id === user.id);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <div>
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default User;
