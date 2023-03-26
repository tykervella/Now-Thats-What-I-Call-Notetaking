const express = require('express');

// // Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

const app = express();

//middle ware that takes any api requests that go through /notes to be directed to the notes.js file
app.use('/notes', notesRouter);

module.exports = app;


