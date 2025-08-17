const express = require("express");
const cors = require("cors");
const app = express();

// DB Config
const dbConfig = require('./db');

// --- All our routes ---
const eventsRoute = require('./routes/eventsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const teamsRoute = require('./routes/teamsRoute'); // <-- The new route

// Middleware
app.use(cors());
app.use(express.json());

// --- WIRING UP THE ROUTES ---
app.use('/api/events', eventsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/teams', teamsRoute); // <-- Activating the new route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Node server started on port ' + port));
