// requires programs that will be called later in the code
const express = require('express');
const path = require('path');

// requires routes to be able to organize code in a modular way
const api = require('./routes/index.js');

// creates constant app that calls express, creates a constant PORT that will be used when server is launched
const PORT = 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to handle routing of fetch requests. all code will be routed following /api
app.use('/api', api);
//Middleware for static elements in db 
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
