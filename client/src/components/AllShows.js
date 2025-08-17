import React, { useEffect, useState } from "react";
import axios from "axios";

function AllShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await axios.get("https://socially-backend-3btp.onrender.com/api/show/getallshows");
        setShows(response.data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    }
    fetchShows();
  }, []);

  return (
    <div>
      <h2>All Shows</h2>
      <table className="table">
        <thead> 
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Max Seats</th>
            <th>Price per Seat</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show) => (
            <tr key={show._id}>
              <td>{show.name_of_show}</td>
              <td>{show.type}</td>
              <td>{show.maxcountofseat}</td>
              <td>₹{show.price_per_ticket}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default AllShows;