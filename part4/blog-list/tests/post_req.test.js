const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const helper = require("../tests/test_helper");
const blog = require("../models/blog");

const api = supertest(app);

let token;

beforeAll(async () => {
  const res = await api
    .post("/api/login")
    .send({ username: "root", password: "secret" })
    .expect(200);

  token = res.body.token;
});
describe("testing post req", () => {
  test("posting blog with correct token", async () => {
    const blogsInDbAtStart = await helper.blogsInDb();
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    });
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInAbAtEnd = await helper.blogsInDb();
    const usersInDb = await helper.usersInDb();
    expect(blogsInAbAtEnd).toHaveLength(blogsInDbAtStart.length + 1);
    const id = blogsInAbAtEnd.map((blogs) => blogs.user);
    const userId = usersInDb.find((user) => user.username === "root").id;
    expect(id).toContainEqual(userId);
  });
  test("post req withour or with invalid token", async () => {
    const blogsInDbAtStart = await helper.blogsInDb();
    const newBlog = new Blog({
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    });
    const res = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer asdasd123123asd`)
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsInAbAtEnd = await helper.blogsInDb();
    expect(res.body.name).toBe("JsonWebTokenError");
    expect(blogsInAbAtEnd).toHaveLength(blogsInDbAtStart.length);
  });
  test("delete item allowed only with token provided", async () => {
    const blogsInDbAtStart = await helper.blogsInDb();

    const id = blogsInDbAtStart.find(
      (blog) => blog.user.toString() === "5f0f1da7ac19d72878effa97"
    ).id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsInDbAtEnd = await helper.blogsInDb();
    expect(blogsInDbAtEnd).toHaveLength(blogsInDbAtStart.length - 1);
  });
  test("delete with invalid token", async () => {
    const blogsInDbAtStart = await helper.blogsInDb();
    const id = blogsInDbAtStart.find(
      (blog) => blog.user.toString() === "5f0f1da7ac19d72878effa97"
    ).id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer rubbish`)
      .expect(401);
  });
    test("other logged in user can't delete other users posts", async () => {
        const blogsInDbAtStart = await helper.blogsInDb();
        const id = blogsInDbAtStart.find(
            (blog) => blog.user.toString() === "5f0f1da7ac19d72878effa97"
          ).id;
        await api.post("/api/users").send({ username: "roflan", password: "roflan", name: "rofl" }); //created new user
        const loginUser = await api.post("/api/login").send({ username: "roflan", password: "roflan" }) //logged in user;
        const blockScopeToken = loginUser.body.token //extracted token from logged in user;
        const res = await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${blockScopeToken}`).expect(403); //forbidden code expected
        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(blogsInDbAtStart.length); //blogs at end are the same
        expect(res.body.error).toContain("u have no permission to delete"); //correct error message send
  })
});

afterAll(() => {
  mongoose.connection.close();
});
