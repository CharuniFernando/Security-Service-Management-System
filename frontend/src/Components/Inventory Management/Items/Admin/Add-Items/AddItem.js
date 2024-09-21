import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    category: "", // Category as the first input
    name: "",
    quantity: 0,
    size: "",
    company: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.category || // Check if category is empty
      !inputs.name ||
      !inputs.quantity ||
      !inputs.size ||
      !inputs.company ||
      !inputs.imageUrl
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/items", inputs);
      showAlert("Item added successfully!");
      navigate("/inventory/itemdash");
    } catch (error) {
      console.error("Error adding item:", error);
      showAlert("Error adding item. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewItems = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">Add Item</h1>
          <form onSubmit={handleSubmit} className="item-full-box-form">
            <label className="form_lable">Category</label>
            <br></br>
            <select
              name="category"
              value={inputs.category}
              onChange={handleChange}
              className="form_input"
              required
            >
              <option value="">Select Here</option>
              <option value="guns">Guns</option>
              <option value="uniform">Uniform</option>
              <option value="batons">Batons</option>
              <option value="radios">Radios</option>
              <option value="handcuffs">Handcuffs</option>
              <option value="vests">Vests</option>
            </select>
            <br />
            <label className="form_lable">Name</label>
            <br></br>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Quantity</label>
            <br></br>
            <input
              type="number"
              name="quantity"
              value={inputs.quantity}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Size</label>
            <br></br>
            <input
              type="text"
              name="size"
              value={inputs.size}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Company</label>
            <br></br>
            <input
              type="text"
              name="company"
              value={inputs.company}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_lable">Image URL</label>
            <br></br>
            <input
              type="text"
              name="imageUrl"
              value={inputs.imageUrl}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <button type="submit" className="auth_btn">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRate;
