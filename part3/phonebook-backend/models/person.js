const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const process = require("process");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const uri = process.env.MONGO_URI;

console.log("connecting to", uri);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("error occured:", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: true,
    minlength: 3,
  },
  number: { type: String, required: true, minlength: 8 },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: function (document, obj) {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
