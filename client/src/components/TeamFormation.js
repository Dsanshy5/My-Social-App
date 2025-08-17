import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './loader';
import Error from './error';
import Success from './success';

function TeamFormation() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch all events
    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
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

    // Function to handle the "Form Teams" button click
    const handleFormTeams = async (eventId) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // Call the team formation endpoint
            const result = await axios.post(`https://socially-backend-3btp.onrender.com/api/teams/form-teams/${eventId}`);
            setSuccess(result.data.message);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred while forming teams.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3">
            <h4>Team Formation Control</h4>
            <p className="text-muted">
                Click "Form Teams" for an event to automatically group all paid, solo-registered users into random teams.
            </p>
            <hr />
            {loading && <Loader />}
            {error && <Error message={error} />}
            {success && <Success message={success} />}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Event Date</th>
                        <th>Registered Users</th>
                        <th>Team Size</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 && events.map(event => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                            <td>{event.registeredUsers.length}</td>
                            <td>{event.teamSize}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleFormTeams(event._id)}
                                >
                                    Form Teams
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamFormation;
