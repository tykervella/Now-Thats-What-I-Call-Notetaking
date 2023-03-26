const notes = require('express').Router();
// helper methods for writing files
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');
const fs = require('fs');

// GET request at /api/notes/ parses the data from notes.json to provide a JSON file as a response
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST request at /api/notes
notes.post('/', (req, res) => {
  // destructures the req.body into title and text constants
  const { title, text } = req.body;

  // if the req.body has both a title and text value, cretes a newNote object that includes their values and a unique id.
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    // appends newNote object to the data in the notes JSON within our database
    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added successfully 🚀`);
  // if there is not BOTH a title and text in the res.body then we return an error.   
  } else {
    res.error('Error in adding note');
  }
});

// DELETE request at /notes/api/:id
notes.delete('/:id', (req, res) => {
  // creates new constant idToDelete that is set to whatever is entered at the end of the DELETE request
  const idToDelete = req.params.id;
  // reads the database and parses the data to return a JSON file we manipulate with the following code
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    // Checks the "note_id" field in each object in the db and then creates an updatedNotes array that includes all the data, except for the object with the note_id equal to the constant idToDelete
    .then((notes) => {
      const updatedNotes = notes.filter((note) => note.note_id !== idToDelete);
      // writes the file with the updatedNotes array
      fs.writeFile('./db/notes.json', JSON.stringify(updatedNotes, null, 4), (err) => {
        //checks to see if the console throws an error
        if (err) {
          res.status(500).json({ error: 'Could not delete note' });
        } else {
          res.json(`Note with id ${idToDelete} deleted successfully 🚀`);
        }
      });
    });
});


module.exports = notes;

