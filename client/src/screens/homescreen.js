import React, { useState, useEffect } from "react";
import axios from "axios";
import Event from "../components/Event";
import Loader from "../components/loader";
import Error from "../components/error";

function Homescreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/events/getallevents");
        setEvents(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Could not fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // --- SEARCH AND FILTER LOGIC ---
  const filteredEvents = events.filter(event => {
    const term = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      event.eventType.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term)
    );
  });

  // --- GROUPING LOGIC ---
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const { eventType } = event;
    if (!acc[eventType]) {
      acc[eventType] = [];
    }
    acc[eventType].push(event);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      {/* --- SEARCH BAR --- */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for an event, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '8px 0 0 8px' }}
            />
            <button className="btn btn-primary" onClick={() => setSearchTerm("")} style={{ borderRadius: '0 8px 8px 0' }}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div>
          {Object.keys(groupedEvents).length > 0 ? (
            // --- RENDER EVENTS BY CATEGORY ---
            Object.keys(groupedEvents).map(category => (
              <div key={category} className="mb-5">
                <h2 className="mb-4" style={{ fontWeight: 600 }}>{category} Events</h2>
                <div className="row g-4">
                  {groupedEvents[category].map(event => (
                    <div className="col-lg-4 col-md-6" key={event._id}>
                      <Event eventData={event} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // --- RENDER IF NO RESULTS FOUND ---
            <div className="text-center">
              <h4>No events found for "{searchTerm}".</h4>
              <p>Try searching for something else!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Homescreen; 