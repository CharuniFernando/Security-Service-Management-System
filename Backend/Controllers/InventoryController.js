// controllers/itemController.js
const Item = require("../Model/Inventory");

// Utility function to validate input
const validateItemData = (data) => {
  const { name, quantity, size, company, category, imageUrl } = data;
  if (!name || typeof name !== "string") return "Name is required and must be a string.";
  if (quantity === undefined || typeof quantity !== "number" || quantity < 1) return "Quantity must be a positive number.";
  if (!size || typeof size !== "string") return "Size is required and must be a string.";
  if (!company || typeof company !== "string") return "Company is required and must be a string.";
  if (!category || typeof category !== "string") return "Category is required and must be a string.";
  if (!imageUrl || typeof imageUrl !== "string") return "Image URL is required and must be a valid URL.";
  return null; // No errors
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addItem = async (req, res) => {
  const error = validateItemData(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ newItem });
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ item });
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateItem = async (req, res) => {
  const error = validateItemData(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ updatedItem });
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ deletedItem });
  } catch (err) {
    console.error("Error deleting item:", err);
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
