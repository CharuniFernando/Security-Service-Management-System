const express = require("express");
const trainingRouter = express.Router();
const TrainingController = require("../Controllers/TrainingController");

// Route to get all courses
trainingRouter.get("/", TrainingController.getAllCourses);

// Route to add a new course
trainingRouter.post("/", TrainingController.addCourse);

// Route to get a course by ID
trainingRouter.get("/:id", TrainingController.getCourseById);

// Route to update a course by ID
trainingRouter.put("/:id", TrainingController.updateCourse);

// Route to delete a course by ID
trainingRouter.delete("/:id", TrainingController.deleteCourse);

module.exports = trainingRouter;
