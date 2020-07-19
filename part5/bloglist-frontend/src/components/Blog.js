import React, { useState } from "react";
const Blog = ({ blog, like, del, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };
  const showed = { display: visible ? "" : "none" };
  const hidden = { display: visible ? "none" : "" };
  return (
    <div style={blogStyle}>
      <div style={hidden}>
        {blog.title} by {blog.author}
        <button onClick={handleVisibility}>view</button>
      </div>
      <div style={showed}>
        {blog.title} by {blog.author}{" "}
        <button onClick={handleVisibility}>hide</button>
        <br />
        {blog.url} <br />
        likes:{blog.likes} <button onClick={like}>like</button> <br />
        Created by: {blog.user.username}
        <div style={{ display: blog.user.username === user ? "" : "none" }}>
          <button onClick={del}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
