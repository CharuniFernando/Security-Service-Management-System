import React, { useState, useEffect } from "react";
import axios from "axios";
import "../operation.css";
import { MdDelete } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OperationsList = () => {
  const [operations, setOperations] = useState([]);
  const [filteredOperations, setFilteredOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOperationId, setEditOperationId] = useState(null);
  const [updatedOfficers, setUpdatedOfficers] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/operations");
        setOperations(response.data.operations);
        setFilteredOperations(response.data.operations); // Set initial filtered operations
      } catch (err) {
        setError("Error fetching operations");
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee");
        const employees = response.data.emp.filter(
          (employee) => employee.type === "Employee"
        );
        setEmployeeOptions(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchOperations();
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this operation?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/operations/${id}`);
        setOperations(operations.filter((operation) => operation._id !== id));
        setFilteredOperations(
          filteredOperations.filter((operation) => operation._id !== id)
        ); // Update filtered operations
        window.alert("Operation successfully deleted!"); // Success alert
      } catch (err) {
        setError("Error deleting operation");
      }
    }
  };
  const handleSearch = () => {
    const filtered = operations.filter((operation) =>
      Object.values(operation).some((field) =>
        field
          ? field.toString().toLowerCase().includes(searchQuery.toLowerCase())
          : false
      )
    );
    setFilteredOperations(filtered); // Update filtered operations
    setNoResults(filtered.length === 0);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/operations/${editOperationId}`, {
        officers: updatedOfficers,
      });
      const updatedOperations = operations.map((operation) =>
        operation._id === editOperationId
          ? { ...operation, officers: updatedOfficers }
          : operation
      );
      setOperations(updatedOperations);
      setFilteredOperations(updatedOperations); // Update filtered operations
      setIsEditing(false);
      setEditOperationId(null);
      setUpdatedOfficers([]);
    } catch (err) {
      setError("Error updating operation");
    }
  };

  const handleEditClick = (operationId, currentOfficers) => {
    setEditOperationId(operationId);
    setUpdatedOfficers(currentOfficers);
    setIsEditing(true);
  };

  const handleAddOfficer = () => {
    if (selectedOfficer && !updatedOfficers.includes(selectedOfficer)) {
      setUpdatedOfficers([...updatedOfficers, selectedOfficer]);
      setSelectedOfficer("");
    }
  };

  const handleRemoveOfficer = (officerToRemove) => {
    setUpdatedOfficers(
      updatedOfficers.filter((officer) => officer !== officerToRemove)
    );
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    // Define table columns and rows
    const columns = [
      { title: "Package", dataKey: "package" },
      { title: "Status", dataKey: "status" },
      { title: "Date", dataKey: "date" },
      { title: "Officers", dataKey: "officers" },
    ];

    const rows = filteredOperations.map((operation) => ({
      package: operation.package,
      status: operation.status,
      date: new Date(operation.date).toLocaleDateString(),
      officers: operation.officers.join(", "),
    }));

    // Add table to the PDF
    doc.autoTable(columns, rows);

    // Save the PDF
    doc.save("operations-list.pdf");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="admin_topic fade_up">Operations List</h1>
      <div className="action_set_admin fade_up">
        <button
          type="button"
          className="admin_dash_btn"
          onClick={() => (window.location.href = "/bookingsall")}
        >
          Add Operation
        </button>
        <div className="">
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
        <button type="button" className="admin_dash_btn" onClick={handlePrint}>
          Generate Report
        </button>
      </div>

      <div className="operatin_card fade_up">
        {filteredOperations.map((operation) => (
          <div className="data_card" key={operation._id}>
            <div>
              <p className="font_main_card">Package:</p>{" "}
              <p className="sub_font_data">{operation.package}</p>
            </div>

            <div>
              <p className="font_main_card">Date:</p>
              <p className="sub_font_data">
                {new Date(operation.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font_main_card">Officers:</p>{" "}
              <p className="sub_font_data">{operation.officers.join(", ")}</p>
            </div>
            <div className="action_btn_set">
              <button
                className="btn_dash_admin_delete"
                onClick={() => handleDelete(operation._id)}
              >
                Delete
              </button>
              <button
                className="update_btn_dash_admin"
                onClick={() =>
                  handleEditClick(operation._id, operation.officers)
                }
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="modal">
          <div className="modal_content">
            <h2 className="update_box_topic">Update Operation Details</h2>
            <label className="form_lable">Officers: </label>
            <div>
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
              <br />
              <button
                type="button"
                className="auth_btn"
                onClick={handleAddOfficer}
              >
                Add Officer
              </button>
            </div>
            <label className="form_lable">Available Officers : </label>
            <div className="fl_data_dl">
              {updatedOfficers.map((officer, index) => (
                <div className="details_box_model" key={index}>
                  <p className="data_name">🕵️‍♂️ {officer}</p>
                  <MdDelete
                    className="dlt_icon"
                    onClick={() => handleRemoveOfficer(officer)}
                  />
                </div>
              ))}
            </div>
            <div className="action_btn_set">
              <button className="update_btn_dash_admin" onClick={handleUpdate}>
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn_dash_admin_delete"
              >
                Cancel
              </button>
            </div>
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
  );
};

export default OperationsList;
