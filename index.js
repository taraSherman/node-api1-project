// implement your API here

// library
const express = require('express');

// database file
const users = require('./data/db.js');

// global object
const server = express();

// middleware
server.use(express.json());

// add user to db
server.post('/api/users', (req, res) => {
  //define name and bio as request body
  const { name, bio } = req.body;
  // if either name or bio are missing
  if (!name || !bio) {
    // respond with 'bad request' status code and JSON message
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    })
    //otherwise
  } else {
    // insert user object
    users.insert(req.body)
    .then(user => {
      // and respond with 'status created' code and the id of the inserted user object
      res.status(201).json(user.id)
    })
    .catch(err => {
      // if there is an error, respond with 'internal server error' code and a JSON message
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database."
      })
    });
  };
});

// fetch all user objects on the server
server.get('/api/users', (req, res) => {
  // request an array of all users in the db
  users.find()
  .then(users => {
    //respond with the array of users
    res.json(users)
  })
  .catch(err => {
    // if an error, respond with 'internal server error' code and JSON error message
    res.status(500).json({
      errorMessage: "The users information could not be retrieved."
    })
  });
});



// listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
