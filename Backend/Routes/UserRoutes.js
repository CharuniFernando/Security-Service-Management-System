const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserControllers");

router.get("/", UserController.getAllUser);
router.post("/", UserController.upload.single('profilePhoto'), UserController.addUser); // Upload file when creating user
router.get("/:id", UserController.getById);
router.put("/:id", UserController.upload.single('profilePhoto'), UserController.updateUser); // Upload file when updating user
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.loginUser);

module.exports = router;
