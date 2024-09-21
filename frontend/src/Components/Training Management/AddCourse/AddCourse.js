import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddCourse() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    courseCategory: "",
    name: "",
    duration: "",
    startDate: "",
    endDate: "",
    details: "",
    security: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.courseCategory ||
      !inputs.name ||
      !inputs.duration ||
      !inputs.startDate ||
      !inputs.endDate ||
      !inputs.startTime ||
      !inputs.endTime ||
      !inputs.details ||
      !inputs.security
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/trainings", inputs); // Updated endpoint
      showAlert("Course added successfully!");
      navigate("/coursedash"); // Updated navigation path
    } catch (error) {
      console.error("Error adding course:", error);
      showAlert("Error adding course. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewCourses = () => {
    navigate("/courses");
  };

  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">
            Add <span className="course-us">Course</span>
          </h1>
          <form onSubmit={handleSubmit} className="item_full_box">
            <label className="form_lable">Course Category</label>
            <br />
            <select
              name="courseCategory"
              value={inputs.courseCategory}
              onChange={handleChange}
              className="form_input"
              required
            >
              <option value="">Select Here</option>
              <option value="Security Consultancy and Management Training">
                Security Consultancy and Management Training
              </option>
              <option value="Outbound & Personal skills Development Trainning">
                Outbound & Personal skills Development Trainning
              </option>
              <option value="Firearm Training">Firearm Training</option>
              <option value="Communication skills Development Trainning">
                Communication skills Development Trainning
              </option>
            </select>
            <br />
            <label className="form_lable">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Duration (Hour)</label>
            <br />
            <input
              type="number"
              name="duration"
              value={inputs.duration}
              onChange={handleChange}
              className="form_input"
              required
            />
            <div className="from_two_set">
              <div>
                <label className="form_lable">Start Time</label>
                <br />
                <input
                  type="time"
                  name="startTime"
                  value={inputs.startTime}
                  onChange={handleChange}
                  className="form_input date_input"
                  required
                />
              </div>

              <div>
                <label className="form_lable">End Time</label>
                <br />
                <input
                  type="time"
                  name="endTime"
                  value={inputs.endTime}
                  onChange={handleChange}
                  className="form_input date_input"
                  required
                />
              </div>
            </div>

            <div className="from_two_set">
              <div>
                <label className="form_lable">Start Date</label>
                <br />
                <input
                  type="date"
                  name="startDate"
                  value={inputs.startDate}
                  onChange={handleChange}
                  className="form_input date_input"
                  required
                />
              </div>

              <div>
                <label className="form_lable">End Date</label>
                <br />
                <input
                  type="date"
                  name="endDate"
                  value={inputs.endDate}
                  onChange={handleChange}
                  className="form_input date_input"
                  required
                />
              </div>
            </div>
            <div>
              <label className="form_lable">Details</label>
              <br />
              <textarea
                name="details"
                value={inputs.details}
                onChange={handleChange}
                className="form_input"
                required
              />
            </div>

            <label className="form_lable">Security Information</label>
            <br />
            <textarea
              type="text"
              name="security"
              value={inputs.security}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <button type="submit" className="auth_btn">
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
