const express = require("express");
const payment_router = express.Router();
const PaymentController = require("../Controllers/PaymentController");

// Add a new payment
payment_router.post("/", PaymentController.addData);

// Get all payments
payment_router.get("/", PaymentController.getAllDetails);

// Get a payment by id
payment_router.get("/:id", PaymentController.getById);

// Update a payment by u
payment_router.put("/:id", PaymentController.updateData);

// Delete a payment by id
payment_router.delete("/:id", PaymentController.deleteData);

module.exports = payment_router;
