import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import blogService from "../services/blogs";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blogs, user }) => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const blog = blogs.find((blog) => blog.id === params.id);
  const updateLikes = (id) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(id, newBlog));
  };
  const deletePost = (id) => {
    blogService.setToken(user.token);
    if (
      window.confirm(
        `Do you really wish to delete ${blog.title} by ${blog.author}`
      )
    ) {
      dispatch(deleteBlog(id));
      history.push("/");
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={`${blog.url}`} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => updateLikes(blog.id)}>like</button>
      </div>
      <div>Added by {blog.user.username}</div>
      <button
        style={{ display: blog.user.username === user.username ? "" : "none" }}
        onClick={() => deletePost(blog.id)}>
        delete
      </button>
    </div>
  );
};
export default Blog;
