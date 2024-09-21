const express = require("express");
const item_router = express.Router();
const ItemController = require("../Controllers/InventoryController");

item_router.get("/", ItemController.getAllItems);
item_router.post("/", ItemController.addItem);
item_router.get("/:id", ItemController.getItemById);
item_router.put("/:id", ItemController.updateItem);
item_router.delete("/:id", ItemController.deleteItem);

module.exports = item_router;
