const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Example: 'Sports', 'Creative', 'Outdoor', 'Social'
    eventType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    teamSize: {
        type: Number,
        required: true,
        default: 1 // Default to 1 for solo events or if not specified
    },
    imageUrls: [{
        type: String
    }],
    // We will store references to users who have registered
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // We can also link to the teams once they are formed
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Future-proof: allows users to create events
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;