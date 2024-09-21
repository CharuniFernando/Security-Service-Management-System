const express = require("express");
const operationRouter = express.Router();
const OperationController = require("../Controllers/OperationController");

operationRouter.post("/", OperationController.addOperation);
operationRouter.get("/", OperationController.getAllOperations);
operationRouter.get("/:bookingId", OperationController.getOperationsByBookingId);
operationRouter.put("/:id", OperationController.updateOperation);
operationRouter.delete("/:id", OperationController.deleteOperation);

module.exports = operationRouter;
