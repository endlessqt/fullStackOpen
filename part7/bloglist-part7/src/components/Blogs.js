import React from "react";
import { Link } from "react-router-dom";
function Blogs({ blogs }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return blogs.map((blog) => {
    return (
      <div style={blogStyle} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    );
  });
}

export default Blogs;
