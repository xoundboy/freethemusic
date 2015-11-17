// Set the server port
var SERVER_PORT = 8000;
var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/'});

var fs = require('fs');

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
    var formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    console.log(formattedDate);
    return formattedDate;
}

/**
 * UPLOAD
 */

// POST /api/upload - initial file upload
app.post('/api/upload', upload.single('uploadFile'), function(req, res){

    console.log(req.file);

    // add the .mp3 extension to the uploaded file
    fs.rename(req.file.path,req.file.path + ".mp3");

    res.json({
        tempName: req.file.filename,
        size: req.file.size
    });
});




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

// POST /api/recording
app.post('/api/recording', function(req, res){

    // check if the tempfile exists as an mp3 in the uploads folder
    var tempFilePath = "./public/uploads/"  + req.body.tempName + ".mp3";
    if(fs.existsSync(tempFilePath)){

        // rename the audio file to something more meaningful
        var finalFileName = renameAudioFile(req.body);

        // move the audio file into the audio library folder
        fs.rename(tempFilePath, "./public/assets/audio/" + finalFileName + ".mp3");

        // insert the database record for the new file
        var query = "CALL InsertRecording('"
            + finalFileName + "',"
            + req.body.size + ","
            + req.body.typeID + ","
            + req.body.actID + ",'"
            + req.body.title + "','"
            + req.body.recLocation + "','"
            + mysqlFormatDate(req.body.recDate) + "','"
            + req.body.recNotes + "');";

        // respond to the client about how the save operation went
        connection.query(query, function(err, rows){

            if (err) {
                res.status(400).send("error inserting the record into the database");
            }

            else {
                connection.query('SELECT last_insert_id() AS id;', function(err, rows){
                    if (err){
                        res.status(400).send("can't get the insert ID from the database");
                    } else {
                        res.json(rows[0]);
                    }
                });
            }
        });
    } else {
        res.status(400).send("file does not exist in uploads folder");
    }
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
        + req.body.title + "','"
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


function renameAudioFile(fields){
    var strippedTitle = fields.title.replace(/[^a-zA-Z0-9.]+/g,'');
    var strippedArtist = fields.selectedArtistText.replace(/[^a-zA-Z0-9.]+/g,'');
    var random = Math.random()*100000000000000000;
    var longName = strippedTitle + '-' + strippedArtist + '-' + random;
    return longName.substring(0,46);
}