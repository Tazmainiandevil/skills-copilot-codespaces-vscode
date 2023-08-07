// Create Web Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create Schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String,
    time: String
});

// Create Model
var Comment = mongoose.model('Comment', commentSchema);

// Create Router
app.get('/api/comments', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) return res.status(500).send({error: 'database failure'});
        res.json(comments);
    })
});

app.get('/api/comments/:comment_id', function(req, res) {
    Comment.findOne({_id: req.params.comment_id}, function(err, comment) {
        if (err) return res.status(500).json({error: err});
        if (!comment) return res.status(404).json({error: 'comment not found'});
        res.json(comment);
    })
});

app.post('/api/comments', function(req, res) {
    var comment = new Comment();
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    comment.time = req.body.time;

    comment.save(function(err) {
        if (err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

app.put('/api/comments/:comment_id', function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err) return res.status(500).json({error: 'database failure'});
        if (!comment) return res.status(404).json({error: 'comment not found'});

        if (req.body.name) comment.name = req.body.name;
        if (req.body.comment) comment.comment = req.body.comment;
        if (req.body.time) comment.time = req.body.time;

        comment.save(function(err) {
            if (err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'comment updated'});
        });
    });
});

app.delete('/api/comments/:comment_id', function(req, res) {
    Comment.remove({_id: req.params.comment_id}, function(err, output