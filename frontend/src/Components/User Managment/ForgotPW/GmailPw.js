import React, { useState } from "react";
import axios from "axios";

function GmailPw() {
  const [gmail, setGmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkResponse = await axios.post("http://localhost:5000/send-email", {
        email: gmail,
      });
      if (checkResponse.data.message === "Verification code sent") {
        const { code } = checkResponse.data; 
        localStorage.setItem("verificationCode", code);
        localStorage.setItem("verificationgmail", gmail);
        alert("Verification code sent to your Gmail. Check it!");
        window.location.href = "/verifycode";
      } else {
        alert("This email is not registered. Please enter a registered email.");
      }
    } catch (error) {
      console.error("Error during email validation or sending", error);
      alert("This email is not registered. Please enter a registered email");
    }
  };

  return (
    <div>
      <div className="auth_home_bk">
        <div className="auth_from newbox">
          <h1 className="auth_topic">Email Verification</h1>
          <form onSubmit={handleSubmit}>
            <label className="form_label">Gmail: </label>
            <br />
            <input
              type="email"
              name="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
              className="form_input"
            />
            <br />
            <button type="submit" className="auth_btn">
              Send Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GmailPw;
