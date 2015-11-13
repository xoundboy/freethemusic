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


function mysqlFormatDate(unformattedDate){
    var date = new Date(unformattedDate);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}



/**
 * RECORDINGS
 */

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

// DELETE /api/recording/id
app.delete('/api/recording/:id', function(req, res){
    connection.query("CALL DeleteRecording(" + req.params.id + ");", function(err){
        res.sendStatus((err) ? 400 : 200);
    });
});

// PUT /api/recording/id
app.put('/api/recording/:id', function(req, res){

    var query = "CALL UpdateRecording("
        + req.params.id + ","
        + req.body.typeID + ","
        + req.body.actID + ",'"
        + req.body.audioFile + "','"
        + req.body.recLocation + "','"
        + mysqlFormatDate(req.body.recDate) + "','"
        + req.body.recNotes + "');";

    connection.query(query, function(err){
       res.sendStatus((err) ? 500 : 200);
    });
});

/**
 * ARTISTS
 */

// GET /api/artists
app.get('/api/artists', function(req, res){
    connection.query("CALL GetAllArtists();", function(err, rows){
        (err) ? res.sendStatus(500) : res.json(rows);
    });
});



/**
 * TYPES
 */

// GET /api/types
app.get('/api/types', function(req, res){
    connection.query("CALL GetAllTypes();", function(err, rows){
        (err) ? res.sendStatus(500) : res.json(rows);
    });
});


/**
 * PLAYLISTS
 */

app.use(express.static('public'));

http.listen(SERVER_PORT, function(){
    console.log("Connected & Listen to port " + SERVER_PORT);
});
