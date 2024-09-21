import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IoIosLogOut } from "react-icons/io";
const URL = "http://localhost:5000/payments"; // Updated URL for bookings
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const PaymentTable = () => {
  const [payment, setPayments] = useState([]); // Initialize as an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.payment) {
        setPayments(data.payment);
      }
    });
  }, []);

  const handleSearch = () => {
    const filtered = payment.filter((payment) =>
      Object.values(payment).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPayments(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );
    if (!isConfirmed) return; // If the user cancels, exit the function

    try {
      await axios.delete(`${URL}/${id}`);
      const update = payment.filter((payment) => payment._id !== id);
      setPayments(update);
      // Show success message
      window.alert("Payment successfully deleted");
    } catch (err) {
      alert("Failed to delete payment");
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [
        [
          "Booking ID",
          "amount",
          "method",
          "paymentID",
          "address",
          "cardnumber",
          "cardholdername",
          "cvv",
          "exp-date",
        ],
      ],
      body: payment.map((payment) => [
        payment.bookingId || "N/A",
        payment.amount || "N/A",
        payment.method || "N/A",
        payment.paymentID || "N/A",
        payment.address || "N/A",
        payment.cardnumber || "cash payment",
        payment.cardholdername || "cash payment",
        payment.cvv || "cash payment",
        payment.date || "cash payment",
      ]),
    });
    doc.save("payment_report.pdf");
  };

  return (
    <div>
      <div>
        <h1 className="admin_topic fade_up">
          Payment <span className="">Details</span>
        </h1>
        <div className="action_set_admin fade_up">
          <button
            type="button"
            className="admin_dash_btn"
            onClick={generateReport}
          >
            Generate Report
          </button>
          <div className="">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="admin_search"
              placeholder="Search Here..."
              value={searchQuery}
            />
            <button onClick={handleSearch} className="search_btn_admin">
              Search
            </button>
          </div>
        </div>
        {noResults ? (
          <div className="no_found fade_up">
            <div className="no_found_img "></div>
            <p className="">Please Enter Valid Details</p>
          </div>
        ) : (
          <div className="table_main_admin fade_up">
            <div className="table_container">
              <table className="admin_table ">
                <thead>
                  <tr className="admin_tbl_tr">
                    <th className="admin_table_th">Booking ID</th>
                    <th className="admin_table_th">amount</th>
                    <th className="admin_table_th">method</th>
                    <th className="admin_table_th">paymentID</th>
                    <th className="admin_table_th">address</th>
                    <th className="admin_table_th">cardnumber</th>
                    <th className="admin_table_th">cardholdername</th>
                    <th className="admin_table_th">CVV</th>
                    <th className="admin_table_th">EXP date</th>
                    <th className="admin_table_th">Status</th>
                    <th className="admin_table_th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payment &&
                    payment.map((payment) => (
                      <tr key={payment._id}>
                        <td className="admin_table_td">{payment.bookingId}</td>
                        <td className="admin_table_td">{payment.amount}</td>
                        <td className="admin_table_td">{payment.method}</td>
                        <td className="admin_table_td">{payment.paymentID}</td>
                        <td className="admin_table_td">{payment.address}</td>
                        <td className="admin_table_td">
                          {payment.cardnumber || "cash payment"}
                        </td>
                        <td className="admin_table_td">
                          {payment.cardholdername || "cash payment"}
                        </td>
                        <td className="admin_table_td">
                          {payment.cvv || "cash payment"}
                        </td>
                        <td className="admin_table_td">
                          {payment.date || "cash payment"}
                        </td>
                        <td className="admin_table_td">
                          {payment.status || "pending"}
                        </td>
                        <td className="admin_table_td">
                          <Link to={`/updatepaymnt/${payment._id}`}>
                            <button className="update_btn_dash_admin">
                              Status
                            </button>
                          </Link>
                          <button
                            className="btn_dash_admin_delete"
                            onClick={() => handleDelete(payment._id)}
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
};

export default PaymentTable;
