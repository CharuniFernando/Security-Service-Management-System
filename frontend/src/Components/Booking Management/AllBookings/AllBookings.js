import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../booking.css";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/bookings"; // Updated URL for bookings
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.bookings) {
        setBookings(data.bookings);
      }
    });
  }, []);

  const handleSearch = () => {
    const filteredBookings = bookings.filter((booking) =>
      Object.values(booking).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBookings(filteredBookings);
    setNoResults(filteredBookings.length === 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Bookings Report", 14, 22);

    doc.autoTable({
      startY: 30,
      head: [
        [
          "Name",
          "Email",
          "Phone",
          "Packages",
          "Date",
          "Payment Status",
          "Security Officer",
          "Special Instructions",
        ],
      ],
      body: bookings.map((booking) => [
        booking.name,
        booking.email,
        booking.phone,
        booking.packages,
        booking.date,
        booking.securityOfficer || "N/A",
        booking.specialInstructions || "None",
      ]),
      theme: "striped",
      margin: { top: 30 },
    });

    doc.save("bookings-report.pdf");
  };

  const handlePrint = () => {
    generatePDF();
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Booking Details?")
    ) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updateBooking = bookings.filter((booking) => booking._id !== id);
        setBookings(updateBooking);
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="admin_topic fade_up">
        Booking <span>Details</span>
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
              placeholder="Search Bookings"
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
                    <th className="admin_table_th">Packages</th>
                    <th className="admin_table_th">Date</th>
                    <th className="admin_table_th">Security Officer</th>
                    <th className="admin_table_th">Special Instructions</th>
                    <th className="admin_table_th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="admin_table_td">{booking.name}</td>
                        <td className="admin_table_td">{booking.email}</td>
                        <td className="admin_table_td">{booking.phone}</td>
                        <td className="admin_table_td">{booking.packages}</td>
                        <td className="admin_table_td">{booking.date}</td>

                        <td className="admin_table_td">
                          {booking.securityOfficer || "N/A"}
                        </td>
                        <td className="admin_table_td">
                          {booking.specialInstructions || "None"}
                        </td>
                        <td className="admin_table_td">
                          <Link to={`/updateboking/${booking._id}`}>
                            <button className="update_btn_dash_admin">
                              Update
                            </button>
                          </Link>
                          <button
                            className="btn_dash_admin_delete"
                            onClick={() => handleDelete(booking._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="no_data">
                        No bookings found.
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
};

export default AllBookings;
