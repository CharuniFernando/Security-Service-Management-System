import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
function AdminUserAccCreate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    name: "",
    gmail: "",
    phone: "",
    address: "",
    password: "",
    emptype: "",
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
    // Email validation for Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(inputs.gmail)) {
      window.alert("Please enter a valid Gmail address ending with @gmail.com");
      return; // Stop form submission if invalid
    }
    try {
      const response = await sendRequest();
      console.log(response.data);
      window.alert("Account Created successfully!");
      navigate("/useredetails");
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
    formData.append("emptype", inputs.emptype);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    return await axios.post("http://localhost:5000/employee", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="auth_from_update">
      <div className="auth_from_update_main">
        <div>
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
                <option value="">Select Type</option>{" "}
                {/* Optional placeholder */}
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

              {inputs.type === "Employee" && (
                <>
                  <label className="form_lable">
                    Select Your Employee Type
                  </label>
                  <br></br>
                  <select
                    className="form_input"
                    value={inputs.emptype}
                    onChange={handleChange}
                    name="emptype"
                  >
                    <option value="">Select Type</option>
                    {/* Optional placeholder */}
                    <option value="Security Officer">Security Officer</option>
                    <option value="Lady Security Officer">
                      Lady Security Officer
                    </option>
                    <option value="Body Guard">Body Guard</option>
                    <option value="Lady Security Officer">VVIP Officer</option>
                  </select>

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
                onChange={(e) => {
                  const re = /^[A-Za-z\s]*$/;
                  if (re.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
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
                type="text"
                id="phone"
                name="phone"
                className="form_input"
                value={inputs.phone}
                onChange={(e) => {
                  const re = /^[0-9\b]{0,10}$/;
                  if (re.test(e.target.value)) {
                    handleChange(e);
                  }
                }}
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits."
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserAccCreate;
