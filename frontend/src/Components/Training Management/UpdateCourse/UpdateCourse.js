import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
function UpdateCourse() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/trainings/${id}`);
        setInputs(response.data.course); // Ensure response structure is correct
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  
  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/trainings/${id}`, {
        name: inputs.name,
        courseCategory: inputs.courseCategory,
        duration: inputs.duration,
        startDate: inputs.startDate, // This should be in correct Date format
        endDate: inputs.endDate, // This should be in correct Date format
        startTime: inputs.startTime,
        endTime: inputs.endTime,
        details: inputs.details,
        security: inputs.security,
      });
    } catch (error) {
      console.error("Error sending update request:", error);
    }
  };
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      window.alert("Details Update successfully!");
      history("/allcourses");
    });
  };
  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">
            Update <span className="course-us">Course</span>
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
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourse;
