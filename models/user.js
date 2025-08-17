const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

// --- THIS IS THE ONLY LINE THAT HAS CHANGED ---
// We are now registering the model as 'User' (capital U) to match our references.
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
