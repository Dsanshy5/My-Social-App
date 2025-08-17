import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Event({ eventData }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleRegisterClick = () => {
    navigate(`/register-event/${eventData._id}`);
  };

  const fallbackImage = 'https://placehold.co/800x450/A0AEC0/FFFFFF?text=Socially';

  return (
    <>
      <div className="card h-100" style={{ cursor: 'pointer' }} onClick={handleShowModal}>
        <img
          src={eventData.imageUrls && eventData.imageUrls.length > 0 ? eventData.imageUrls[0] : fallbackImage}
          className="card-img-top"
          alt={eventData.title}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{eventData.title || "Untitled Event"}</h5>
            <span className="badge rounded-pill" style={{ backgroundColor: 'var(--secondary-color)', color: 'white' }}>
              {eventData.eventType}
            </span>
          </div>
          <p className="card-text text-muted mt-2">{eventData.location || "Location TBD"}</p>
          <p className="card-text flex-grow-1">{eventData.description ? eventData.description.substring(0, 90) + '...' : "No description available."}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span style={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '1.2rem' }}>
              ₹{eventData.price}
            </span>
            <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleRegisterClick(); }}>
              Register Now
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-light" style={{ backgroundColor: 'var(--card-background)', borderBottom: '1px solid var(--border-color)'}}>
          <Modal.Title>{eventData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'var(--card-background)' }}>
          {/* --- THIS IS THE CORRECTED IMAGE SECTION --- */}
          <Carousel indicators={false}>
            {eventData.imageUrls && eventData.imageUrls.length > 0 ? (
              eventData.imageUrls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100 rounded" src={url} alt={`Slide ${index + 1}`} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img className="d-block w-100 rounded" src={fallbackImage} alt="Event" />
              </Carousel.Item>
            )}
          </Carousel>
          <hr style={{ borderColor: 'var(--border-color)' }} />
          <h5 style={{ color: 'var(--primary-color)', fontWeight: '600' }}>About this Event</h5>
          <p>{eventData.description || "No description available."}</p>
          <p><strong>Date:</strong> {new Date(eventData.eventDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Location:</strong> {eventData.location}</p>
          <p><strong>Team Size:</strong> {eventData.teamSize} people per team</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'var(--card-background)', borderTop: '1px solid var(--border-color)'}}>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleRegisterClick}>Register for ₹{eventData.price}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Event;
