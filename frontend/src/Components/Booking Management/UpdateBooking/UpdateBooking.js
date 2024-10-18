import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBooking() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    packages: "",
    date: "",
    status: "Pending",
    securityOfficer: "",
    specialInstructions: "",
  });
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        console.log("Fetching data for id:", id);
        const response = await axios.get(`http://localhost:5000/bookings/${id}`);
        const data = response.data.booking; // Assuming data.booking is the correct path
        console.log("Data fetched:", data);
        setInputs({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          packages: data.packages || "",
          date: data.date || "",
          status: data.status || "Pending",
          securityOfficer: data.securityOfficer || "",
          specialInstructions: data.specialInstructions || "",
        });
        console.log("Inputs state after fetch:", inputs); // Debug log
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
      await axios.put(`http://localhost:5000/bookings/${id}`, inputs);
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
      window.alert("Booking updated successfully!");
      history("/bookingdash");
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
            Update <span className="course-us">Booking</span>
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
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces are allowed"
              required
            />
            <br />
            <label className="form_lable">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={(e) => {
                // Allow only letters, numbers, and periods
                const regex = /^[a-zA-Z0-9._@]+$/; // Regex to allow letters, numbers, and periods only
                if (regex.test(e.target.value) || e.target.value === "") {
                  handleChange(e); // Update input if valid
                }}}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Phone</label>
            <br />
            <input
              type="tel"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              className="form_input"
              pattern="[0-9]{10}"
              maxLength={10}
              inputMode="numeric"
              onInput={(e)=>{
                e.target.value = e.target.value.replace(/[^0-9]/g,"");
              }}
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
              min={new Date().toISOString().split("T")[0]}
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
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces are allowed"
              required
            />
            <br />
            <label className="form_lable">
              Special Instructions
            </label>
            <br />
            <input
              type="text"
              name="specialInstructions"
              value={inputs.specialInstructions}
              onChange={handleChange}
              className="form_input"
              pattern="[A-Za-z0-9\s]+"
              title="Only letters, numbers, and spaces are allowed. No special characters or minus numbers."
              required
            />
            <br />
            <button type="submit" className="auth_btn" >
              Update Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBooking;
