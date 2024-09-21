const express = require("express");
const item_router = express.Router();
const LeaveContoller = require("../Controllers/LeaveController");

item_router.get("/", LeaveContoller.getAllDetails);
item_router.post("/", LeaveContoller.addData);
item_router.get("/:id", LeaveContoller.getById);
item_router.put("/:id", LeaveContoller.updateData);
item_router.delete("/:id", LeaveContoller.deleteData);

module.exports = item_router;
