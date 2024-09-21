const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Leave", LeaveSchema);
