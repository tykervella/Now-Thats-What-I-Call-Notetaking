const notes = require('express').Router();


const files = require('../db/notes.json');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json(files)
});

// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a note`);

//   // Destructuring assignment for the items in req.body
//   const { title, text} = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newReview = {
//       product,
//       review,
//       username,
//       review_id: uuid(),
//     };

//     // Convert the data to a string so we can save it
//     const reviewString = JSON.stringify(newReview);

  
//       // Obtain existing reviews
//      fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         // Convert string into JSON object
//         const parsedReviews = JSON.parse(data);

//         // Add a new review
//         parsedReviews.push(newReview);

//         // Write updated reviews back to the file
//         fs.writeFile(
//           './db/reviews.json',
//           JSON.stringify(parsedReviews, null, 4),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated reviews!')
//         );
//       }
//     });

//     const response = {
//       status: 'success',
//       body: newReview,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });

module.exports = notes;

