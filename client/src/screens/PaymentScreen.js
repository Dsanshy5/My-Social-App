import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader';
import Error from '../components/error';
import Success from '../components/success';

function PaymentScreen() {
    const { bookingId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [booking, setBooking] = useState(null);

    // Fetch booking details (including event price) when the page loads
    useEffect(() => {
        async function fetchBookingDetails() {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/bookings/getbookingbyid/${bookingId}`);
                setBooking(data);
            } catch (err) {
                console.error(err);
                setError("Could not fetch booking details.");
            } finally {
                setLoading(false);
            }
        }
        fetchBookingDetails();
    }, [bookingId]);

    async function handleMockPayment() {
        try {
            setLoading(true);
            const paymentDetails = { bookingId };
            const result = await axios.post('/api/bookings/confirm-payment', paymentDetails);
            
            setLoading(false);
            setSuccess(result.data.message);

            setTimeout(() => {
                navigate('/mybookings');
            }, 2500);

        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "Payment failed. Please try again.");
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Error message={error} />
                        ) : booking ? (
                            <>
                                <h2 className="text-center">Complete Your Registration</h2>
                                <hr style={{ borderColor: 'var(--border-color)' }} />
                                {success && <Success message={success} />}

                                <div className="text-center my-4">
                                    <h4>Event:</h4>
                                    <p className="text-muted">{booking.event.title}</p>
                                    <h4>Amount to Pay:</h4>
                                    {/* This now displays the REAL price from the event */}
                                    <h3 className="fw-bold" style={{ color: 'var(--primary-color)' }}>₹{booking.event.price}</h3>
                                </div>
                                <button className="btn btn-success btn-lg" onClick={handleMockPayment} disabled={success}>
                                    {success ? 'Payment Successful!' : 'Pay Now'}
                                </button>
                            </>
                        ) : (
                           <Error message="Booking not found." />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentScreen; 