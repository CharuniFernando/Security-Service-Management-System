import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:5000/trainings"; // Updated endpoint

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    duration: "",
    startDate: "",
    endDate: "",
    details: "",
    security: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(URL);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      Object.values(course).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCourses(filteredCourses);
    setNoResults(filteredCourses.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedCourse = courses.find((course) => course._id === id);
    if (selectedCourse) {
      setUpdateData({
        id: selectedCourse._id,
        name: selectedCourse.name,
        duration: selectedCourse.duration,
        startDate: selectedCourse.startDate,
        endDate: selectedCourse.endDate,
        details: selectedCourse.details,
        security: selectedCourse.security,
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchCourses(); // Refresh courses after update
      setUpdateData({
        id: "",
        name: "",
        duration: "",
        startDate: "",
        endDate: "",
        details: "",
        security: "",
      });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedCourses = courses.filter((course) => course._id !== id);
        setCourses(updatedCourses); // Update courses after delete
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  /* PDF Generation */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Course Document",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled")
  });

  // Function to group courses by category
  const groupCoursesByCategory = () => {
    const categories = {
      technology: [],
      business: [],
      design: [],
      marketing: [],
      health: [],
      finance: [],
    };

    courses.forEach((course) => {
      if (categories[course.courseCategory]) {
        categories[course.courseCategory].push(course);
      }
    });

    return categories;
  };

  const categorizedCourses = groupCoursesByCategory();

  return (
    <div className="course-details">
      <div className="admin-topic-course">
        Admin<span className="admin-sub-topic-course"> Dash Board</span>
      </div>
      <div className="course-details-body">
        <div className="btn-con-course">
          <button
            type="submit"
            className="course-add-btn-admin"
            onClick={() => (window.location.href = "/courses/addcourse")}
          >
            Add Course
          </button>
          <button
            type="submit"
            className="course-add-btn-admin"
            onClick={handlePrint}
          >
            Generate Report
          </button>
        </div>
        <div className="search-box">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="search-ipt"
            placeholder="Search Courses"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
        <div ref={summaryRef}>
          <div className="admin-topic-course">
            Course<span className="admin-sub-topic-course"> Details</span>
          </div>
          <br />

          {noResults ? (
            <h1 className="course-topic">
              No results <span className="course-us">found</span>
            </h1>
          ) : (
            Object.entries(categorizedCourses).map(([category, categoryCourses]) => (
              <div key={category}>
                <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <div className="card-set-course">
                  {categoryCourses.length > 0 ? (
                    categoryCourses.map((course) => (
                      <div key={course._id} className="card-course">
                        <p className="course-name">{course.name}</p>
                        <div className="details-card-course">
                          <p className="card-details">
                            <b>Duration:</b> {course.duration}
                          </p>
                          <p className="card-details">
                            <b>Start Date:</b> {course.startDate}
                          </p>
                          <p className="card-details">
                            <b>End Date:</b> {course.endDate}
                          </p>
                          <p className="card-details">
                            <b>Details:</b> {course.details}
                          </p>
                          <p className="card-details">
                            <b>Security:</b> {course.security}
                          </p>
                        </div>
                        <div className="btn-box">
                          <button
                            className="update-btn"
                            onClick={() => handleUpdate(course._id)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(course._id)}
                          >
                            Delete
                          </button>
                        </div>
                        {updateData.id === course._id && (
                          <form className="update-form" onSubmit={handleSubmit}>
                            <hr />
                            <br />
                            <label className="course-full-box-label">Name</label>
                            <br />
                            <input
                              className="course-full-box-input-update"
                              type="text"
                              name="name"
                              value={updateData.name}
                              onChange={(e) =>
                                handleChange(e.target.value, "name")
                              }
                              required
                            />
                            <br />
                            <label className="course-full-box-label">Duration</label>
                            <br />
                            <input
                              className="course-full-box-input-update"
                              type="text"
                              name="duration"
                              value={updateData.duration}
                              onChange={(e) =>
                                handleChange(e.target.value, "duration")
                              }
                              required
                            />
                            <br />
                            <label className="course-full-box-label">Start Date</label>
                            <br />
                            <input
                              className="course-full-box-input-update"
                              type="date"
                              name="startDate"
                              value={updateData.startDate}
                              onChange={(e) =>
                                handleChange(e.target.value, "startDate")
                              }
                              required
                            />
                            <br />
                            <label className="course-full-box-label">End Date</label>
                            <br />
                            <input
                              className="course-full-box-input-update"
                              type="date"
                              name="endDate"
                              value={updateData.endDate}
                              onChange={(e) =>
                                handleChange(e.target.value, "endDate")
                              }
                              required
                            />
                            <br />
                            <label className="course-full-box-label">Details</label>
                            <br />
                            <textarea
                              className="course-full-box-input-update"
                              name="details"
                              value={updateData.details}
                              onChange={(e) =>
                                handleChange(e.target.value, "details")
                              }
                              required
                            />
                            <br />
                            <label className="course-full-box-label">Security</label>
                            <br />
                            <input
                              className="course-full-box-input-update"
                              type="text"
                              name="security"
                              value={updateData.security}
                              onChange={(e) =>
                                handleChange(e.target.value, "security")
                              }
                              required
                            />
                            <br />
                            <button type="submit" className="course-add-btn">
                              Save
                            </button>
                          </form>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No courses in this category</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
