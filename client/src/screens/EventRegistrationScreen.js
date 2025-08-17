import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader';
import Error from '../components/error';
import Success from '../components/success';

function EventRegistrationScreen() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [event, setEvent] = useState(null);
    const [registrationMode, setRegistrationMode] = useState(null);

    const [teamName, setTeamName] = useState('');
    const [teamEmails, setTeamEmails] = useState(['']);

    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const { data } = await axios.get(`https://socially-backend-3btp.onrender.com/api/events/geteventbyid/${eventId}`);
                setEvent(data);
            } catch (error) {
                console.error(error);
                setError("Could not fetch event details.");
            } finally {
                setLoading(false);
            }
        }
        fetchEventDetails();
    }, [eventId]);

    // --- THIS IS THE CORRECTED FUNCTION ---
    async function handleSoloBooking() {
        if (!user) {
            setError("You must be logged in to register.");
            return;
        }
        const bookingDetails = { eventId, userId: user._id, registrationType: 'SOLO' };
        try {
            setLoading(true);
            const result = await axios.post('https://socially-backend-3btp.onrender.com/api/bookings/book-event', bookingDetails);
            setLoading(false);
            setSuccess(result.data.message);
            const newBookingId = result.data.booking._id;
            setTimeout(() => navigate(`/payment/${newBookingId}`), 2000);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "An error occurred during registration.");
        }
    }

    const addEmailInput = () => {
        if (event && teamEmails.length < (event.teamSize - 1)) {
            setTeamEmails([...teamEmails, '']);
        }
    };

    const handleEmailChange = (index, value) => {
        const newEmails = [...teamEmails];
        newEmails[index] = value;
        setTeamEmails(newEmails);
    };
    
    async function handleTeamBookingSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!user) {
            setError("You must be logged in to create a team.");
            return;
        }

        const teamData = {
            eventId,
            captainUserId: user._id,
            teamName,
            teammateEmails: teamEmails.filter(email => email !== ''),
        };

        try {
            setLoading(true);
            const result = await axios.post('https://socially-backend-3btp.onrender.com/api/teams/create-and-register', teamData);
            setLoading(false);
            setSuccess(result.data.message);

            const newBookingId = result.data.booking._id;
            setTimeout(() => {
                navigate(`/payment/${newBookingId}`);
            }, 2500);

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Failed to create team.");
        }
    }

    const renderTeamForm = () => (
        <div className="mt-4 p-4 border rounded" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(22, 27, 34, 0.5)' }}>
            <h4 style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Create Your Team</h4>
            <form onSubmit={handleTeamBookingSubmit}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'var(--primary-color)' }}>Team Name</label>
                    <input type="text" className="form-control" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'var(--primary-color)' }}>Invite Teammates by Email (up to {event.teamSize - 1})</label>
                    {teamEmails.map((email, index) => (
                        <input
                            key={index}
                            type="email"
                            className="form-control mb-2"
                            placeholder={`Teammate ${index + 1} email`}
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            required
                        />
                    ))}
                    {event && teamEmails.length < (event.teamSize - 1) && (
                         <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addEmailInput}>
                            + Add Teammate
                        </button>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Create Team & Register</button>
                <button type="button" className="btn btn-link" onClick={() => setRegistrationMode(null)}>Back</button>
            </form>
        </div>
    );

    const renderChoiceButtons = () => (
        <div className="d-grid gap-3 mt-4">
            <button className="btn btn-primary btn-lg" onClick={() => setRegistrationMode('TEAM')}>
                Enter with my own team
            </button>
            <button className="btn btn-success btn-lg" onClick={() => { setRegistrationMode('SOLO'); handleSoloBooking(); }}>
                Let's meet new people! (Enter solo)
            </button>
        </div>
    );

    return (
        <div className="container mt-5">
            {loading ? <Loader /> : event ? (
                <div className="card p-4 shadow-sm">
                    <h2>Register for: {event.title}</h2>
                    <p className="text-muted">Event Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                    <hr style={{ borderColor: 'var(--border-color)' }}/>

                    {error && <Error message={error} />}
                    {success && <Success message={success} />}

                    {registrationMode === 'TEAM' ? renderTeamForm() : renderChoiceButtons()}
                </div>
            ) : (
                <Error message={"Could not load event details."} />
            )}
        </div>
    );
}

export default EventRegistrationScreen;

