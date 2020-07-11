const express = require("express");
const app = express();
const logger = require("./utils/logger");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dataToken = require("./utils/middleware");

const { MONGO_URI, PORT } = require("./utils/config");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

morgan.token(dataToken);
app.use(
  morgan(`:method :url :status :res[content-length] — :response-time ms :data`)
);

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
