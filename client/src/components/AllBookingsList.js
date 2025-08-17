import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './loader';
import Error from './error';

function AllBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAllBookings() {
            try {
                setLoading(true);
                const { data } = await axios.get('https://socially-backend-3btp.onrender.com/api/bookings/getallbookings');
                setBookings(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch bookings.');
            } finally {
                setLoading(false);
            }
        }
        fetchAllBookings();
    }, []);

    return (
        <div className="p-3">
            <h4>All User Registrations</h4>
            {loading && <Loader />}
            {error && <Error message={error} />}
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Event Name</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Payment Status</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 && bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{booking.event?.title || 'Event not found'}</td>
                                <td>{booking.user?.name || 'User not found'}</td>
                                <td>{booking.user?.email || 'N/A'}</td>
                                <td>
                                    <span className={`badge ${booking.paymentStatus === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                                <td>{booking.transactionId || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllBookingsList;