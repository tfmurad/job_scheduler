"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName, email: userEmail }),
      });
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Join Newsletter</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-4">
        <input
          className="rounded"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter You Name"
          required
        />
        <input
          className="rounded"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter You Email"
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
