const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "wrong id format" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.message === "likes must be positive integer or zero") {
    return res.status(400).json({ error: err.message });
  } else if (
    err.message === "password's length must be at least 3 characters"
  ) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    req.token = authorization.substring(7);
  }
  next();
};
module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
};
