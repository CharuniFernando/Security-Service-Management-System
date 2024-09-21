const LeaveModel = require("../Model/Leave");

//Display Data
const getAllDetails = async (req, res, next) => {
  let leave;
  try {
    leave = await LeaveModel.find();
  } catch (err) {
    console.log(err);
  }
  if (!leave) {
    return res.status(404).json({ message: "Data not found" });
  }
  return res.status(200).json({ leave });
};

//Insert Data
const addData = async (req, res, next) => {
  const { name, email, phone, date, message } = req.body;

  let leave;

  try {
    leave = new LeaveModel({
      name,
      email,
      phone,
      date,
      message,
    });
    await leave.save();
  } catch (err) {
    console.log(err);
  }
  if (!leave) {
    return res.status(404).json({ message: "unable to add data" });
  }
  return res.status(200).json({ leave });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let leave;
  try {
    leave = await LeaveModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!leave) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ leave });
};

//Update Details
const updateData = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone, date, message } = req.body;

  let leave;

  try {
    leave = await LeaveModel.findByIdAndUpdate(id, {
      name: name,
      email: email,
      phone: phone,
      date: date,
      message: message,
    });
    leave = await leave.save();
  } catch (err) {
    console.log(err);
  }
  if (!leave) {
    return res.status(404).json({ message: "Unable to Update data" });
  }
  return res.status(200).json({ leave });
};

//Delete data
const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let leave;

  try {
    leave = await LeaveModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!leave) {
    return res.status(404).json({ message: "Unable to Delete Details" });
  }
  return res.status(200).json({ leave });
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
