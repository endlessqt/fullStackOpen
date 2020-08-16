const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  try {
    var decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch (err) {
    return res.status(401).json(err);
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  });
  if (blog.likes < 0) {
    return res
      .status(400)
      .json({ error: "likes must be positive integer or zero" });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});
blogsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404).end();
  } else {
    res.json(blog);
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const userId = decodedToken.id;

    const id = req.params.id;

    const blog = await Blog.findById(id);
    if (userId.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(id);
      res.status(204).end();
    } else {
      res.status(403).json({ error: "u have no permission to delete" });
    }
  } catch (err) {
    res.status(401).json(err);
  }
});
blogsRouter.post("/:id/comments", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).end;
  }
  const updated = {
    ...blog.toJSON(),
    comments: blog.comments.concat(req.body.comment),
  };
  const blogWithComment = await Blog.findByIdAndUpdate(id, updated, {
    new: true,
    runValidators: true,
  });
  res.json(blogWithComment);
});
blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).end;
  }
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
