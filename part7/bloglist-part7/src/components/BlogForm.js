import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addNewBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      url,
      author,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };
  return (
    <div id="blogForm">
      <h2>Create new blog</h2>
      <div>
        <form onSubmit={addNewBlog}>
          <div>
            title
            <input
              id="title"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author"
              type="text"
              value={author}
              name="title"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url"
              type="text"
              value={url}
              name="title"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button id="buttonSubmit" type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
export default BlogForm;
