import React, { useState } from "react";

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
    const validUsername = "PaymentManager";
    const validPassword = "payment123";

    if (username === validUsername && password === validPassword) {
      alert("Login successful!");
      // Redirect to inventory dashboard or another page
      window.location.href = "/payments";
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <div>
        <div className="auth_home_bk_payment">
          <div className="auth_from_admin trafrom">
            <h2 className="auth_topic">Payment Manager Login</h2>
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
