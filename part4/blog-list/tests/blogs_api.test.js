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
    expect(res.body).toHaveLength(2);
  });
  test("get request should return in json format with correct respond status", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("get request should return array of blogs with correct blog name", async () => {
    const res = await api.get("/api/blogs");
    const authors = res.body.map((blog) => blog.title);
    expect(authors).toContainEqual("Go To Statement Considered Harmful");
  });
  test("unique identifier should be named id", async () => {
    const res = await api.get("/api/blogs");
    const firstBlog = res.body[0];
    expect(firstBlog.id).toBeDefined();
  })
});


//close connection after all tests
afterAll(() => {
  mongoose.connection.close();
});
