import React, { useState } from 'react';
import axios from 'axios';
import Loader from './loader';
import Error from './error';
import Success from './success';

function AddEvent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventType: 'Social',
        location: '',
        eventDate: '',
        registrationDeadline: '',
        price: '',
        teamSize: '',
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const eventData = {
            ...formData,
            price: Number(formData.price),
            teamSize: Number(formData.teamSize),
            imageUrls: [formData.imageUrl1, formData.imageUrl2, formData.imageUrl3].filter(url => url !== ''),
        };

        try {
            // --- THIS IS THE CORRECTED LINE ---
            // The "result =" part has been removed as it was unused.
            await axios.post('https://socially-backend-3btp.onrender.com/api/events/addevent', eventData);
            setSuccess('Event added successfully!');
            setFormData({
                title: '', description: '', eventType: 'Social', location: '',
                eventDate: '', registrationDeadline: '', price: '', teamSize: '',
                imageUrl1: '', imageUrl2: '', imageUrl3: '',
            });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to add event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded shadow-sm">
            <h4>Add a New Event</h4>
            <hr />
            {loading && <Loader />}
            {error && <Error message={error} />}
            {success && <Success message={success} />}

            <form onSubmit={handleSubmit}>
                {/* ... rest of the form ... */}
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Event Title</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Location</label>
                        <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Event Type</label>
                        <select className="form-select" name="eventType" value={formData.eventType} onChange={handleInputChange}>
                            <option value="Social">Social</option>
                            <option value="Sports">Sports</option>
                            <option value="Creative">Creative</option>
                            <option value="Outdoor">Outdoor</option>
                        </select>
                    </div>
                     <div className="col-md-6 mb-3">
                        <label className="form-label">Price (₹)</label>
                        <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} required />
                    </div>
                </div>
                 <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Event Date</label>
                        <input type="date" className="form-control" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Registration Deadline</label>
                        <input type="date" className="form-control" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Team Size</label>
                        <input type="number" className="form-control" name="teamSize" value={formData.teamSize} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Image URL 1</label>
                        <input type="text" className="form-control" name="imageUrl1" value={formData.imageUrl1} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Image URL 2</label>
                        <input type="text" className="form-control" name="imageUrl2" value={formData.imageUrl2} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Image URL 3</label>
                        <input type="text" className="form-control" name="imageUrl3" value={formData.imageUrl3} onChange={handleInputChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Add Event</button>
            </form>
        </div>
    );
}

export default AddEvent;

