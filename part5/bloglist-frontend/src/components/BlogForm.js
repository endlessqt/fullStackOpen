import React, { useState } from "react";

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
    <div>
      <h2>Create new blog</h2>
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
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
