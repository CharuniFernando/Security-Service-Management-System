import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateInquiry() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
    InquiryID: "",
    phone: "",
    date: "",
    type: "",
    userID: "",
    status: "Pending",
    response: "",
  });
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/inquiries/${id}`
        );
        setInputs(response.data.client); // Ensure response structure is correct
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
      await axios.put(`http://localhost:5000/inquiries/${id}`, {
        name: inputs.name,
        email: inputs.email,
        message: inputs.message,
        InquiryID: inputs.InquiryID,
        phone: inputs.phone,
        date: inputs.date,
        type: inputs.type,
        userID: inputs.userID,
        response: inputs.response,
        status: inputs.status,
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
      window.alert("Inquiry solved successfully!");
      history("/inquiresdash");
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">
            Solve <span className="course-us">Inquiry</span>
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
              </div>
            </div>
            <label className="form_lable">Type</label>
            <br />
            <input
              name="type"
              value={inputs.type}
              onChange={handleChange}
              className="form_input"
              required
              readOnly
            />

            <br />

            <label className="form_lable">Message</label>
            <br />
            <textarea
              name="message"
              value={inputs.message}
              onChange={handleChange}
              className="form_input"
              required
              readOnly
            />
            <label className="form_lable">Status:</label>
            <select
              name="status"
              className="form_input"
              value={inputs.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Here</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <label className="form_lable">Response: </label>
            <br />
            <textarea
              className="form_input"
              name="response"
              value={inputs.response}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth_btn">
              Slove Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateInquiry;
