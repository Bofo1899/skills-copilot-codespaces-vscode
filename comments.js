// create web server
// 1. load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comments = require('../models/comments');

// 2. create router object
var commentRouter = express.Router();

// 3. use body-parser
commentRouter.use(bodyParser.json());

// 4. create routes
commentRouter.route('/')
.get(function(req, res, next) {
    Comments.find({}, function(err, comment) {
        if (err) throw err;
        res.json(comment);
    });
})

.post(function(req, res, next) {
    Comments.create(req.body, function(err, comment) {
        if (err) throw err;
        console.log('Comment created!');
        var id = comment._id;
    
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the comment with id: ' + id);
        
    });