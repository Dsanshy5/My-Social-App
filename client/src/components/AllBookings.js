import React, { useEffect, useState } from "react";
import axios from "axios";

function AllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Show Name</th>
            <th>User Email</th>
            <th>Number of Seats</th>
            <th>Transaction ID</th>
            <th>Show Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((show) =>
            show.dates.map((date) =>
              date.bookings.map((booking) => (
                <tr key={`${show._id}-${date.show_date}-${booking.transaction_id}`}>
                  <td>{show.name_of_show}</td>
                  <td>{booking.user_email}</td>
                  <td>{booking.number_of_seats}</td>
                  <td>{booking.transaction_id}</td>
                  <td>{new Date(date.show_date).toLocaleDateString()}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllBookings;