"use client"

import { useState } from "react";
import { toast } from 'react-toastify';

const Register = () => {
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register