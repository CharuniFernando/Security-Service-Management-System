import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddEmploye() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    name: "",
    gmail: "",
    phone: "",
    address: "",
    password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      console.log(response.data); 
      window.alert("Account Created successfully!");
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the employee!", error);
      window.alert("This Gmail Already exists");
    }
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("type", inputs.type);
    formData.append("name", inputs.name);
    formData.append("gmail", inputs.gmail);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("password", inputs.password);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    return await axios.post("http://localhost:5000/employee", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const handleLoginNavigate = () => {
    navigate("/");
  };

  return (
    <div className="auth_home_bk">
      <div className="auth_from_add_regi">
        <h1 className="auth_topic">Create Accout</h1>
        <div className="item_full_box">
          <form onSubmit={handleSubmit}>
            <label className="form_lable">Type</label>
            <br></br>
            <select
              className="form_input"
              required
              value={inputs.type}
              onChange={handleChange}
              name="type"
            >
              <option value="">Select Type</option> {/* Optional placeholder */}
              <option value="Client">Client</option>
              <option value="Employee">Employee</option>
            </select>

            <br></br>
            {/* Conditionally render profile photo input based on selected type */}
            {inputs.type === "Client" && (
              <>
                <label className="form_lable">Profile Photo</label>
                <br></br>
                <input
                 type="file"
                 className="form_input"
                 accept="image/*"
                 onChange={handleFileChange}
                />
                <br></br>
              </>
            )}

            <label className="form_lable">name</label>
            <br></br>
            <input
              className="form_input"
              type="text"
              required
              value={inputs.name}
              onChange={handleChange}
              name="name"
            />
            <br></br>
            <label className="form_lable">gmail</label>
            <br></br>
            <input
              className="form_input"
              type="email"
              value={inputs.gmail}
              onChange={handleChange}
              name="gmail"
              required
            />
            <br></br>
            <label className="form_lable">Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              className="form_input"
            />
            <br></br>
            <label className="form_lable">phone</label>
            <br></br>
            <input
              className="form_input"
              type="text"
              pattern="[0-9]{10}"
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              required
            />
            <br></br>
            <label className="form_lable">address</label>
            <br></br>
            <input
              className="form_input"
              type="text"
              value={inputs.address}
              onChange={handleChange}
              name="address"
              required
            />
            <br></br>
            <button type="submit" className="auth_btn">
              Create Account
            </button>
          </form>

          <p className="auth_pera_two">
            you have an account
            <span className="auth_pera_two_sub" onClick={handleLoginNavigate}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddEmploye;
