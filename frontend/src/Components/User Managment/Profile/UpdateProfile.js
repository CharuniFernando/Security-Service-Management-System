import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

function UpdateProfile() {
  const [inputs, setInputs] = useState({});
  const [selectedFile, setSelectedFile] = useState(null); // State for storing the profile image file
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employee/${id}`);
        setInputs(response.data.emp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle file input for profile photo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const sendRequest = async () => {
    // Create a FormData object to send both form data and file
    const formData = new FormData();
    formData.append("type", inputs.type);
    formData.append("name", inputs.name);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("gmail", inputs.gmail);

    if (selectedFile) {
      formData.append("profilePhoto", selectedFile); // Add profile photo to form data
    }

    try {
      await axios.put(`http://localhost:5000/employee/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the correct content type
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest().then(() => {
      window.alert("Account updated successfully!");
      history("/"); // Redirect after update
    });
  };

  return (
    <div className="auth_from_update">
      <div className="auth_from_update_main">
        <h1 className="auth_topic">
          Update Account<span> Details</span>
        </h1>
        <div className="item_full_box">
          <form className="" onSubmit={handleSubmit}>
            <label className="form_label">Name</label>
            <input
              className="form_input"
              type="text"
              value={inputs.name}
              onChange={handleChange}
              name="name"
              required
            />

            <label className="form_label">Phone</label>
            <input
              className="form_input"
              type="text"
              pattern="[0-9]{10}"
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              required
            />

            <label className="form_label">Gmail</label>
            <input
              className="form_input"
              type="email"
              value={inputs.gmail}
              onChange={handleChange}
              name="gmail"
              required
              readOnly
            />

            <label className="form_label">Address</label>
            <input
              className="form_input"
              type="text"
              value={inputs.address}
              onChange={handleChange}
              name="address"
              required
            />

            <label className="form_label">Profile Photo</label>
            <input
              className="form_input"
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Handle file input
            />

            <button type="submit" className="auth_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
