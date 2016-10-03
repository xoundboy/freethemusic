var config = require('./server/config.js');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");

// CREATE SERVER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
http.listen(config.SERVER_PORT, function(){
    console.log("Connected & Listen to port " + config.SERVER_PORT);
});

// CONTROLLERS
app.use('/api/login', require('./server/login.js'));
app.use('/api/recording', require('./server/recording.js'));
app.use('/api/image', require('./server/image.js'));
app.use('/api/gallery', require('./server/gallery.js'));
app.use('/api/artist', require('./server/artist.js'));
app.use('/api/playlist', require('./server/playlist.js'));
