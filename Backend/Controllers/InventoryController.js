const Item = require("../Model/Inventory");

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addItem = async (req, res, next) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllItems,
  addItem,
  getItemById,
  updateItem,
  deleteItem,
};
