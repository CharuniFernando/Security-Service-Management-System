const express = require("express");
const client_router = express.Router();
const ClientController = require("../Controllers/ClientController");

client_router.post("/", ClientController.addData);
client_router.get("/", ClientController.getAllDetails);
client_router.get("/:id", ClientController.getById);
client_router.get("/:userID", ClientController.getUserById);
client_router.put("/:id", ClientController.updateData);
client_router.delete("/:id", ClientController.deleteData);

module.exports = client_router;
