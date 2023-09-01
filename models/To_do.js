const mongoose = require("mongoose");

const to_doSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  email: {
    type: "string",
    required: true,
  },
});

const To_Do = mongoose.model("to_do", to_doSchema);

module.exports = To_Do;
