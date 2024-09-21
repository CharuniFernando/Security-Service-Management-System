import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
const URL = "http://localhost:5000/leave"; // Updated URL for leave
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function LeaveDash() {
  const [leave, setLeave] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.leave) {
        setLeave(data.leave);
      }
    });
  }, []);

  const handleSearch = () => {
    const filtered = leave.filter((leave) =>
      Object.values(leave).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setLeave(filtered);
    setNoResults(filtered.length === 0);
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("leave Report", 14, 22);

    doc.autoTable({
      startY: 30,
      head: [["Name", "Email", "Phone", "Date", "Message"]],
      body: leave.map((leave) => [
        leave.name,
        leave.email,
        leave.phone,
        leave.date,
        leave.message,
      ]),
      theme: "striped",
      margin: { top: 30 },
    });

    doc.save("leave-report.pdf");
  };
  const handlePrint = () => {
    generatePDF();
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Request?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updateleave = leave.filter((leave) => leave._id !== id);
        setLeave(updateleave);
      } catch (error) {
        console.error("Error deleting leave:", error);
      }
    }
  };
  return (
    <div>
      <h1 className="admin_topic fade_up">
        Leave <span>Details</span>
      </h1>
      <div>
        <div className="action_set_admin fade_up">
          <button
            type="button"
            className="admin_dash_btn"
            onClick={handlePrint}
          >
            Generate Report
          </button>
          <div>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="admin_search"
              placeholder="Search leaves"
            />
            <button onClick={handleSearch} className="search_btn_admin">
              Search
            </button>
          </div>
        </div>

        {noResults ? (
          <div className="no_found fade_up">
            <div className="no_found_img"></div>
            <p>Please Enter Valid Details</p>
          </div>
        ) : (
          <div className="table_main_admin fade_up">
            <div className="table_container">
              <table className="admin_table">
                <thead>
                  <tr className="admin_tbl_tr">
                    <th className="admin_table_th">Name</th>
                    <th className="admin_table_th">Email</th>
                    <th className="admin_table_th">Phone</th>
                    <th className="admin_table_th">Date</th>
                    <th className="admin_table_th">Message</th>
                    <th className="admin_table_th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leave?.length > 0 ? (
                    leave.map((leave) => (
                      <tr key={leave._id}>
                        <td className="admin_table_td">{leave.name}</td>
                        <td className="admin_table_td">{leave.email}</td>
                        <td className="admin_table_td">{leave.phone}</td>
                        <td className="admin_table_td">{leave.date}</td>
                        <td className="admin_table_td">{leave.message}</td>
                    
                        <td className="admin_table_td">
                          <Link to={`/updateleave/${leave._id}`}>
                            <button className="update_btn_dash_admin">
                              Update
                            </button>
                          </Link>
                          <button
                            className="btn_dash_admin_delete"
                            onClick={() => handleDelete(leave._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="no_data">
                        No leaves found.
                      </td>
                    </tr>
                  )}
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
}

export default LeaveDash;
