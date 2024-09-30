import React, { useState } from "react";
import "./adminauth.css";
function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const validateLogin = () => {
    const { username, password } = inputs;

    // Example hardcoded credentials
    const validUsername = "userManager";
    const validPassword = "user123";

    if (username === validUsername && password === validPassword) {
      alert("Login successful!");
      window.location.href = "/useredetails";
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <div>
        <div className="auth_home_bk_user">
          <div className="auth_from_admin">
            <h2 className="auth_topic">User Manager Login</h2>
            <label className="form_lable">User Name:</label>
            <br />
            <input
              type="text"
              name="username"
              className="form_input"
              placeholder="Username"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            <br />
            <label className="form_lable">Password:</label>
            <br />
            <input
              type="password"
              name="password"
              className="form_input"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <br />
            <button onClick={validateLogin} className="auth_btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
