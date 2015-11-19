var express = require('express');
var app = express();


var http = require('http').Server(app);
var multer  = require('multer');
var config = require('./config.js');
var utils = require('./scripts/utils.js');
var fs = require('fs');
var rimraf = require('rimraf');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USER,
    password : config.DB_PASS,
    database : config.DB_NAME
});

var pathToUploadDir = './public/uploads/';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * UPLOAD
 */

// DELETE /api/uploads - empty the temporary uploads folder
app.delete('/api/removetempuploads', function(req, res){

    // remove the uploads directory
    rimraf(pathToUploadDir, function(err){
        if (err){
            res.status(400).send("Temporary uploads folder cannot be removed");
            return;
        }

        // recreate the uploads directory
        fs.mkdir(pathToUploadDir, 0755, function(err){
            if(err){
                res.status(400).send("Temporary uploads folder cannot be recreated");
                return;
            }
            res.sendStatus(200);
        });
    });
});

// POST /api/upload - initial file upload
app.post('/api/upload', multer({ dest: pathToUploadDir}).single('uploadFile'), function(req, res){

    // add the .mp3 extension to the uploaded file
    fs.rename(req.file.path, req.file.path + ".mp3");

    res.json({
        tempName: req.file.filename,
        size: req.file.size
    });
});

/**
 * PLAYBACK
 */
app.get("/assets/audio/:audioFile", function(req, res){
    var pathToAudioFile = config.AUDIO_LIBRARY_PATH + req.params.audioFile;
    if(fs.existsSync(pathToAudioFile)){
        res.setHeader("content-type", "audio/mpeg");
        fs.createReadStream(pathToAudioFile).pipe(res);
    } else {
        res.status(400).send("Audio file cannot be found");
    }
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
        var finalFileName = utils.getUniqueAudioFileName(req.body);

        // move the audio file into the audio library folder
        fs.rename(tempFilePath, config.AUDIO_LIBRARY_PATH + finalFileName + ".mp3");

        // insert the database record for the new file
        var query = "CALL InsertRecording('"
            + finalFileName + "',"
            + req.body.size + ","
            + req.body.duration + ","
            + req.body.actID + ",'"
            + req.body.title + "','"
            + req.body.recLocation + "','"
            + utils.mysqlFormatDate(req.body.recDate) + "','"
            + req.body.recNotes + "','"
            + req.body.tags + "');";

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
    connection.query("CALL GetRecordingById(" + req.params.id + ")", function(err, rows){

        if (err){
            res.status(400).send("recording id does not exist in the database");
            return;
        }

        var fileToDelete = rows[0][0].audioFile;

        fs.unlink(config.AUDIO_LIBRARY_PATH + fileToDelete + ".mp3", function(err){
            if (err){
                console.log(err);
                res.status(400).send("cannot delete the file");
                return;
            }
            connection.query("CALL DeleteRecording('" + fileToDelete + "');", function(err){
                res.sendStatus((err) ? 400 : 200);
            });
        });
    });
});

// PUT /api/recording/id
app.put('/api/recording/:id', function(req, res){

    var query = "CALL UpdateRecording("
        + req.params.id + ","
        + req.body.actID + ",'"
        + req.body.title + "','"
        + req.body.recLocation + "','"
        + utils.mysqlFormatDate(req.body.recDate) + "','"
        + req.body.recNotes + "','"
        + req.body.tags + "');";
console.log(query);
    connection.query(query, function(err){
        console.log(err);
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
// GET /api/playlists
app.get('/api/playlists', function(req, res){
    connection.query("CALL GetAllPlaylists();", function(err, rows){
        (err) ? res.sendStatus(500) : res.json(rows);
    });
});


/**
 * TAGS
 */

// GET /api/tags
app.get('/api/tags', function(req, res){
    connection.query("CALL GetAllTags();", function(err, rows){
        (err) ? res.sendStatus(500) : res.json(rows);
    });
});


app.use(express.static('public'));

http.listen(config.SERVER_PORT, function(){
    console.log("Connected & Listen to port " + config.SERVER_PORT);
});