const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');
const fs = require('fs');



notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  const idToDelete = req.params.id;

  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((notes) => {
      const updatedNotes = notes.filter((note) => note.note_id !== idToDelete);

      fs.writeFile('./db/notes.json', JSON.stringify(updatedNotes, null, 4), (err) => {
        if (err) {
          res.status(500).json({ error: 'Could not delete note' });
        } else {
          res.json(`Note with id ${idToDelete} deleted successfully 🚀`);
        }
      });
    });
});


module.exports = notes;

