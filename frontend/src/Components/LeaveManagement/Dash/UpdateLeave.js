import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateLeave() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/leave/${id}`);
        setInputs(response.data.leave); // Ensure response structure is correct
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/leave/${id}`, {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
        date: inputs.date,
        message: inputs.message,
      });
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
    sendRequest().then(() => {
      window.alert("update successfully!");
      history("/levedash");
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth_from_update">
      <div className="auth_from_update_main">
        <div>
          <h1 className="auth_topic">
            Update <span className="booking-us">Leave</span>
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
              readOnly
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateLeave;
