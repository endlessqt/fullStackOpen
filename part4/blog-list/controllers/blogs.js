const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);
  if (blog.likes < 0) {
    throw new Error("likes must be positive integer or zero");
  }

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});
blogsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404).end();
  } else {
    res.json(blog);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  const updatedBlog = {
    ...blog.toJSON(),
    likes: req.body.likes,
  };
  const updated = await Blog.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
  });
  res.json(updated);
});

module.exports = blogsRouter;
