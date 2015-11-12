// Set the server port
var SERVER_PORT = 8000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'xoundboy_dev'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// GET /api/recordings
app.get('/api/recordings', function(req,res){

    connection.query("CALL GetAllRecordings();", function(err, rows){
        var data = {};
        if(rows.length != 0){
            data["error"] = 0;
            data["Recordings"] = rows;
        } else {
            data["error"] = 0;
            data["Recordings"] = 'No recordings Found..';
        }
        res.json(data);
    });
});

// DELETE /api/recordings/id
app.delete('/api/recordings/:id', function(req,res){
    // TODO - delete the record
    res.sendStatus(200);
});

app.use(express.static('public'));

http.listen(SERVER_PORT, function(){
    console.log("Connected & Listen to port " + SERVER_PORT);
});
