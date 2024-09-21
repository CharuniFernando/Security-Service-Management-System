import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import "./course.css";
import Footer from "../../Home/UserHome/Footer";
const URL = "http://localhost:5000/trainings";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const CourseUser = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setCourses(data.courses));
  }, []);

  return (
    <div>
      <HomeNav />
      <h1 className="topic_course">Our Available Course</h1>
      <div className="usercourse_container">
        <div className="usercourse_card_container">
          {courses.length === 0 ? (
            <div className="no_found fade_up">
              <div className="no_found_img "></div>
            </div>
          ) : (
            courses.map((course, index) => (
              <div className="usercourse_card" key={index}>
                <p className="usercourse_name">{course.name}</p>
                <p className="usercourse_category">{course.courseCategory}</p>
                <p className="usercourse_duration">
                  <strong>Duration: </strong>
                  {course.duration} hours
                </p>
                <p className="usercourse_startdate">
                  <strong>Date: </strong>
                  {course.startDate} To {course.endDate}
                </p>

                <p className="usercourse_starttime">
                  <strong>Time: </strong>
                  {course.startTime} To {course.endTime}
                </p>
                
                <p className="usercourse_details">
                  <strong>Details: </strong>
                  {course.details}
                </p>
                <p className="usercourse_security">
                  <strong>Security: </strong>
                  {course.security}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CourseUser;
