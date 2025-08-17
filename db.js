const mongoose = require("mongoose");

// 1. The password has been updated to the new one.
var mongoURL = process.env.MONGO_URI;

// 2. The old, unnecessary options have been removed.
mongoose.connect(mongoURL);

var connection = mongoose.connection;

// I've made these log messages a bit clearer for you.
connection.on('error', () => {
    console.log('Mongo DB Connection Failed'); 
});

connection.on('connected', () => {
    console.log('Mongo DB Connection Successful!'); 
});

module.exports = mongoose;