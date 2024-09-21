import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HomeNav from "../../Home/UserHome/HomeNav";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/employee"; // Define the URL for the API

function Profile() {
  const { id } = useParams(); // Get the employee ID from the route params
  const [employee, setEmployee] = useState(null); // State to hold the employee data
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setEmployee(response.data.emp); // Set the employee data
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const deleteHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Profile?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${id}`); // Use the correct URL for deletion
        window.alert("Account deleted successfully!");
        navigate("/"); // Change this path as needed
      } catch (error) {
        console.error("Error deleting details:", error);
        window.alert("Error deleting account. Please try again.");
      }
    }
  };

  if (!employee) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="profile-container">
      <HomeNav />
      <div className="profile_cover">
        <span className="name_fade">Welcome Back {employee.name}</span>
      </div>
      <div className="profile_card fade_up">
        <div className="profile_details">
          <div className="profile_photo_container">
            {/* Display the profile photo */}
            {employee.profilePhoto && (
              <img
                src={`http://localhost:5000/${employee.profilePhoto}`} // Adjust the image source path
                alt="Profile"
                className="profile_photo"
              />
            )}
          </div>
          <p className="mainn_name_pro">Name</p>
          <p className="sub_name_pro"> {employee.name}</p>
          <p className="mainn_name_pro">Type</p>
          <p className="sub_name_pro"> {employee.type}</p>
          <p className="mainn_name_pro">Email</p>
          <p className="sub_name_pro"> {employee.gmail}</p>
          <p className="mainn_name_pro">Phone</p>
          <p className="sub_name_pro"> {employee.phone}</p>
          <p className="mainn_name_pro">Address</p>
          <p className="sub_name_pro"> {employee.address}</p>
          <div className="btn_container">
            <Link to={`/userproupdate/${employee._id}`} className="btn_update">
              Update
            </Link>
            <button onClick={deleteHandler} className="btn_delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
