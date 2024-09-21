import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import Footer from "../../Home/UserHome/Footer";

function AddBooking() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    packages: "",
    date: "",
    bookingID: "",
    securityOfficer: "",
    specialInstructions: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const BookingID = () => {
    const prefix = "BID";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      bookingID: BookingID(),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    localStorage.setItem("bookingID", inputs.bookingID);
    window.alert("Booking Added successfully!");
    window.location.href = "/addpayment";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/bookings", {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      packages: inputs.packages,
      date: inputs.date,
      bookingID: inputs.bookingID,
      securityOfficer: inputs.securityOfficer,
      specialInstructions: inputs.specialInstructions,
    });
  };
  return (
    <div>
      <HomeNav />
      <br /> <br /> <br />
      <div className="auth_from_update_main">
        <div>
          <h1 className="auth_topic">
            Add <span className="booking-us">Booking</span>
          </h1>
          <form onSubmit={handleSubmit} className="booking-full-box-form">
            <label className="form_lable">Booking ID</label>
            <br />
            <input
              type="text"
              name="bookingID"
              value={inputs.bookingID}
              className="form_input"
              readOnly
              required
            />
            <br />
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
              type="number"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Packages</label>
            <br />
            <select
              name="packages"
              value={inputs.packages}
              onChange={handleChange}
              className="form_input"
              required
            >
              <option value="" disabled>
                Select a package
              </option>
              <option value="Lady security officers (3 members)">
                Lady security officers (3 members)
              </option>
              <option value="Security officers (2 members)">
                Security officers (2 members)
              </option>
              <option value="VVIP officer (25 members)">
                VVIP officer (25 members)
              </option>
              <option value="Bodyguard (10 members)">
                Bodyguard (10 members)
              </option>
            </select>
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
            <label className="form_lable">Security Officer</label>
            <br />
            <input
              type="text"
              name="securityOfficer"
              value={inputs.securityOfficer}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Special Instructions</label>
            <br />
            <textarea
              type="text"
              name="specialInstructions"
              value={inputs.specialInstructions}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <button type="submit" className="auth_btn">
              Add Payment
            </button>
          </form>
        </div>
      </div>
      <br /> <br /> <br />
      <Footer />
    </div>
  );
}

export default AddBooking;
