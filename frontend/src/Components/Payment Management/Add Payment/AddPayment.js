import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import Footer from "../../Home/UserHome/Footer";

const AddPaymentForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    bookingId: "",
    amount: "",
    method: "",
    paymentID: "",
    address: "",
    cardnumber: "",
    cardholdername: "",
    cvv: "",
    date: "",
  });

  // Fetch the bookingID from local storage when the component loads
  useEffect(() => {
    const storedBookingId = localStorage.getItem("bookingID");
    setInputs((prevInputs) => ({
      ...prevInputs,
      bookingId: storedBookingId || "",
      paymentID: PaymenttID(),
    }));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const PaymenttID = () => {
    const prefix = "PID";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Payment successful!");
    window.location.href = "/home";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/payments", {
      bookingId: inputs.bookingId,
      amount: inputs.amount,
      method: inputs.method,
      paymentID: inputs.paymentID,
      address: inputs.address,
      cardnumber: inputs.cardnumber,
      cardholdername: inputs.cardholdername,
      cvv: inputs.cvv,
      date: inputs.date,
    });
  };

  return (
    <div>
      <HomeNav />
      <div>
        <br /> <br /> <br />
        <div className="auth_from_update_main">
          <div>
            <h1 className="auth_topic">
              Add <span className="booking-us">Payment</span>
            </h1>
            <form onSubmit={handleSubmit} className="booking-full-box-form">
              <div className="from_two_set">
                <div>
                  <label className="form_lable">Payment ID</label>
                  <br />
                  <input
                    type="text"
                    name="paymentID"
                    value={inputs.paymentID}
                    className="form_input date_input"
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label className="form_lable">Booking ID</label>
                  <br />
                  <input
                    type="text"
                    name="bookingId"
                    value={inputs.bookingId}
                    className="form_input date_input"
                    readOnly
                    required
                  />
                </div>
              </div>

              <div className="from_two_set">
                <div>
                  <label className="form_lable">Amount $</label>
                  <br />
                  <input
                    type="number"
                    name="amount"
                    value={inputs.amount}
                    onChange={handleChange}
                    className="form_input date_input"
                    required
                  />
                </div>
                <div>
                  <label className="form_lable">Method</label>
                  <br />
                  <select
                    name="method"
                    value={inputs.method}
                    onChange={handleChange}
                    className="form_input date_input"
                    required
                  >
                    <option value="" disabled>
                      Select payment method
                    </option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>
              </div>

              {/* Show card details only if the method is 'card' */}
              {inputs.method === "card" && (
                <>
                  <label className="form_lable">Card Number</label>
                  <br />
                  <input
                    type="number"
                    name="cardnumber"
                    value={inputs.cardnumber}
                    onChange={handleChange}
                    className="form_input"
                    required
                  />
                  <br />
                  <label className="form_lable">Cardholder Name</label>
                  <br />
                  <input
                    type="text"
                    name="cardholdername"
                    value={inputs.cardholdername}
                    onChange={handleChange}
                    className="form_input"
                    required
                  />
                  <br />
                  <div className="from_two_set">
                    <div>
                      <label className="form_lable">CVV</label>
                      <br />
                      <input
                        type="number"
                        name="cvv"
                        value={inputs.cvv}
                        onChange={handleChange}
                        className="form_input date_input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form_lable">Exp-Date</label>
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
                </>
              )}

              <label className="form_lable">Address</label>
              <br />
              <textarea
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="form_input"
                required
              />
              <br />
              <button type="submit" className="auth_btn">
                Pay
              </button>
            </form>
          </div>
        </div>
        <br /> <br /> <br />
      </div>
      <Footer />
    </div>
  );
};

export default AddPaymentForm;
