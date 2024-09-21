const BookingModel = require("../Model/Booking");

//Display Data
const getAllDetails = async (req, res, next) => {
  let bookings;
  try {
    bookings = await BookingModel.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching bookings" });
  }
  if (!bookings || bookings.length === 0) {
    return res.status(200).json({ bookings: [] }); // Return empty darray if no bookings
  }
  return res.status(200).json({ bookings });
};

//Insert Data
const addData = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    packages,
    date,
    status,
    securityOfficer,
    specialInstructions,
    createdAt,
    bookingID, // Change here to accept bookingID
  } = req.body;

  let booking;

  try {
    booking = new BookingModel({
      name,
      email,
      phone,
      packages,
      date,
      status,
      securityOfficer,
      specialInstructions,
      createdAt,
      bookId: bookingID, // Map bookingID to bookId
    });
    await booking.save();
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "unable to add data" });
  }
  return res.status(200).json({ booking });
};


//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await BookingModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ booking });
};

//Update Details
const updateData = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    email,
    phone,
    packages,
    date,
    status,
    securityOfficer,
    specialInstructions,
    createdAt,
    bookId,
  } = req.body;

  let booking;

  try {
    booking = await BookingModel.findByIdAndUpdate(id, {
      name: name,
      email: email,
      phone: phone,
      packages: packages,
      date: date,
      status: packages,
      securityOfficer: securityOfficer,
      specialInstructions: specialInstructions,
      createdAt: createdAt,
      bookId: bookId,
    });
    booking = await booking.save();
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Unable to Update data" });
  }
  return res.status(200).json({ booking });
};

//Delete data
const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let booking;

  try {
    booking = await BookingModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Unable to Delete Details" });
  }
  return res.status(200).json({ booking });
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
