import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import Footer from "../../Home/UserHome/Footer";

function AddInquiry() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
    InquiryID: "",
    phone: "",
    date: "",
    type: "",
    userID: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inquiryID = () => {
    const prefix = "IID";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    // Fetch the user ID from local storage when the component mounts
    const userData = JSON.parse(localStorage.getItem("user")); // assuming "user" is the key
    const userID = userData?._id; // Extracting the _id from the user object

    setInputs((prevInputs) => ({
      ...prevInputs,
      InquiryID: inquiryID(),
      userID: userID || "", // Set userID from local storage or leave empty if not found
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Request Send successfully!");
    window.location.href = "/myinquiry";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/inquiries", {
      name: inputs.name,
      email: inputs.email,
      message: inputs.message,
      InquiryID: inputs.InquiryID,
      phone: inputs.phone,
      date: inputs.date,
      type: inputs.type,
      userID: inputs.userID,
    });
  };

  return (
    <div>
      <HomeNav />
      <br /> <br /> <br />
      <div className="">
        <div className="auth_from_update_main">
          <div>
            <div>
              <h1 className="auth_topic">
                Add <span className="inquiry-us">Inquiry</span>
              </h1>
              <form onSubmit={handleSubmit} className="inquiry-full-box-form">
                <div className="from_two_set">
                  <div>
                    <label className="form_lable">Inquiry ID</label>
                    <br />
                    <input
                      type="text"
                      name="InquiryID"
                      value={inputs.InquiryID}
                      onChange={handleChange}
                      className="form_input date_input"
                      required
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="form_lable">User ID</label>
                    <br />
                    <input
                      type="text"
                      name="userID"
                      value={inputs.userID}
                      onChange={handleChange}
                      className="form_input date_input"
                      required
                      readOnly
                    />
                  </div>
                </div>

                <div className="from_two_set">
                  <div>
                    <label className="form_lable">Name</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      value={inputs.name}
                      onChange={handleChange}
                      className="form_input date_input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form_lable">Email</label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                      className="form_input date_input"
                      required
                    />
                  </div>
                </div>
                <div className="from_two_set">
                  <div>
                    <label className="form_lable">Phone</label>
                    <br />
                    <input
                      type="number"
                      name="phone"
                      value={inputs.phone}
                      onChange={handleChange}
                      className="form_input date_input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form_lable">Date</label>
                    <br />
                    <input
                      type="date"
                      name="date"
                      value={inputs.date}
                      onChange={handleChange}
                      className="form_input date_input"
                      required
                    />
                  </div>
                </div>
                <label className="form_lable">Type</label>
                <br />
                <select
                  name="type"
                  value={inputs.type}
                  onChange={handleChange}
                  className="form_input"
                  required
                >
                  <option value="" disabled>
                    Select a Type
                  </option>
                  <option value="Security officers issue">
                    Security officers issue
                  </option>
                  <option value="Booking issue">Booking issue</option>
                  <option value="Payment issue">Payment issue</option>
                </select>
                <br />

                <label className="form_lable">Message</label>
                <br />
                <textarea
                  name="message"
                  value={inputs.message}
                  onChange={handleChange}
                  className="form_input"
                  required
                />
                <br />
                <button type="submit" className="auth_btn">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br /> <br /> <br />
      <Footer />
    </div>
  );
}

export default AddInquiry;
