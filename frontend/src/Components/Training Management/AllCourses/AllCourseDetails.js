import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
const URL = "http://localhost:5000/trainings";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // For category selection

  useEffect(() => {
    fetchHandler().then((data) => setCourses(data.courses));
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredCourses = data.courses.filter((course) =>
        Object.values(course).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setCourses(filteredCourses);
      setNoResults(filteredCourses.length === 0);
    });
  };

  // Filtered courses based on the selected category
  const filteredCourses = courses.filter(
    (course) => !selectedCategory || course.courseCategory === selectedCategory
  );

  // Function to generate the report
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Course Details Report", 14, 10);

    const columns = [
      "Course Name",
      "Course Category",
      "Duration (hour)",
      "Start Date",
      "End Date",
      "Start Time",
      "End Time",
      "Details",
      "Security",
    ];
    const rows = filteredCourses.map((course) => [
      course.name,
      course.courseCategory,
      course.duration,
      course.startDate,
      course.endDate,
      course.startTime,
      course.endTime,
      course.details,
      course.security,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save("Course_Report.pdf");
  };
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Course Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Course deleted successfully!");

        // Fetch the updated list of employees after deletion
        const updatedCourse = await fetchHandler();
        setCourses(updatedCourse.courses);
      } catch (error) {
        console.error("Error deleting details:", error);
      }
    }
  };
  return (
    <div>
      <div className="">
        <h1 className="admin_topic fade_up">
          Course <span className="">Details</span>
        </h1>
        <div className="action_set_admin fade_up">
          <button
            onClick={() => (window.location.href = "/addcourse")}
            className="admin_dash_btn"
          >
            Add New Course
          </button>
          <tr>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="admin_search"
                placeholder="Search Courses..."
                required
              />
            </td>
            <td>
              <button onClick={handleSearch} className="search_btn_admin">
                Search
              </button>
            </td>
          </tr>
          <button onClick={handleGenerateReport} className="admin_dash_btn">
            Generate Report
          </button>
        </div>

        <div className="table_main_admin fade_up ">
          <div className="table_container">
            <table className="admin_table ">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admin_table_th">Course Name</th>
                  <th className="admin_table_th">Course Category</th>
                  <th className="admin_table_th">Duration (hour)</th>
                  <th className="admin_table_th">Start Date</th>
                  <th className="admin_table_th">End Date</th>
                  <th className="admin_table_th">Start Time</th>
                  <th className="admin_table_th">End Time</th>
                  <th className="admin_table_th">Details</th>
                  <th className="admin_table_th">Security</th>
                  <th className="admin_table_th">Action</th>
                </tr>
              </thead>
              {filteredCourses.length === 0 ? (
                <tbody>
                  <tr>
                    <td className="tbl_no" colSpan="5">
                      No Courses Found
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <tr className="admin_tbl_tr" key={index}>
                      <td className="admin_table_td">{course.name}</td>
                      <td className="admin_table_td">
                        {course.courseCategory}
                      </td>
                      <td className="admin_table_td">{course.duration}</td>
                      <td className="admin_table_td">{course.startDate}</td>
                      <td className="admin_table_td">{course.endDate}</td>
                      <td className="admin_table_td">{course.startTime}</td>
                      <td className="admin_table_td">{course.endTime}</td>
                      <td className="admin_table_td">{course.details}</td>
                      <td className="admin_table_td">{course.security}</td>
                      <td className="admin_table_td cenbtn">
                        <Link to={`/updatecourse/${course._id}`}>
                          <button className="update_btn_dash_admin">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteHandler(course._id)}
                          className="btn_dash_admin_delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="logout_btn_main">
          <div
            className="logout_btn_sub fade_up"
            onClick={() => (window.location.href = "/admin")}
          >
            <IoIosLogOut className="logout_btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
