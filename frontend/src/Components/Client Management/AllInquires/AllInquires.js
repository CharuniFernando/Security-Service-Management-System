import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const URL = "http://localhost:5000/inquiries"; // Updated URL for inquiries
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const InquiryDetails = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.client) {
        setInquiries(data.client);
      }
    });
  }, []);

  const handleSearch = () => {
    const filtered = inquiries.filter((client) =>
      Object.values(client).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setInquiries(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedInquiries = inquiries.filter(
          (inquiry) => inquiry._id !== id
        );
        setInquiries(updatedInquiries); // Update inquiries after delete
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  /* PDF Generation */
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Inquiries Report", 14, 16);
    doc.autoTable({
      startY: 22,
      head: [
        [
          "InquiryID",
          "name",
          "email",
          "date",
          "phone",
          "type",
          "message",
          "response",
        ],
      ],
      body: inquiries.map((inquiry) => [
        inquiry.InquiryID,
        inquiry.name,
        inquiry.email,
        inquiry.date,
        inquiry.phone,
        inquiry.type,
        inquiry.message,
        inquiry.response,
      ]),
    });
    doc.save("inquiries_report.pdf");
  };

  return (
    <div>
      <h1 className="admin_topic fade_up">
        Inquiry <span className="">Details</span>
      </h1>
      <div className="action_set_admin fade_up">
        <button
          className="admin_dash_btn"
          type="button"
          onClick={handleDownloadPDF}
        >
          Generate Report
        </button>

        <div>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="admin_search"
            placeholder="Search Inquiries"
          />
          <button className="search_btn_admin" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div>
        <br />
        {noResults ? (
          <div className="no_found fade_up">
            <div className="no_found_img "></div>
            <p className="">Please Enter Valid Details</p>
          </div>
        ) : (
          <div className="table_main_admin fade_up ">
            <div className="table_container">
              <table className="admin_table ">
                <thead>
                  <tr className="admin_tbl_tr">
                    <th className="admin_table_th">InquiryID</th>
                    <th className="admin_table_th">User ID</th>
                    <th className="admin_table_th">name</th>
                    <th className="admin_table_th">email</th>
                    <th className="admin_table_th">date</th>
                    <th className="admin_table_th">phone</th>
                    <th className="admin_table_th">type</th>
                    <th className="admin_table_th">message</th>
                    <th className="admin_table_th">response</th>
                    <th className="admin_table_th">status</th>
                    <th className="admin_table_th">action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
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
                      <td className="admin_table_td">
                        <Link to={`/updateInqu/${inquiry._id}`}>
                          <button className="update_btn_dash_admin">
                            Respond
                          </button>
                        </Link>
                        <button
                          className="btn_dash_admin_delete"
                          onClick={() => handleDelete(inquiry._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="logout_btn_main">
          <div
            className="logout_btn_sub fade_up"
            onClick={() => (window.location.href = "/admin")}
          >
            <IoIosLogOut className="logout_btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetails;
