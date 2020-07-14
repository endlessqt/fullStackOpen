const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];
const notExistingId = async () => {
  const newBlog = new Blog({
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  });
  await newBlog.save();
  await newBlog.remove();
  return newBlog._id.toString();
};

const blogsInDb = async () => {
  const res = await Blog.find({});
  return res.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const res = await User.find({});
  return res.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  notExistingId,
  usersInDb,
};
