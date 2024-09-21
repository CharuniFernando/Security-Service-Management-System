const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OperationSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  securityOfficer: {
    type: String,
    default: null,
  },
  specialInstructions: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  officers: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Operation", OperationSchema);
