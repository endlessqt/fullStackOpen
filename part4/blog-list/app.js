require("express-async-errors");
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const middleware = require("./utils/middleware");
const { MONGO_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
mongoose.set("useFindAndModify", false);
logger.info(`connecting to mongoDB`);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
morgan.token(middleware.dataToken);
app.use(
  morgan(`:method :url :status :res[content-length] — :response-time ms :data`)
);
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
