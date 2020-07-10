require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const process = require("process");
const Person = require("./models/person");

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "wrong id format" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});

const app = express();
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] — :response-time ms :data")
);
app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});
// page with all persons from mongoDB

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<p> Phonebook has info for ${persons.length} persons</p>
          <p>${new Date()}</p>
          `
    );
  });
});
// info about phonebook from mongoDB

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});
// get person by id

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.body.id;
  const personWithUpd = {
    name: req.body.name,
    number: req.body.number,
  };
  Person.findByIdAndUpdate(id, personWithUpd, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});

app.use(errorHandler);
