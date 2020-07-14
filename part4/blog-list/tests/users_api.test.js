const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("secret", 10);

  const user = new User({
    username: "root",
    passwordHash,
  });
  await user.save();
});

describe("testing post req", () => {
  test("post req respond with correct status code and proper content type", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testirowshik",
      name: "Antoha",
      password: "ITSASECRET",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);

    expect(usernames).toContain("testirowshik");
  });
  test("post req should abort if password length less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testirowshik",
      name: "Antoha",
      password: "33",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain(
      "password's length must be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("username must be unique", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      password: "root",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(result.body.error).toContain("User validation failed");
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("username required", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      password: "root",
      name: "roflan",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();

    expect(result.body.error).toContain("validation failed");
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("username have to be 3 chars length", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "aa",
      password: "root",
      name: "roflan",
    };
    const result = await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(result.body.error).toContain("validation failed");
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
//TODO username length 3 and req
afterAll(() => {
  mongoose.connection.close();
});
