// Create web server and listen to port 3000
// Use the Express framework to create a web server
var express = require('express');
var app = express();
// Use body-parser to parse the contents of the body of a POST request
var bodyParser = require('body-parser');
// Create a MongoDB client and connect to the database
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var ObjectID = require('mongodb').ObjectID;
var DB;
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  DB = client.db('commentDB');
});
// Use the static files in the public directory
app.use(express.static('public'));
// Use body-parser to parse the contents of the body of a POST request
app.use(bodyParser.urlencoded({extended: true}));
// Use body-parser to parse the contents of the body of a POST request
app.use(bodyParser.json());
// Set up the server to listen on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
// Handle GET requests to the /comments route
app.get('/comments', function(req, res) {
  // Get the comments collection
  var collection = DB.collection('comments');
  // Find all of the documents in the collection
  collection.find({}).toArray(function(err, docs) {
    // Send the results to the client as JSON
    res.json(docs);
  });
});
// Handle POST requests to the /comments route
app.post('/comments', function(req, res) {
  // Get the comments collection
  var collection = DB.collection('comments');
  // Insert the comment into the collection
  collection.insert(req.body, function(err, docs) {
    // Send a message to the client
    res.send('Successfully inserted comment');
  });
});
// Handle DELETE requests to the /comments route
app.delete('/comments/:id', function(req, res) {
  // Get the comments collection
  var collection = DB.collection('comments');
  // Create a new ObjectID
  var id = new ObjectID(req.params.id);
  // Delete the comment with the specified ID
  collection.deleteOne({_id: id}, function(err, docs) {
    // Send a message to the client
    res.send('Successfully deleted comment');
  });
});
