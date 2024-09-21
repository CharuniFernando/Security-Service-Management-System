import React, { useState } from "react";
import axios from "axios";

function UpdatePw() {
  const [newPassword, setNewPassword] = useState("");
  const [gmail, setGmail] = useState(
    localStorage.getItem("verificationgmail") || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if Gmail is present in the local storage
      if (!gmail) {
        alert("No email found in local storage");
        return;
      }

      // Send request to update the password
      const response = await axios.put(
        "http://localhost:5000/update-password",
        {
          gmail,
          newPassword,
        }
      );

      alert(response.data.message);
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="auth_home_bk">
        <div className="auth_from newbox">
          <h1 className="auth_topic">Update Password</h1>
          <form onSubmit={handleSubmit}>
            <label className="form_label">Enter New Password: </label>
            <br />
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form_input"
            />
            <br />
            <button type="submit" className="auth_btn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePw;
