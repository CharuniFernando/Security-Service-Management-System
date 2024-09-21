const PaymentModel = require("../Model/Payment");

//Display Data
const getAllDetails = async (req, res, next) => {
  let payment;
  try {
    payment = await PaymentModel.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching payment" });
  }
  if (!payment || payment.length === 0) {
    return res.status(200).json({ payment: [] }); // Return empty darray if no payment
  }
  return res.status(200).json({ payment });
};

//Insert Data
const addData = async (req, res, next) => {
  const {
    bookingId,
    amount,
    method,
    paymentID,
    address,
    cardnumber,
    cardholdername,
    cvv,
    date,
    status,
  } = req.body;

  let payment;

  try {
    payment = new PaymentModel({
      bookingId,
      amount,
      method,
      paymentID,
      address,
      cardnumber,
      cardholdername,
      cvv,
      date,
      status,
    });
    await payment.save();
  } catch (err) {
    console.log(err);
  }
  if (!payment) {
    return res.status(404).json({ message: "unable to add data" });
  }
  return res.status(200).json({ payment });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let payment;
  try {
    payment = await PaymentModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!payment) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ payment });
};

//Update Details
const updateData = async (req, res, next) => {
  const id = req.params.id;
  const {
    bookingId,
    amount,
    method,
    paymentID,
    address,
    cardnumber,
    cardholdername,
    cvv,
    date,
    status,
  } = req.body;

  let payment;

  try {
    payment = await PaymentModel.findByIdAndUpdate(id, {
      bookingId: bookingId,
      amount: amount,
      method: method,
      paymentID: paymentID,
      address: address,
      cardnumber: cardnumber,
      cardholdername: cardholdername,
      cvv: cvv,
      date: date,
      status:status,
    });
    payment = await payment.save();
  } catch (err) {
    console.log(err);
  }
  if (!payment) {
    return res.status(404).json({ message: "Unable to Update data" });
  }
  return res.status(200).json({ payment });
};

//Delete data
const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let payment;

  try {
    payment = await PaymentModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!payment) {
    return res.status(404).json({ message: "Unable to Delete Details" });
  }
  return res.status(200).json({ payment });
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
