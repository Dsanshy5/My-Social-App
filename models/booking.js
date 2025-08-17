const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 'SOLO' or 'TEAM'
    registrationType: {
        type: String,
        required: true,
        enum: ['SOLO', 'TEAM']
    },
    // Will link to a Team if registrationType is 'TEAM' or after solo users are grouped
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    paymentStatus: {
        type: String,
        default: 'Pending' // e.g., 'Pending', 'Completed', 'Failed'
    },
    transactionId: {
        type: String // From the payment gateway
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

