const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// --- UPDATED GET ALL EVENTS ENDPOINT ---
// It now only fetches events that are happening today or in the future.
router.get("/getallevents", async (req, res) => {
    try {
        // Create a new Date object for the current moment.
        const today = new Date();
        // Set the time to the beginning of the day to include events happening today.
        today.setHours(0, 0, 0, 0);

        // Use a MongoDB query to find events where the 'eventDate' is
        // greater than or equal to ($gte) the start of today.
        const events = await Event.find({ eventDate: { $gte: today } });
        
        res.send(events);
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch events.", error });
    }
});

// GET EVENT BY ID (No changes here)
router.get("/geteventbyid/:eventid", async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventid);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.send(event);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// ADD A NEW EVENT (No changes here)
router.post("/addevent", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).send("Event Added Successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;