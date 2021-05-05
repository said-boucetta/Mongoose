const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  isActif: {
    type: Boolean,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
