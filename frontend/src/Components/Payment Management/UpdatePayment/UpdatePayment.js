import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePayment() {
  const [inputs, setInputs] = useState({
    bookingId: "",
    method: "",
    amount: "",
    paymentID: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Added for error handling
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/payments/${id}`
        );

        // Debugging: Log the entire response
        console.log("API Response:", response);

        const data = response.data.payment; // Correct path based on your code
        if (!data) {
          throw new Error("Payment data is undefined");
        }

        // Debugging: Log the payment data
        console.log("Payment Data:", data);

        setInputs({
          bookingId: data.bookingId, // Access nested fields safely
          method: data.method, // Access nested fields safely
          amount: data.amount || "",
          paymentID: data.paymentID || "",
          status: data.status || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch payment data");
        setLoading(false);
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/payments/${id}`, inputs);
    } catch (error) {
      console.error("Error sending update request:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    window.alert("Payment updated successfully!");
    navigate("/payments");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">
            Add <span className="course-us">Payment Status</span>
          </h1>
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Display error message */}
          <form className="booking-full-box-form" onSubmit={handleSubmit}>
            <div>
              <label className="form_lable">Booking ID:</label>
              <br />
              <input
                className="form_input"
                type="text"
                name="bookingId"
                value={inputs.bookingId}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="form_lable">paymentID:</label>
              <br />
              <input
                className="form_input"
                type="text"
                name="paymentID"
                value={inputs.paymentID}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="form_lable">method:</label>
              <br />
              <input
                className="form_input"
                type="text"
                name="method"
                value={inputs.method}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="form_lable">Amount:</label>
              <br />
              <input
                className="form_input"
                type="number"
                name="amount"
                value={inputs.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                readOnly
              />
            </div>

            
            <div>
              <label className="form_lable">Status:</label>
              <br />
              <select
                className="form_input"
                name="status"
                value={inputs.status}
                onChange={handleChange}
                required
              >
                <option value="">--Select Status--</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <button type="submit" className="auth_btn">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePayment;
