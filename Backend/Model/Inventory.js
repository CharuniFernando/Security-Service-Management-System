const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  category: { // New field for category
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
