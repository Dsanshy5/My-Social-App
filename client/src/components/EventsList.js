import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './loader';
import Error from './error';

function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const { data } = await axios.get('https://socially-backend-3btp.onrender.com/api/events/getallevents');
                setEvents(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch events.');
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    return (
        <div className="p-3">
            <h4>All Events</h4>
            {loading && <Loader />}
            {error && <Error message={error} />}
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Event ID</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Team Size</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 && events.map(event => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event._id}</td>
                            <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                            <td>{event.location}</td>
                            <td>₹{event.price}</td>
                            <td>{event.teamSize}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventsList; 
