import React, { useState } from "react";
import axios from "axios";

function AddOrRemoveShows() {
  const [showData, setShowData] = useState({
    name_of_show: "",
    type: "",
    maxcountofseat: "",
    price_per_ticket: "",
    imageurls: [],
    date: "", // Add date field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowData({ ...showData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://socially-backend-3btp.onrender.com/api/show/addshow", showData);
      alert("Show added successfully!");
    } catch (error) {
      console.error("Failed to add show:", error);
    }
  };

  return (
    <div>
      <h2>Add/Remove Shows</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name_of_show"
          placeholder="Show Name"
          value={showData.name_of_show}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={showData.type}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="maxcountofseat"
          placeholder="Max Seats"
          value={showData.maxcountofseat}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price_per_ticket"
          placeholder="Price per Seat"
          value={showData.price_per_ticket}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={showData.date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Show</button>
      </form>
    </div>
  );
}

export default AddOrRemoveShows;