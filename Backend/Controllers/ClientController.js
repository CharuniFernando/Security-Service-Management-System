const ClientModel = require("../Model/Client");

//Display Data
const getAllDetails = async (req, res, next) => {
  let client;
  try {
    client = await ClientModel.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching client" });
  }
  if (!client || client.length === 0) {
    return res.status(200).json({ client: [] }); // Return empty darray if no client
  }
  return res.status(200).json({ client });
};

//Insert Data
const addData = async (req, res, next) => {
  const {
    InquiryID,
    phone,
    date,
    type,
    name,
    email,
    message,
    status,
    response,
    userID,
  } = req.body;

  let client;

  try {
    client = new ClientModel({
      InquiryID,
      phone,
      date,
      type,
      name,
      email,
      message,
      status,
      response,
      userID,
    });
    await client.save();
  } catch (err) {
    console.log(err);
  }
  if (!client) {
    return res.status(404).json({ message: "unable to add data" });
  }
  return res.status(200).json({ client });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let client;
  try {
    client = await ClientModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!client) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ client });
};

const getUserById = async (req, res, next) => {
  const userID = req.params.userID;
  let client;
  try {
    client = await ClientModel.findById(userID);
  } catch (err) {
    console.log(err);
  }
  if (!client) {
    return res.status(404).json({ message: "Data Not Found" });
  }
  return res.status(200).json({ client });
};

//Update Details
const updateData = async (req, res, next) => {
  const id = req.params.id;
  const {
    InquiryID,
    phone,
    date,
    type,
    name,
    email,
    message,
    status,
    response,
    userID,
  } = req.body;

  let client;

  try {
    client = await ClientModel.findByIdAndUpdate(id, {
      InquiryID:InquiryID,
      phone:phone,
      date:date,
      type:type,
      name:name,
      email:email,
      message:message,
      status:status,
      response:response,
      userID:userID,
    });
    client = await client.save();
  } catch (err) {
    console.log(err);
  }
  if (!client) {
    return res.status(404).json({ message: "Unable to Update data" });
  }
  return res.status(200).json({ client });
};

//Delete data
const deleteData = async (req, res, next) => {
  const id = req.params.id;

  let client;

  try {
    client = await ClientModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!client) {
    return res.status(404).json({ message: "Unable to Delete Details" });
  }
  return res.status(200).json({ client });
};




exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.getUserById = getUserById;
exports.updateData = updateData;
exports.deleteData = deleteData;
