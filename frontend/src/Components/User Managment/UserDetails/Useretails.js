import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import autotable for tables
import "./admindetail.css";
import { IoIosLogOut } from "react-icons/io";
import logo from "./img/logo.png";
const URL = "http://localhost:5000/employee";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const convertToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "Anonymous"; // To avoid CORS issues if loading from a server
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png"); // Or 'image/jpeg'
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
  });
};

function EmployeDetails() {
  const [emp, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Employee"); // New state for tab selection
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setEmployee(data.emp));
  }, []);

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Employee Details?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Account deleted successfully!");
        const updatedEmployees = await fetchHandler();
        setEmployee(updatedEmployees.emp);
      } catch (error) {
        console.error("Error deleting details:", error);
      }
    }
  };

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.emp.filter((emp) =>
        Object.values(emp).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setEmployee(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  // Filter employees and clients based on the selected tab
  const filteredEmployees = emp.filter(
    (employee) => employee.type === selectedTab
  );

  const handleGenerateReport = async () => {
    const doc = new jsPDF();

    // Convert the logo image to base64
    const base64Logo = await convertToBase64(logo);

    // Add header with the logo and SSMS title
    doc.setFillColor(0, 102, 204); // Blue background color
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F"); // Rectangle for header background

    // Add logo to the header
    doc.addImage(base64Logo, "PNG", 10, 5, 20, 20); // Adjust position and size of the logo

    // Add "SSMS" to the right side of the header
    doc.setTextColor(255, 255, 255); // White text color for SSMS
    doc.setFontSize(18);
    doc.text("Security Service Management System", doc.internal.pageSize.getWidth() - 120, 9); // Positioning for SSMS title

    doc.setFontSize(12);
    doc.text("Address: No 50/B, Galle Road, Colombo", doc.internal.pageSize.getWidth() - 120, 15); // Positioning for Address

    doc.setFontSize(12);
    doc.text("Contact No: +94 71 560 7832", doc.internal.pageSize.getWidth() - 120, 21); // Positioning for Contact No

    doc.setFontSize(12);
    doc.text("Email: ssms@info.com", doc.internal.pageSize.getWidth() - 120, 26); // Positioning for Contact No


    // Add the title of the report below the header
    doc.setTextColor(0, 0, 0); // Set text color back to black
    doc.text(`${selectedTab} Details Report`, 14, 40);

    // Generate table data
    const columns = ["Name", "Phone", "Address", "Gmail", "Type"];
    const rows = filteredEmployees.map((item) => [
      item.name,
      item.phone,
      item.address,
      item.gmail,
      item.type,
    ]);

    // AutoTable for employee data
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 50, // Adjust the Y-position to leave space for the header
    });

    // Add a footer with SSMS and blue background
    const pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFillColor(0, 102, 204); // Blue background for footer
    doc.rect(0, pageHeight - 20, doc.internal.pageSize.getWidth(), 20, "F"); // Footer rectangle

    doc.setTextColor(169, 169, 169); // Gray text color for SSMS
    doc.setFontSize(12);
    doc.text("SSMS", doc.internal.pageSize.getWidth() / 2 - 10, pageHeight - 7); // Centered text for SSMS

    // Save the generated PDF
    doc.save(`${selectedTab}_Details_Report.pdf`);
  };

  return (
    <div>
      <div>
        <h1 className="admin_topic fade_up">
          User Account <span className="">Details</span>
        </h1>

        {/* Tabs for switching between Employee and Client */}

        <div className="action_set_admin fade_up">
          <button onClick={handleGenerateReport} className="admin_dash_btn">
            Generate {selectedTab} Report
          </button>{" "}
          <div>
            {" "}
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="admin_search"
              placeholder="Search Here..."
              required
            ></input>
            <button onClick={handleSearch} className="search_btn_admin">
              Search
            </button>
          </div>
          {/* Generate report button */}
          &nbsp;&nbsp;
          <button
            onClick={() => (window.location.href = "/adminAddUser")}
            className="admin_dash_btn"
          >
            Add {selectedTab}
          </button>
        </div>
        <div className="tab_navigation">
          <button
            className={`tab_button ${
              selectedTab === "Employee" ? "active_tab" : ""
            }`}
            onClick={() => setSelectedTab("Employee")}
          >
            Employee
          </button>
          <button
            className={`tab_button ${
              selectedTab === "Client" ? "active_tab" : ""
            }`}
            onClick={() => setSelectedTab("Client")}
          >
            Client
          </button>
        </div>
        {/* Display relevant data in a table */}
        <div className="table_main_admin fade_up">
          <div className="table_container">
            <table className="admin_table">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admin_table_th">Name</th>
                  <th className="admin_table_th">Phone</th>
                  <th className="admin_table_th">Address</th>
                  <th className="admin_table_th">Gmail</th>
                  <th className="admin_table_th">Type</th>
                  {selectedTab === "Employee" && (
                    <th className="admin_table_th">Employee Type</th>
                  )}
                  <th className="admin_table_th">Action</th>
                </tr>
              </thead>
              {filteredEmployees.length === 0 ? (
                <tbody>
                  <tr>
                    <td className="tbl_no" colSpan="7">
                      No {selectedTab}s Found
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredEmployees.map((item, index) => (
                    <tr className="admin_tbl_tr" key={index}>
                      <td className="admin_table_td">{item.name}</td>
                      <td className="admin_table_td">{item.phone}</td>
                      <td className="admin_table_td">{item.address}</td>
                      <td className="admin_table_td">{item.gmail}</td>
                      <td className="admin_table_td">{item.type}</td>
                      {selectedTab === "Employee" && (
                        <td className="admin_table_td">{item.emptype || ""}</td>
                      )}
                      <td className="admin_table_td cenbtn">
                        <Link to={`/user/updateemploye/${item._id}`}>
                          <button className="update_btn_dash_admin">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteHandler(item._id)}
                          className="btn_dash_admin_delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="logout_btn_main">
        <div
          className="logout_btn_sub fade_up"
          onClick={() => (window.location.href = "/admin")}
        >
          <IoIosLogOut className="logout_btn" />
        </div>
      </div>
    </div>
  );
}

export default EmployeDetails;
