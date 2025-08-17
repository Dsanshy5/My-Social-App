const express = require("express");
const router = express.Router();
const User = require("../models/user");

// UPDATED REGISTER ROUTE
router.post("/register", async (req, res) => {
    // Destructure all the new fields from the request body
    const { name, email, password, dateOfBirth, gender } = req.body;

    // Basic validation to ensure all required fields are present
    if (!name || !email || !password || !dateOfBirth || !gender) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        // Create a new user with all the required fields
        const newUser = new User({
            name,
            email,
            password, // In a real production app, you MUST hash this password!
            dateOfBirth,
            gender
        });

        await newUser.save();
        res.status(201).send("User Registered Successfully");

    } catch (error) {
        // This will catch any other database errors
        return res.status(500).json({ message: "Something went wrong on the server.", error: error });
    }
});

// LOGIN ROUTE (No changes needed here)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password });
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            }
            res.send(temp);
        } else {
            return res.status(400).json({ message: "Login failed: Invalid credentials" });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// GET ALL USERS (No changes needed)
router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;