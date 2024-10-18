import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    category: "",
    name: "",
    quantity: 1, // Start with a positive value
    size: "",
    company: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: name === "quantity" ? Number(value) : value, // Ensure quantity is stored as a number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Ensure all required fields are filled
    if (Object.values(inputs).some((input) => !input)) {
      setError("Please provide all required information.");
      return;
    }

    // Ensure quantity is positive (after converting it to a number)
    if (inputs.quantity <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/items", inputs);
      alert("Item added successfully!");
      setInputs({
        category: "",
        name: "",
        quantity: 1, // Reset to a positive value
        size: "",
        company: "",
        imageUrl: "",
      });
      navigate("/inventory/itemdash");
    } catch (error) {
      console.error("Error adding item:", error.response || error); // Log the full error
      setError(error.response?.data?.message || "Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth_from_update">
        <div className="auth_from_update_main">
          <h1 className="auth_topic">Add Item</h1>
          <form onSubmit={handleSubmit} className="item-full-box-form">
            <label className="form_label">Category</label>
            <br />
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
            <label className="form_label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_label">Quantity</label>
            <br />
            <input
              type="number"
              name="quantity"
              value={inputs.quantity}
              onChange={handleChange}
              className="form_input"
              required
              min="1" // Prevents negative numbers in the input field
              placeholder="Enter quantity"
            />
            <br />
            <label className="form_label">Size</label>
            <br />
            <input
              type="text"
              name="size"
              value={inputs.size}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            <label className="form_label">Company</label>
            <br />
            <select
              name="company"
              value={inputs.company}
              onChange={handleChange}
              className="form_input"
              required
            >
              <option value="">Select Here</option>
              <option value="Security Office, Nugegoda">Security Office, Nugegoda</option>
              <option value="Security Office, Malabe">Security Office, Malabe</option>
              <option value="Security Office, Gampaha">Security Office, Gampaha</option>
            </select>
            <br />
            <label className="form_label">Image URL</label>
            <br />
            <input
              type="url"
              name="imageUrl"
              value={inputs.imageUrl}
              onChange={handleChange}
              className="form_input"
              required
            />
            <br />
            {error && <p className="error-message">{error}</p>} {/* Display error messages */}
            <button type="submit" className="auth_btn" disabled={loading}>
              {loading ? "Adding..." : "Add Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRate;
