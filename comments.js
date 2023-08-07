// Create Web Server
var express = require('express');
var app = express();

// Create a route to handle incoming requests
app.get('/', function(req, res){
    res.send('Hello World!');
});

// Create a route to handle incoming requests
app.get('/comments', function(req, res){
    res.send('Comments!');
});

// Start the server
app.listen(3000, function(){
    console.log('Server is running on Port 3000');
}); 