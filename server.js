var express = require('express');
var app = express();


var http = require('http').Server(app);
var multer  = require('multer');
var config = require('./scripts/config.js');
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

// STREAMING AUDIO - use the below endpoint to stream audio
// instead of downloading the file.

// Disabled as the audio tag doesn't support scanning with
// streamed audio - an 'audio' symlink is placed into the assets
// folder to map the aduio library

//app.get("/assets/audio/:audioFile", function(req, res){
//    var pathToAudioFile = config.AUDIO_LIBRARY_PATH + req.params.audioFile;
//    if (fs.existsSync(pathToAudioFile)){
//        res.setHeader("content-type", "audio/mpeg");
//        fs.createReadStream(pathToAudioFile).pipe(res);
//    } else //{
//        res.status(400).send("Audio file cannot be found");
//    }
//});



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

// GET /api/recording/id
app.get('/api/recording/:id', function(req, res){
    var query = "CALL GetRecordingById(" + utils.htmlEscape(req.params.id) + ");";
    connection.query(query, function(err, rows){
        if (err) {
            res.status(400).send("error retrieving recording from the database");
            return;
        }
        res.json(rows);
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
            + utils.htmlEscape(req.body.size) + ",'"
            + utils.htmlEscape(req.body.duration) + "',"
            + utils.htmlEscape(req.body.actID) + ",'"
            + utils.htmlEscape(req.body.title) + "','"
            + utils.htmlEscape(req.body.recLocation) + "','"
            + utils.htmlEscape(utils.mysqlFormatDate(req.body.recDate)) + "','"
            + utils.htmlEscape(req.body.recNotes) + "','"
            + utils.htmlEscape(req.body.tags) + "');";

        connection.query(query, function(err){
            if (err) {
                res.status(400).send("error inserting the recording record into the database");
            } else {
                connection.query('SELECT last_insert_id() AS id;', function(err, rows){
                    if (err){
                        res.status(400).send("can't get the new recording record insert ID from the database");
                    } else {
                        res.json({id: rows[0].id});
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
    connection.query("CALL GetRecordingById(" + utils.htmlEscape(req.params.id) + ")", function(err, rows){

        if (err){
            res.status(400).send("recording id does not exist in the database");
            return;
        }

        var fileToDelete = rows[0][0].audioFile;

        fs.unlink(config.AUDIO_LIBRARY_PATH + fileToDelete + ".mp3", function(err){
            if (err){
                res.status(400).send("cannot delete the file");
                return;
            }
            connection.query("CALL DeleteRecording('" + utils.htmlEscape(fileToDelete) + "');", function(err){
                res.sendStatus((err) ? 400 : 200);
            });
        });
    });
});

// PUT /api/recording/id
app.put('/api/recording/:id', function(req, res){
    var query = "CALL UpdateRecording("
        + utils.htmlEscape(req.params.id) + ","
        + utils.htmlEscape(req.body.actID) + ",'"
        + utils.htmlEscape(req.body.title) + "','"
        + utils.htmlEscape(req.body.recLocation) + "','"
        + utils.htmlEscape(utils.mysqlFormatDate(req.body.recDate)) + "','"
        + utils.htmlEscape(req.body.recNotes) + "','"
        + utils.htmlEscape(req.body.tags) + "');";

    connection.query(query, function(err){
        if(err){
            console.log(err);
            res.status(400).send("can't update the recording in the database");
        }
        res.json({msg: "success"});
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


// POST /api/artist
app.post('/api/artist', function(req, res){

    var query = "CALL InsertAct('"
        + utils.htmlEscape(req.body.actName) + "','"
        + utils.htmlEscape(req.body.actTown) + "','"
        + utils.htmlEscape(req.body.actCountry) + "','"
        + utils.htmlEscape(req.body.website) + "','"
        + utils.htmlEscape(req.body.tags) + "','"
        + utils.htmlEscape(req.body.biog) + "');";

    connection.query(query, function(err){
        if (err) {
            console.log(err);
            res.status(400).send("error inserting the artist record into the database");
        } else {
            connection.query('SELECT last_insert_id() AS id;', function(err, rows){
                if (err){
                    console.log(err);
                    res.status(400).send("can't get the new artist record insert ID from the database");
                } else {
                    res.json({id: rows[0].id});
                }
            });
        }
    });
});

// PUT /api/artist/id
app.put('/api/artist/:id', function(req, res){
    var query = "CALL UpdateArtist("
        + utils.htmlEscape(req.params.id) + ",'"
        + utils.htmlEscape(req.body.actName) + "','"
        + utils.htmlEscape(req.body.actTown) + "','"
        + utils.htmlEscape(req.body.actCountry) + "','"
        + utils.htmlEscape(req.body.website) + "','"
        + utils.htmlEscape(req.body.tags) + "','"
        + utils.htmlEscape(req.body.biog) + "');";

    connection.query(query, function(err){
        if(err){
            console.log(err);
            res.status(400).send("can't update the artist in the database");
        }
        res.json({msg: "success"});
    });
});

// DELETE /api/artist/id
app.delete('/api/artist/:id', function(req, res){

    // find all the artist's recordings
    connection.query("CALL GetAllRecordingsByActId(" + utils.htmlEscape(req.params.id) + ");", function(err, rows){

        // first delete all of the artist's recordings (one by one)
        rows[0].map(function(recording){

            // delete the mp3 file
            fs.unlink(config.AUDIO_LIBRARY_PATH + recording.audioFile + ".mp3", function(err){
                if (err){
                    res.status(400).send("cannot delete the file " + recording.audioFile + ".mp3");
                    return;
                }

                // then delete the recording's database entry
                connection.query("CALL DeleteRecording('" + utils.htmlEscape(recording.audioFile) + "');", function(err){
                    if (err){
                        res.status(400).send("an artist's recording could not be deleted from the database");
                    }
                });
            });
        });

        // next, delete the artist from the database
        connection.query("CALL DeleteAct(" + utils.htmlEscape(req.params.id) + ");", function(err){
            if (err){
                res.status(400).send("the artist could not be deleted from the database");
            }
            res.sendStatus(200);
        });
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