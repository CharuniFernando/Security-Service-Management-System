const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  packages: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  status: {
    type: String,

  },
  securityOfficer: {
    type: String,
  },
  specialInstructions: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
