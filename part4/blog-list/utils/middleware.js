const logger = require("./logger");
const morgan = require("morgan");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "wrong id format" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const dataToken = morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});

module.exports = {
  errorHandler,
  unknownEndpoint,
  dataToken,
};
