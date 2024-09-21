import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import Footer from "../../Home/UserHome/Footer";

function AddLeave() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Request Send successfully!");
    window.location.href = "/home";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/leave", {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      date: inputs.date,
      message: inputs.message,
    });
  };
  return (
    <div>
      <HomeNav />
      <br /> <br /> <br />
      <div className="auth_from_update_main">
        <div>
          <h1 className="auth_topic">
            Request <span className="booking-us">Leave</span>
          </h1>
          <form onSubmit={handleSubmit} className="booking-full-box-form">
            <label className="form_lable">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Phone</label>
            <br />
            <input
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />

            <label className="form_lable">Date</label>
            <br />
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Message</label>
            <br />
            <textarea
              type="text"
              name="message"
              value={inputs.message}
              onChange={handleChange}
              className="form_input"
              required
            />
            <button type="submit" className="auth_btn">
              Request
            </button>
          </form>
        </div>
      </div>
      <br /> <br /> <br />
      <Footer />
    </div>
  );
}

export default AddLeave;
