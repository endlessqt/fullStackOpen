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
describe("testing get with specific id", () => {
  test("get req by id should return corresponding blog with correct status and content type", async () => {
    const initalBlogsInDb = await helper.blogsInDb();
    const testingBlog = initalBlogsInDb[0];
    const resultBlog = await api
      .get(`/api/blogs/${testingBlog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(testingBlog);
  });
  test("get req by id with non existing id should return 404 error", async () => {
    const nonExistingId = await helper.notExistingId();
    await api.get(`/api/blogs/${nonExistingId}`).expect(404);
  });
  test("get req with invalid id returns 400 error", async () => {
    const nonExistingId = await helper.notExistingId();
    await api.get(`/api/blogs/${nonExistingId}a12asd34`).expect(400);
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
  test("posted blog should contain likes property and its value should be 0 or greated", async () => {
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
  test("post request should be rejected with 400 error if there are no title in req", async () => {
    const newBlog = new Blog({
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    });
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
  test("post request should be rejected with 400 error code if there are no url in req", async () => {
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
    });
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});
describe("testing delete request", () => {
  test("delete req should return 204 status code, length - 1 and not to contain content of deleted blog", async () => {
    const blogsInDb = await helper.blogsInDb();
    const testingBlog = blogsInDb[0];

    await api.delete(`/api/blogs/${testingBlog.id}`).expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsAfterDelete).toHaveLength(blogsInDb.length - 1);

    const authorsAfterDeleting = blogsAfterDelete.map((blog) => blog.author);
    expect(authorsAfterDeleting).not.toContain(testingBlog.author);
  });
});

describe("testing put request", () => {
  test("put req should return 200 status code on success with correct data", async () => {
    const blogsInDb = await helper.blogsInDb();
    const testingBlog = blogsInDb[0];
    const newBlog = new Blog({
      ...testingBlog, likes: 666
    });
    await api.put(`/api/blogs/${testingBlog.id}`).send(newBlog).expect(200)

    const blogsAfterPut = await helper.blogsInDb();
    const testingBlogAfterPut = blogsAfterPut[0];
    expect(testingBlogAfterPut.likes).not.toEqual(testingBlog.likes);
    expect(testingBlogAfterPut.likes).toBe(newBlog.likes);
  })
});
//close connection after all tests
afterAll(() => {
  mongoose.connection.close();
});
