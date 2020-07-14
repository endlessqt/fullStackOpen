const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: function(document, obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema);