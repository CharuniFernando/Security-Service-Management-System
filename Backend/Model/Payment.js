const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  paymentID: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  cardnumber: {
    type: String,
  },
  cardholdername: {
    type: String,
  },
  cvv: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
