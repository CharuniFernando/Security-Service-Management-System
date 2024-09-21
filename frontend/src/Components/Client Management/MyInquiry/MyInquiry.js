import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import Footer from "../../Home/UserHome/Footer";

const URL = "http://localhost:5000/inquiries"; // Updated URL for inquiries

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function MyInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [userID, setUserID] = useState(""); // State for userID

  // Fetch inquiries and set userID from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming "user" key contains the user data object
    if (storedUser && storedUser._id) {
      setUserID(storedUser._id); // Set userID from local storage
    }

    fetchHandler().then((data) => {
      if (data && data.client) {
        setInquiries(data.client);
      }
    });
  }, []);

  // Filter inquiries based on userID
  const filteredInquiries = inquiries.filter(
    (inquiry) => inquiry.userID === userID
  );

  return (
    <div>
      <HomeNav />
      <div>
        <h1 className="admin_topic fade_up">
          My Inquiry <span className="">Details</span>
        </h1>
        {/* <h1 className="dinone">
          Your User ID: <span className="">{userID}</span>
        </h1> */}
        <div>
          <div className="fade_up home_container">
            <button
              className="admin_dash_btn"
              type="button"
              onClick={() => (window.location.href = "/addinquiry")}
            >
              Add Inquiry
            </button>
          </div>

          <div className="table_main_admin fade_up">
            <div className="table_container">
              <table className="admin_table">
                <thead>
                  <tr className="admin_tbl_tr">
                    <th className="admin_table_th">InquiryID</th>
                    <th className="admin_table_th">User ID</th>
                    <th className="admin_table_th">Name</th>
                    <th className="admin_table_th">Email</th>
                    <th className="admin_table_th">Date</th>
                    <th className="admin_table_th">Phone</th>
                    <th className="admin_table_th">Type</th>
                    <th className="admin_table_th">Message</th>
                    <th className="admin_table_th">Response</th>
                    <th className="admin_table_th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry._id}>
                      <td className="admin_table_td">{inquiry.InquiryID}</td>
                      <td className="admin_table_td">{inquiry.userID}</td>
                      <td className="admin_table_td">{inquiry.name}</td>
                      <td className="admin_table_td">{inquiry.email}</td>
                      <td className="admin_table_td">{inquiry.date}</td>
                      <td className="admin_table_td">{inquiry.phone}</td>
                      <td className="admin_table_td">{inquiry.type}</td>
                      <td className="admin_table_td">{inquiry.message}</td>
                      <td className="admin_table_td">
                        {inquiry.response || "Pending"}
                      </td>
                      <td className="admin_table_td">
                        {inquiry.status || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyInquiry;
