import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { IoIosLogOut } from "react-icons/io";
const URL = "http://localhost:5000/items";

const ItemDetails = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    quantity: 0,
    size: "",
    company: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filteredItems);
    setNoResults(filteredItems.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedItem = items.find((item) => item._id === id);
    if (selectedItem) {
      setUpdateData({
        id: selectedItem._id,
        name: selectedItem.name,
        quantity: selectedItem.quantity,
        size: selectedItem.size,
        company: selectedItem.company,
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
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchItems(); // Refresh items after update
      setUpdateData({
        id: "",
        name: "",
        quantity: 0,
        size: "",
        company: "",
      });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedItems = items.filter((item) => item._id !== id);
        setItems(updatedItems); // Update items after delete
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // PDF Generation with jsPDF and autoTable
  const handlePrint = () => {
    const doc = new jsPDF();
    const tableData = items.map((item) => [
      item.name,
      item.quantity,
      item.size,
      item.company,
    ]);

    autoTable(doc, {
      head: [["Name", "Quantity", "Size", "Company"]],
      body: tableData,
      margin: { top: 10 },
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
          <div>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="admin_search"
              placeholder="Search Items"
            />
            <button className="search_btn_admin" onClick={handleSearch}>
              Search
            </button>
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
              {items.map((item) => (
                <div>
                  <div className="table_main_admin fade_up ">
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
                          {/* {items.map((item) => ( */}
                          <tr key={item._id}>
                            <td className="admin_table_td ceb_tn_tbl">
                              {" "}
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
                          {/* ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {updateData.id === item._id && (
                    <div className="modal">
                      <div className="modal_content">
                        <h2 className="update_box_topic">
                          Update Item Details
                        </h2>
                        <form onSubmit={handleSubmit}>
                          <label className="form_lable">Name</label>
                          <br />
                          <input
                            className="form_input"
                            type="text"
                            name="name"
                            value={updateData.name}
                            onChange={(e) =>
                              handleChange(e.target.value, "name")
                            }
                            required
                          />
                          <br />
                          <label className="form_lable">Quantity</label>
                          <br />
                          <input
                            className="form_input"
                            type="number"
                            name="quantity"
                            value={updateData.quantity}
                            onChange={(e) =>
                              handleChange(e.target.value, "quantity")
                            }
                            required
                          />
                          <br />
                          <label className="form_lable">Size</label>
                          <br />
                          <input
                            className="form_input"
                            type="text"
                            name="size"
                            value={updateData.size}
                            onChange={(e) =>
                              handleChange(e.target.value, "size")
                            }
                            required
                          />
                          <br />
                          <label className="form_lable">Company</label>
                          <br />
                          <input
                            className="form_input"
                            type="text"
                            name="company"
                            value={updateData.company}
                            onChange={(e) =>
                              handleChange(e.target.value, "company")
                            }
                            required
                          />
                          <br />
                          <button type="submit" className="auth_btn">
                            Save
                          </button>
                          <button
                            onClick={() => false}
                            type="submit"
                            className="auth_btn"
                          >
                            cancel update
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
    </div>
  );
};

export default ItemDetails;
