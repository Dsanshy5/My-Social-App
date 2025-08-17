const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Event = require("../models/event");
const mongoose = require("mongoose");

// Creates a PENDING booking
router.post("/book-event", async (req, res) => {
    const { eventId, userId, registrationType } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ message: "Invalid Event or User ID." }); }
        const event = await Event.findById(eventId);
        if (!event) { return res.status(404).json({ message: "Event not found." }); }
        const existingBooking = await Booking.findOne({ event: eventId, user: userId });
        if (existingBooking) { return res.status(400).json({ message: "You have already initiated a booking for this event." }); }
        
        const newBooking = new Booking({ event: eventId, user: userId, registrationType: registrationType });
        const savedBooking = await newBooking.save();
        
        res.status(201).json({ message: "Booking initiated! Please proceed to payment.", booking: savedBooking });
    } catch (error) {
        console.error("Booking Error:", error);
        return res.status(500).json({ message: "Server error during booking process." });
    }
});

// Confirms payment AND finalizes the registration
router.post("/confirm-payment", async (req, res) => {
    const { bookingId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookingId)) { return res.status(400).json({ message: "Invalid Booking ID." }); }
        const booking = await Booking.findById(bookingId);
        if (!booking) { return res.status(404).json({ message: "Booking not found." }); }

        booking.paymentStatus = 'Completed';
        booking.transactionId = `txn_mock_${Date.now()}`;
        await booking.save();

        await Event.updateOne({ _id: booking.event }, { $push: { registeredUsers: booking.user } });

        res.status(200).json({ message: "Payment successful!", booking: booking });
    } catch (error) {
        console.error("Payment Confirmation Error:", error);
        return res.status(500).json({ message: "Server error during payment confirmation." });
    }
});

// Gets a single booking's details for the payment screen
router.get("/getbookingbyid/:bookingid", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingid).populate('event');
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.send(booking);
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        return res.status(500).json({ message: "Server error." });
    }
});


// --- THIS IS THE RESTORED LOGIC ---
// Gets all bookings for a specific user
router.get("/get-bookings-by-userid/:userid", async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userid })
            .populate('event')
            .populate({
                path: 'team',
                populate: {
                    path: 'members',
                    model: 'User',
                    select: 'name email'
                }
            });
        res.send(bookings);
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return res.status(400).json({ message: "Failed to fetch user bookings.", error });
    }
});

// Gets all bookings for the admin panel
router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('event', 'title')
            .populate('user', 'name email');
        res.send(bookings);
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        return res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;


