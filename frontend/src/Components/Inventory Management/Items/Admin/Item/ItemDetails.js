// ItemDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IoIosSearch } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

const URL = "http://localhost:5000/items";

const ItemDetails = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    quantity: 0,
    size: "",
    category: "",
    company: "",
    imageUrl: "",
  });

  const companies = [
    "Security Office, Nugegoda",
    "Security Office, Malabe",
    "Security Office, Gampaha",
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response.data.items);
      setFilteredItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.trim() === "") {
      setFilteredItems(items);
      setNoResults(false);
      setIsSearching(false);
      return;
    }

    const filtered = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredItems(filtered);
    setNoResults(filtered.length === 0);
    setIsSearching(false);
  };

  const handleUpdate = (id) => {
    const selectedItem = items.find((item) => item._id === id);
    if (selectedItem) {
      setUpdateData({
        id: selectedItem._id,
        name: selectedItem.name,
        quantity: selectedItem.quantity,
        size: selectedItem.size,
        category: selectedItem.category,
        company: selectedItem.company,
        imageUrl: selectedItem.imageUrl,
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for quantity
    if (updateData.quantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    // Validation for name
    if (!updateData.name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    // Validation for size
    if (!updateData.size.trim()) {
      alert("Size cannot be empty.");
      return;
    }

    // Validation for category
    if (!updateData.category.trim()) {
      alert("Category cannot be empty.");
      return;
    }

    // Validation for company selection
    if (!updateData.company) {
      alert("Please select a company.");
      return;
    }

    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchItems(); // Refresh items after update
      setUpdateData({
        id: "",
        name: "",
        quantity: 0,
        size: "",
        category: "",
        company: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error updating item:", error);
      alert("An error occurred while updating the item. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedItems = items.filter((item) => item._id !== id);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

//pdf generate

  const handlePrint = () => {
    const doc = new jsPDF();
    const generatedTime = new Date().toLocaleString();

    const tableData = filteredItems.map((item) => [
      item.name,
      item.quantity,
      item.size,
      item.company,
    ]);

    doc.setFontSize(14);
    doc.text("Inventory Item Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${generatedTime}`, 14, 30);

    autoTable(doc, {
      head: [["Name", "Quantity", "Size", "Company"]],
      body: tableData,
      margin: { top: 40 },
    });

    doc.save("items_report.pdf");
  };

  return (
    <div>
      <h1 className="admin_topic fade_up">
        Inventory Item<span className="">Details</span>
      </h1>
      <div>
        <div className="action_set_admin fade_up">
          <button
            className="admin_dash_btn"
            onClick={() => (window.location.href = "/inventory/additem")}
          >
            Add Item
          </button>
          <div className="search_container">
            <div className="search_input_wrapper">
              <IoIosSearch className="search_icon" />
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                name="search"
                className="admin_search"
                placeholder="Search Items"
                value={searchQuery}
              />
              {isSearching && <FaSpinner className="spinner_icon" />}
            </div>
          </div>
          <button className="admin_dash_btn" onClick={handlePrint}>
            Generate Report
          </button>
        </div>

        <div>
          {noResults ? (
            <div className="no_found fade_up">
              <div className="no_found_img "></div>
              <p className="">Please Enter Valid Details</p>
            </div>
          ) : (
            <div>
              {filteredItems.map((item) => (
                <div key={item._id} className="fade_in_item">
                  <div className="table_main_admin fade_up">
                    <div className="table_container">
                      <table className="admin_table ">
                        <thead>
                          <tr className="admin_tbl_tr">
                            <th className="admin_table_th">Photo</th>
                            <th className="admin_table_th">Name</th>
                            <th className="admin_table_th">Quantity</th>
                            <th className="admin_table_th">Size</th>
                            <th className="admin_table_th">Company</th>
                            <th className="admin_table_th">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="admin_table_td ceb_tn_tbl">
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt="Item_Image"
                                  className="table_img"
                                />
                              )}
                            </td>
                            <td className="admin_table_td">{item.name}</td>
                            <td className="admin_table_td">{item.quantity}</td>
                            <td className="admin_table_td">{item.size}</td>
                            <td className="admin_table_td">{item.company}</td>
                            <td className="admin_table_td ceb_tn_tbl">
                              <button
                                className="update_btn_dash_admin"
                                onClick={() => handleUpdate(item._id)}
                              >
                                Update
                              </button>
                              <button
                                className="btn_dash_admin_delete"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {updateData.id === item._id && (
                    <div className="modal">
                      <div className="modal_content">
                        <h2 className="update_box_topic">Update Item Details</h2>
                        <form onSubmit={handleSubmit}>
                          <label className="form_lable">Name</label>
                          <br />
                          <input
                            type="text"
                            value={updateData.name}
                            onChange={(e) => handleChange(e.target.value, "name")}
                          />
                          <br />
                          <label className="form_lable">Quantity</label>
                          <br />
                          <input
                            type="number"
                            value={updateData.quantity}
                            onChange={(e) =>
                              handleChange(Number(e.target.value), "quantity")
                            }
                          />
                          <br />
                          <label className="form_lable">Size</label>
                          <br />
                          <input
                            type="text"
                            value={updateData.size}
                            onChange={(e) =>
                              handleChange(e.target.value, "size")
                            }
                          />
                          <br />
                          <label className="form_lable">Category</label>
                          <br />
                          <input
                            type="text"
                            value={updateData.category}
                            onChange={(e) =>
                              handleChange(e.target.value, "category")
                            }
                          />
                          <br />
                          <label className="form_lable">Company</label>
                          <br />
                          <select
                            value={updateData.company}
                            onChange={(e) => handleChange(e.target.value, "company")}
                          >
                            <option value="">Select Company</option>
                            {companies.map((company, index) => (
                              <option key={index} value={company}>
                                {company}
                              </option>
                            ))}
                          </select>
                          <br />
                          <div className="button_container">
                            <button
                              type="submit"
                              style={{ backgroundColor: "#015b7e", color: "white" }}
                              className="update_submit_btn"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              style={{ backgroundColor: "#015b7e", color: "white" }}
                              onClick={() => setUpdateData({ id: "", name: "", quantity: 0, size: "", category: "", company: "", imageUrl: "" })}
                              className="cancel_btn"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
