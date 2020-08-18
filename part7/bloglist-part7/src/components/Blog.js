import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";

const Blog = ({ blogs, user }) => {
  const [comment, setComment] = useState("");
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
  const commentPost = (id, comment) => {
    if (!comment.length) {
      setComment("");
      return;
    }
    const newBlog = {
      ...blog,
      user: blog.user.id,
      comment: comment,
    };
    dispatch(commentBlog(id, newBlog));
    setComment("");
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
      <div>
        <h3>Comments</h3>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />{" "}
        <button onClick={() => commentPost(blog.id, comment)}>
          add comment
        </button>
        {blog.comments.length !== 0 ? (
          <ul>
            {blog.comments.map((comment, index) => {
              /*I know that indexies as key is bad idea, but there is no possible problems with that implementation 
            because we have no delete functionality on comments, so it's not gonna cause any problems in that app.
            Possible solution is save generated ids to db and use them, i know i'm sorry and lazy to implement it just now */

              return <li key={index}>{comment}</li>;
            })}
          </ul>
        ) : (
          <p>{"Be the very first commentator of that blog"}</p>
        )}
      </div>
    </div>
  );
};
export default Blog;
