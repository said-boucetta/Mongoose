const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({});

const todo = mongoose.Model("todo", todoSchema);

module.exports = todo;
