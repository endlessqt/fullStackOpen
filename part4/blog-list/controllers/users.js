const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  if (req.body.password === undefined || req.body.password.length < 3) {
    throw new Error("password's length must be at least 3 characters");
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash: hashedPassword,
  });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
