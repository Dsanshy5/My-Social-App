import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Show({ showData }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle the "Book Now" button click
  const handleBookNow = () => {
    const user = JSON.parse(localStorage.getItem("currentUser")); // Get user from localStorage
    if (user) {
      // If user is logged in, navigate to the booking page
      navigate(`/book/${showData._id}`);
    } else {
      // If user is not logged in, redirect to the login page with the current route as state
      navigate("/login", { state: { from: `/book/${showData._id}` } });
    }
  };

  return (
    <div className="row show-card">
      <div className="col-md-4">
        <img src={showData.imageurls[0]} className="smallimg" alt={showData.name_of_show} />
      </div>
      <div className="col-md-7 show-details">
        <h1>{showData.name_of_show}</h1>
        <b>
          <p>Max Count: {showData.maxcountofseat}</p>
          <p>Price per seat: ₹{showData.price_per_ticket}</p>
          <p>Type: {showData.type}</p>
        </b>
        <div style={{ float: "right" }}>
          <button className="btn btn-primary" onClick={handleBookNow}>
            Book Now
          </button>
          <button
            style={{ float: "right" }}
            className="btn view-details-btn"
            onClick={handleShow}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{showData.name_of_show}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {showData.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <h4>Current Bookings:</h4>
          {Array.isArray(showData.currentbookings) &&
          showData.currentbookings.length > 0 ? (
            <ul>
              {showData.currentbookings.map((booking, index) => (
                <li key={index}>
                  <strong>User:</strong> {booking.user}, <strong>Seats:</strong>{" "}
                  {booking.seats}, <strong>Date:</strong> {booking.booking_date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No current bookings</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Show;