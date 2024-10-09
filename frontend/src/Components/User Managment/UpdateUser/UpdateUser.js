import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UpdateEmploye() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employee/${id}`
        );
        setInputs(response.data.emp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/employee/${id}`, {
        type: String(inputs.type),
        name: String(inputs.name),
        phone: String(inputs.phone),
        address: String(inputs.address),
        gmail: String(inputs.gmail),
        emptype: String(inputs.emptype),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Updated Email validation for gmail (case-insensitive)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!emailRegex.test(inputs.gmail)) {
      window.alert("Please enter a valid gmail address ending with @gmail.com");
      return; // Stop form submission if invalid
    }
    console.log(inputs);
  
    sendRequest().then(() => {
      window.alert("Account Update successfully!");
      history("/useredetails");
    });
  };
  
  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <div className="">
            <h1 className="auth_topic">
              Update Account
              <span className=""> Details</span>{" "}
            </h1>
            <div className="item_full_box">
              <form className="" onSubmit={handleSubmit}>
                <label className="form_lable">Type</label>
                <br />
                <select
                  className="form_input"
                  value={inputs.type}
                  onChange={handleChange}
                  name="type"
                  required
                >
                  <option value="">Select Type</option>{" "}
                  <option value="Client">Client</option>
                  <option value="Employee">Employee</option>
                </select>
                <br></br>
                {inputs.type === "Employee" && (
                  <>
                    <label className="form_lable">
                      Select Your Employee Type
                    </label>
                    <br></br>
                    <select
                      className="form_input"
                      value={inputs.emptype}
                      onChange={handleChange}
                      name="emptype"
                    >
                      <option value="">Select Type</option>
                      {/* Optional placeholder */}
                      <option value="Security Officer">Security Officer</option>
                      <option value="Lady Security Officer">
                        Lady Security Officer
                      </option>
                      <option value="Body Guard">Body Guard</option>
                      <option value="Lady Security Officer">
                        VVIP Officer
                      </option>
                    </select>

                    <br></br>
                  </>
                )}
                <label className="form_lable">name</label>
                <br></br>
                <input
                  className="form_input"
                  type="text"
                  value={inputs.name}
                  onChange={(e) => {
                    const re = /^[A-Za-z\s]*$/;
                    if (re.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  name="name"
                  required
                />
                <br></br>
                <label className="form_lable">phone</label>
                <br></br>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form_input"
                  value={inputs.phone}
                  onChange={(e) => {
                    const re = /^[0-9\b]{0,10}$/;
                    if (re.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  maxLength="10"
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits."
                  required
                />
                <br></br>
                <label className="form_lable">gmail</label>
                <br></br>
                <input
                  className="form_input"
                  type="email"
                  value={inputs.gmail}
                  onChange={handleChange}
                  name="gmail"
                  required
                />
                <br></br>
                <label className="form_lable">address</label>
                <br></br>
                <input
                  className="form_input"
                  type="text"
                  value={inputs.address}
                  onChange={handleChange}
                  name="address"
                  required
                />
                <br></br>
                <button type="submit" className="auth_btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmploye;
