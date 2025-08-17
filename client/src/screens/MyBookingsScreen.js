import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/loader';
import Error from '../components/error';
import { Tabs, Tab } from 'react-bootstrap';

function MyBookingsScreen() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = JSON.parse(localStorage.getItem('currentUser'))?._id;

    useEffect(() => {
        if (!userId) {
            setError("You need to be logged in to view your bookings.");
            setLoading(false);
            return;
        }

        async function fetchMyBookings() {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/bookings/get-bookings-by-userid/${userId}`);
                setBookings(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Could not fetch your bookings.");
            } finally {
                setLoading(false);
            }
        }

        fetchMyBookings();
    }, [userId]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-4 text-center">My Registrations</h2>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Error message={error} />
                    ) : bookings.length > 0 ? (
                        <Tabs defaultActiveKey="upcoming" id="bookings-tabs" className="mb-3 justify-content-center">
                            <Tab eventKey="upcoming" title="Upcoming Events">
                                {bookings.map(booking => (
                                    <div className="card shadow-sm mb-3" key={booking._id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{booking.event.title}</h5>
                                            <p className="card-text">
                                                <strong>Event Date:</strong> {new Date(booking.event.eventDate).toLocaleDateString()}
                                            </p>
                                            <p className="card-text">
                                                <strong>Payment Status:</strong>
                                                <span className={`ms-2 badge ${booking.paymentStatus === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                                    {booking.paymentStatus}
                                                </span>
                                            </p>
                                            <hr />
                                            {/* --- THIS IS THE NEW TEAM DISPLAY LOGIC --- */}
                                            <h6 className="card-subtitle mb-2 text-muted">Your Team</h6>
                                            {booking.team ? (
                                                <div>
                                                    <p><strong>Team Name:</strong> {booking.team.teamName}</p>
                                                    <strong>Members:</strong>
                                                    <ul className="list-group list-group-flush">
                                                        {booking.team.members.map(member => (
                                                            <li key={member._id} className="list-group-item">
                                                                {member.name} ({member.email})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <p className="text-info">
                                                    Your team is being formed. Please check back after the registration deadline!
                                                </p>
                                            )}
                                            {/* --- END OF NEW LOGIC --- */}
                                        </div>
                                    </div>
                                ))}
                            </Tab>
                            <Tab eventKey="past" title="Past Events">
                                <div className='p-3 text-center text-muted'>
                                    Past event history will be shown here.
                                </div>
                            </Tab>
                        </Tabs>
                    ) : (
                        <div className="text-center">
                            <h4>You haven't registered for any events yet.</h4>
                            <p>Check out the <a href="/home">events page</a> to find your next adventure!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyBookingsScreen;