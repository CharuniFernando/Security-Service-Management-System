const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);