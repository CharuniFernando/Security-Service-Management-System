const Operation = require("../Model/Operation");
const Booking = require("../Model/Booking");

const addOperation = async (req, res) => {
  try {
    const { bookingId, officers } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Create the new operation using booking details
    const newOperation = new Operation({
      bookingId,
      package: booking.packages,
      status: booking.status,
      date: new Date(), // You might want to adjust this according to your needs
      officers,
    });

    await newOperation.save();
    res.status(201).json({ message: "Operation added successfully", operation: newOperation });
  } catch (error) {
    console.error("Error adding operation:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllOperations = async (req, res, next) => {
  try {
    const operations = await Operation.find().populate('bookingId');
    res.status(200).json({ operations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOperationsByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Fetch operations by bookingId
    const operations = await Operation.find({ bookingId });
    res.status(200).json({ operations });
  } catch (error) {
    console.error("Error fetching operations:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const updateOperation = async (req, res, next) => {
  try {
    const updatedOperation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOperation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    res.status(200).json({ updatedOperation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteOperation = async (req, res, next) => {
  try {
    const deletedOperation = await Operation.findByIdAndDelete(req.params.id);
    if (!deletedOperation) {
      return res.status(404).json({ message: "Operation not found" });
    }
    res.status(200).json({ deletedOperation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addOperation,
  getAllOperations,
  getOperationsByBookingId,
  updateOperation,
  deleteOperation,
};
