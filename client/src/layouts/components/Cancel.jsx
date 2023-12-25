"use client"

import { useState } from 'react';
import { toast } from 'react-toastify';

const Cancel = () => {
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
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
      <h2>Unsubscribe</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 mt-4'>
        <input
         className="rounded"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter Your Email"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Cancel Subscription</button>
      </form>
    </div>
  );
}

export default Cancel
