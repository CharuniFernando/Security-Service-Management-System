import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddOperation = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  // State to manage the list of officers
  const [officers, setOfficers] = useState(booking?.officers || []);
  const [newOfficer, setNewOfficer] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const navigate = useNavigate();

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee"); // Update the endpoint if needed
        const employees = response.data.emp.filter(
          (employee) => employee.type === "Employee"
        );
        setEmployeeOptions(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle adding a new officer
  const handleAddOfficer = () => {
    if (selectedOfficer && !officers.includes(selectedOfficer)) {
      setOfficers([...officers, selectedOfficer]);
      setSelectedOfficer("");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend with the booking ID and officers
      const response = await axios.post("http://localhost:5000/operations", {
        bookingId: booking._id, // Ensure booking._id is available and correct
        officers,
      });

      // Handle the response
      console.log("Operation added:", response.data);
      alert("Added Succefully!");

      // Navigate to /allbookings
      navigate("/operations");
    } catch (error) {
      console.error("Error adding operation:", error);
      // Optionally, you could display an error message
    }
  };

  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">Operation Schedule</h1>
          <form onSubmit={handleSubmit}>
            <div className="from_two_set">
              <div>
                <label className="form_lable">Name: </label>
                <br />
                <input
                  className="form_input date_input"
                  type="text"
                  value={booking?.name || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="form_lable">Email:</label>
                <br />
                <input
                  className="form_input date_input"
                  type="email"
                  value={booking?.email || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="from_two_set">
              <div>
                <label className="form_lable">Phone: </label>
                <br />
                <input
                  className="form_input date_input"
                  type="text"
                  value={booking?.phone || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="form_lable">Packages: </label>
                <br />
                <input
                  className="form_input date_input"
                  type="text"
                  value={booking?.packages || ""}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="form_lable">Date: </label>
              <br />
              <input
                className="form_input"
                type="date"
                value={booking?.date || ""}
                readOnly
              />
            </div>

            <div className="from_two_set">
              <div>
                <label className="form_lable">Security Officer Name: </label>
                <br />
                <input
                  className="form_input date_input"
                  type="text"
                  value={booking?.securityOfficer || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="form_lable">Special Instructions: </label>
                <br />
                <input
                  className="form_input date_input"
                  type="text"
                  value={booking?.specialInstructions || ""}
                  readOnly
                />
              </div>
            </div>

            <label className="form_lable">Officers: </label>
            <br />
            <div className="seletc_opection">
              <select
                className="form_input"
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
              >
                <option value="">Select an officer</option>
                {employeeOptions.map((employee) => (
                  <option key={employee._id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="add_btn"
                onClick={handleAddOfficer}
              >
                Add
              </button>
            </div>
            <div className="fl_data_dl">
              {officers.map((officer, index) => (
                <div className="details_box_model" key={index}>
                  <p className="data_name">🕵️‍♂️ {officer}</p>
                </div>
              ))}
            </div>

            <br />
            <button type="submit" className="auth_btn">
              Save Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOperation;
