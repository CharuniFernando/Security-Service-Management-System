const express = require("express");
const booking_router = express.Router();
const BookingController = require("../Controllers/BookingController");

booking_router.post("/", BookingController.addData);
booking_router.get("/", BookingController.getAllDetails);
booking_router.get("/:id", BookingController.getById);
booking_router.put("/:id", BookingController.updateData);
booking_router.delete("/:id", BookingController.deleteData);

module.exports = booking_router;
