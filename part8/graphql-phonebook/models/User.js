const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  //schema definition here
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  favouriteGenre: {
    type: String,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
