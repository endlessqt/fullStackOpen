const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

//before each test we have to initialise database with initial blogs

beforeEach(async () => {
  await Blog.deleteMany({});
  //delete all blogs in db
  const newBlogs = helper.initialBlogs.map((blog) => new Blog(blog));
  //array of new blogs;
  const promisesNewBlogs = newBlogs.map((blog) => blog.save());
  // array of promises saved to db
  await Promise.all(promisesNewBlogs);
  // waiting for all promises to be fullfilled
});

const api = supertest(app); // initialise api;

describe("testing get request", () => {
  test("get request should return array of blogs with length equals to length of blogs in db", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });
  test("get request should return in json format with correct respond status", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("get request should return array of blogs with correct blog name", async () => {
    const res = await api.get("/api/blogs");
    const titles = res.body.map((blog) => blog.title);
    expect(titles).toContainEqual("Go To Statement Considered Harmful");
  });
  test("unique identifier should be named id", async () => {
    const res = await api.get("/api/blogs");
    const firstBlog = res.body[0];
    expect(firstBlog.id).toBeDefined();
  });
});

describe("testing post request", () => {
  test("post request respond with correct content type and code", async () => {
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    });
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("post request adding new blog to the db and containing right author", async () => {
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    });
    await api.post("/api/blogs").send(newBlog);
    const blogsAfterPost = await helper.blogsInDb();
    const authors = blogsAfterPost.map((blogs) => blogs.author);
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
    expect(authors).toContain("Robert C. Martin");
  });
  test("posted blog should contain correct properties", async () => {
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    });
    await api.post("/api/blogs").send(newBlog);
    const blogsAfterPost = await helper.blogsInDb();
    const blog = blogsAfterPost.find((obj) => obj.author === newBlog.author);
    // we dont need to check if blog.author is defined because we used find method and it returns blog by authors name so its 100% not undefined;
    expect([blog.id, blog.title, blog.url, blog.likes]).toBeDefined();
  });
  test.only("posted blog should contain likes property and its value should be 0 or greated", async () => {
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    });
    await api.post("/api/blogs").send(newBlog);
    const blogsAfterPost = await helper.blogsInDb();
    const blog = blogsAfterPost.find((obj) => obj.url === newBlog.url);
    expect(blog.likes).toBeDefined();
    expect(blog.likes).toBeGreaterThanOrEqual(0);
  });
});

//close connection after all tests
afterAll(() => {
  mongoose.connection.close();
});
