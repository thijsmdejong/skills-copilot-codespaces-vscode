// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Get comments
app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// Add comment
app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

// Start server
app.listen(3000);
console.log('Server started: http://localhost:3000/');