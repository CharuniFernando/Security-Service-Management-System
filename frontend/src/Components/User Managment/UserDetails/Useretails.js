import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import autotable for tables
import "./admindetail.css";
import { IoIosLogOut } from "react-icons/io";
const URL = "http://localhost:5000/employee";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function EmployeDetails() {
  const [emp, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const ComponentsRef = useRef();

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

        // Fetch the updated list of employees after deletion
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

  // Filtered employees based on the selected type
  const filteredEmployees = emp.filter(
    (employee) => !selectedType || employee.type === selectedType
  );

  // Function to generate the report
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Set the title of the document
    doc.text("User Details Report", 14, 10);

    // Define the columns and rows for the PDF table
    const columns = ["Name", "Phone", "Address", "Gmail", "Type"];
    const rows = filteredEmployees.map((item) => [
      item.name,
      item.phone,
      item.address,
      item.gmail,
      item.type,
    ]);

    // Generate the table using autoTable plugin
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20, // Starting point for the table in the PDF
    });

    // Save the PDF file
    doc.save("User_Details_Report.pdf");
  };

  return (
    <div>
      <div className="">
        <div className="">
          <h1 className="admin_topic fade_up">
            User Account
            <span className=""> Details</span>{" "}
          </h1>
          <div className="action_set_admin fade_up">
            <div className="">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="select_drop_admin"
              >
                <option value="">All Types</option>
                <option value="Client">Client</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <tr>
              <td className="">
                <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                  className="admin_search"
                  placeholder="Search Here..."
                  required
                ></input>
              </td>
              <td>
                <button onClick={handleSearch} className="search_btn_admin">
                  Search
                </button>
              </td>
            </tr>
            {/* Generate report button with onClick handler */}
            <button onClick={handleGenerateReport} className="admin_dash_btn">
              Generate Report
            </button>
          </div>
        </div>

        <div className="">
          <div className="table_main_admin fade_up">
            {/* Display All Employees and Clients */}
            <table className="admin_table">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admin_table_th">Name</th>
                  <th className="admin_table_th">Phone</th>
                  <th className="admin_table_th">Address</th>
                  <th className="admin_table_th">Gmail</th>
                  <th className="admin_table_th">Type</th>
                  <th className="admin_table_th">Action</th>
                </tr>
              </thead>
              {filteredEmployees.length === 0 ? (
                <tbody>
                  <tr>
                    <td className="tbl_no" colSpan="6">
                      No Employees or Clients Found
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
        <div className="logout_btn_sub fade_up" onClick={()=>(window.location.href='/admin')}>
          <IoIosLogOut className="logout_btn"/>
        </div>
      </div>
    </div>
  );
}

export default EmployeDetails;
