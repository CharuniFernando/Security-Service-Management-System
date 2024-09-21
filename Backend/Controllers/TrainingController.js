const Training = require("../Model/Training");

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Training.find();
    res.status(200).json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCourse = async (req, res, next) => {
  try {
    const newCourse = new Training(req.body);
    await newCourse.save();
    res.status(201).json({ newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Training.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is applied during updates
      }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ updatedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Training.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ deletedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
