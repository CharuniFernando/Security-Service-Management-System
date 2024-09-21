const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  InquiryID: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  response: {
    type: String,
  },
  userID: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
