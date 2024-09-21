import React, { useState } from 'react';
import axios from 'axios';

const ValidateInquiryForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();            

    try {
     const response = await axios.post("http://localhost:5000/inquiries/validate", { name, email });

      setClientData(response.data.existingClient);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No matching client found');
        setClientData(null);
      } else {
        setError('Internal Server Error');
      }
    }
  };

  return (
    <div>
      <h2>Validate Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Validate</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {clientData && (
        <div>
          <h3>Client Details</h3>
          <p><strong>Name:</strong> {clientData.name}</p>
          <p><strong>Email:</strong> {clientData.email}</p>
          <p><strong>Message:</strong> {clientData.message}</p>
          <p><strong>Status:</strong> {clientData.status}</p>
          <p><strong>Response:</strong> {clientData.response || 'No response yet'}</p>
          <p><strong>Date:</strong> {new Date(clientData.date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default ValidateInquiryForm;
