import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../User.css";

function UserLogin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/employee/login",
        {
          type: inputs.type,
          gmail: inputs.gmail,
          password: inputs.password,
        }
      );

      if (response.status === 200) {
        // Save user details to local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate(`/profile/${response.data.user._id}`);
      } else {
        window.alert(
          response.data.message || "Invalid credentials, please try again."
        );
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      window.alert("Failed to log in. Please check your credentials.");
    }
  };

  const navigateToSignup = () => {
    navigate("/user/adduser");
  };

  return (
    <div>
      <div className="auth_home_bk">
        <div className="auth_from">
          <h1 className="auth_topic">Login</h1>
          <form onSubmit={handleSubmit}>
            <label className="form_lable">User Type:</label>
            <br />
            <select
              name="type"
              value={inputs.type}
              onChange={handleChange}
              required
              className="form_input"
            >
              <option value="">Select Type</option>
              <option value="Client">Client</option>
              <option value="Employee">Employee</option>
            </select>
            <br />
            <label className="form_lable">Gmail: </label>
            <br />
            <input
              type="email"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              required
              className="form_input"
            />
            <br />
            <label className="form_lable">Password:</label>
            <br />
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              className="form_input"
            />
            <br />
            <button type="submit" className="auth_btn">
              Login
            </button>
            <p
              className="foget_perar"
              onClick={() => (window.location.href = "/gmailveryfy")}
            >
              Forgot password
            </p>
            <p className="auth_pera_two">
              Don't have an account yet ?
              <span className="auth_pera_two_sub" onClick={navigateToSignup}>
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
