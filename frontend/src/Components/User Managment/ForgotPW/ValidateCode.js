import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ValidateCode() {
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState("");
  const savedCode = localStorage.getItem("verificationCode");

  const handleVerify = () => {
    if (inputCode === savedCode) {
      alert("Verification successful!");
      navigate("/updatepw");
    } else {
      alert("Invalid verification code.");
    }
  };

  return (
    <div>
      <div className="auth_home_bk">
        <div className="auth_from newbox">
          <h1 className="auth_topic">Enter Your Code</h1>
          <form>
            <label className="form_label">Code: </label>
            <br />
            <input
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              type="number"
              name="code"
              required
              className="form_input"
            />
            <br />
            <button onClick={handleVerify} type="submit" className="auth_btn">
              Validate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ValidateCode;
