const mongoose = require("mongoose");

const todoListScheme = {
  name: { type: String, require: true },
};

const TodoList = mongoose.model("TodoList", todoListScheme);

module.exports = TodoList;
