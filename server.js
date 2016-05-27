var express = require('express');
var app = express();


var http = require('http').Server(app);
var multer  = require('multer');
var config = require('./scripts/config.js');
var utils = require('./scripts/helpers/commonUtils.js');
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

var pathToAudioUploadDir = './public/uploads/audio';
var pathToImageUploadDir = './public/uploads/images';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var stormpath = require('stormpath');

var apiKey = new stormpath.ApiKey(
    process.env['STORMPATH_CLIENT_APIKEY_ID'],
    process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormpath.Client({ apiKey: apiKey });

var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];

client.getApplication(applicationHref, function(err, application) {
    //console.log('Application:', application);
});

function handleError(err, res) {
    if (err) {
        console.log(err);
        res.status(400).send(err.msg);
        return true;
    }
    return false;
}

function getLastId(res, callback){
    connection.query('SELECT last_insert_id() AS id;', function (err, rows) {
        if (err) {
            res.status(400).send("can't get the latest insert ID from the database");
        } else {
            callback(rows[0].id);
        }
    });
}

/**
 * UPLOAD
 */

// DELETE /api/uploads - empty the temporary uploads folder
app.delete('/api/removetempuploads', function(req, res){

    // remove the uploads directory
    rimraf(pathToAudioUploadDir, function(err){
        if (err){
            res.status(400).send("Temporary uploads folder cannot be removed");
            return;
        }

        // recreate the uploads directory
        fs.mkdir(pathToAudioUploadDir, 0755, function(err){
            if(err){
                res.status(400).send("Temporary uploads folder cannot be recreated");
                return;
            }
            res.sendStatus(200);
        });
    });
});

// POST /api/upload - initial file upload
app.post('/api/upload', multer({ dest: pathToAudioUploadDir}).single('uploadFile'), function(req, res){

    // add the .mp3 extension to the uploaded file
    fs.rename(req.file.path, req.file.path + ".mp3");

    res.json({
        tempName: req.file.filename,
        size: req.file.size
    });
});

// POST /api/image/upload - initial file upload
app.post('/api/image/upload', multer({ dest: pathToImageUploadDir}).single('uploadFile'), function(req, res){

    var acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg", "image/bmp", "image/jpg", "image/gif"];
    var mimetype = req.file.mimetype;

    if (acceptedFileTypes.indexOf(mimetype) != -1){
        var finalFileName = utils.getUniqueArtistImageFileName(req.body.actName, utils.getExtFromMimeType(mimetype));
        fs.rename(pathToImageUploadDir + "/" + req.file.filename, config.IMAGE_LIBRARY_PATH + finalFileName);
    } else {
        res.status(400).send("illegal file extension");
    }

    res.json({
        tempName: req.file.filename,
        size: req.file.size,
        finalImageFileName: finalFileName
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
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        rows = (rows && rows.length != 0) ? rows : {};
        res.json(rows);
    });
});

// GET /api/recording/id
app.get('/api/recording/:id', function(req, res){
    var query = "CALL GetRecordingById(" + utils.htmlEscape(req.params.id) + ");";
    connection.query(query, function(err, rows){
        if (err) {
            console.log(err);
            res.status(400).send("error retrieving recording from the database");
            return;
        }
        res.json(rows);
    });
});

// POST /api/recording
app.post('/api/recording', function(req, res){

    // check if the tempfile exists as an mp3 in the uploads folder
    var tempFilePath = "./public/uploads/audio/"  + req.body.tempName + ".mp3";
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
                console.log(err);
                res.status(400).send("error inserting the recording record into the database");
            } else {
                connection.query('SELECT last_insert_id() AS id;', function(err, rows){
                    if (err){
                        console.log(err);
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
            console.log(err);
            res.status(400).send("recording id does not exist in the database");
            return;
        }

        var fileToDelete = rows[0][0].audioFile;

        fs.unlink(config.AUDIO_LIBRARY_PATH + fileToDelete + ".mp3", function(err){

            var deleted = true;
            if (err){
                console.log(err);
                deleted = false;
            }

            connection.query("CALL DeleteRecording('" + utils.htmlEscape(fileToDelete) + "');", function(err){
                if (err) {
                    console.log(err);
                    res.status(400).send("recording could not be deleted from the database");
                    return;
                }
                if (!deleted) {
                    res.status(400).send("recording file could not be removed from the library folder");
                } else {
                    res.sendStatus(200);
                }
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
 * GALLERIES
 */

// POST /api/gallery
app.post('/api/gallery', function(req, res){
    var onInsertGallery = function(err, res){
            handleError(err, res) || getLastId(res, onGetGalleryInsertId);
        },
        onGetGalleryInsertId = function(id){
            res.json({id:id});
        };
    connection.query("CALL InsertGallery();", onInsertGallery);
});

// GET /api/gallery/id
app.get('/api/gallery/:id', function(req, res){

    var query = "CALL GetGalleryById(" + utils.htmlEscape(req.params.id) + ");";
    connection.query(query, function(err, rows){
        if (err) {
            console.log(err);
            res.status(400).send("error retrieving gallery from the database");
            return;
        }
        if (rows[0][0] && rows[0][0].images !== ""){
            res.json(JSON.parse(rows[0][0].images));
        } else {
            res.json([]);
        }
    });
});

// PUT /api/gallery/id
app.put('/api/gallery/:id', function(req, res){

    var images = JSON.stringify(req.body.images);

    var query = "CALL UpdateGallery("
        + utils.htmlEscape(req.params.id) + ",'"
        + images + "');";

    var onGalleryUpdated = function(err){
        handleError(err, res) || res.json({msg: "success"});
    };

    connection.query(query, onGalleryUpdated);
});


/**
 * ARTISTS
 */

// GET /api/artists
app.get('/api/artists', function(req, res){
    connection.query("CALL GetAllArtists();", function(err, rows){
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(rows[0].map(function(row){
                if(row.images !== ""){
                    var parsedImagesString = JSON.parse(row.images);
                    if (Array.isArray(parsedImagesString)){
                        row.avatar = parsedImagesString[0];
                    }
                }
                return row;
            }));
        }
    });
});

// POST /api/artist
app.post('/api/artist', function(req, res){

    var output = {},

        onInsertGallery = function(err, res){
            handleError(err, res) || getLastId(res, onGetGalleryInsertId);
        },

        onGetGalleryInsertId = function(id){
            var query = "CALL InsertAct('"
                + utils.htmlEscape(req.body.actName) + "','"
                + utils.htmlEscape(req.body.actTown) + "','"
                + utils.htmlEscape(req.body.actCountry) + "','"
                + utils.htmlEscape(req.body.website) + "','"
                + utils.htmlEscape(req.body.tags) + "','"
                + utils.htmlEscape(req.body.biog) + "',"
                + id + ");";
            connection.query(query, onInsertArtist);
        },

        onInsertArtist = function(err, res) {
            handleError(err, res) || getLastId(res, onGetArtistInsertId);
        },

        onGetArtistInsertId = function(id){
            output.id = id;
            res.json(output);
        };

    connection.query("CALL InsertGallery();", onInsertGallery);
});

// PUT /api/artist/id
app.put('/api/artist/:id', function(req, res){
    var query = "CALL UpdateArtist("
        + utils.htmlEscape(req.params.id) + ","
        + utils.htmlEscape(req.body.galleryID) + ",'"
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

        if (err){
            console.log(err);
            res.sendStatus(200);

        } else if (rows && rows.length) {

            // delete all of the artist's recordings (one by one)
            rows[0].map(function (recording) {

                // delete the mp3 file
                fs.unlink(config.AUDIO_LIBRARY_PATH + recording.audioFile + ".mp3", function (err) {
                    if (err) {

                        res.status(400).send("cannot delete the file " + recording.audioFile + ".mp3");
                        return;
                    }

                    // then delete the recording's database entry
                    connection.query("CALL DeleteRecording('" + utils.htmlEscape(recording.audioFile) + "');", function (err) {
                        if (err) {
                            res.status(400).send("an artist's recording could not be deleted from the database");
                        }
                    });
                });
            });
        }
    });

    // next, delete the artist from the database
    connection.query("CALL DeleteAct(" + utils.htmlEscape(req.params.id) + ");", function (err) {
        if (err) {
            res.status(400).send("the artist could not be deleted from the database");
        }
        res.sendStatus(200);
    });

});



/**
 * TYPES
 */
// GET /api/types
app.get('/api/types', function(req, res){
    connection.query("CALL GetAllTypes();", function(err, rows){
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
});

//

/**
 * PLAYLISTS
 */
// GET /api/playlists
app.get('/api/playlists', function(req, res){
    connection.query("CALL GetAllPlaylists();", function(err, rows){
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(rows[0].map(function(row){
                if(row.images !== "" && row.images !== undefined){
                    var parsedImagesString = JSON.parse(row.images);
                    if (Array.isArray(parsedImagesString)){
                        row.avatar = parsedImagesString[0];
                    }
                }
                return row;
            }));
        }
    });
});

// GET /api/playlist/id
app.get('/api/playlist/:id', function(req, res){
    connection.query("CALL GetPlaylistById(" + utils.htmlEscape(req.params.id) + ");", function(err, rows){
        if (!handleError(err, res)){
            res.json(rows[0][0]);
        }
    });
});

// POST /api/playlist
app.post('/api/playlist', function(req, res){

    var output = {},

        onInsertGallery = function(err, res){
            handleError(err, res) || getLastId(res, onGetGalleryInsertId);
        },

        onGetGalleryInsertId = function(id){
            var query = "CALL InsertPlaylist('"
                + utils.htmlEscape(req.body.name) + "',"
                + utils.htmlEscape(req.body.actID || null) + ","
                + id + ",'"
                + utils.htmlEscape(req.body.yearPublished || null) + "','"
                + utils.htmlEscape(req.body.label || null) + "','"
                + utils.htmlEscape(req.body.notes) + "','"
                + utils.htmlEscape(req.body.isAlbum || false) + "');";
            connection.query(query, onInsertPlaylist);
        },

        onInsertPlaylist = function(err, res) {
            handleError(err, res) || getLastId(res, onGetPlaylistInsertId);
        },

        onGetPlaylistInsertId = function(id){
            output.id = id;
            res.json(output);
        };

    connection.query("CALL InsertGallery();", onInsertGallery);
});

// PUT /api/playlist/id
app.put('/api/playlist/:id', function(req, res){

    var query = "CALL UpdatePlaylist("
        + utils.htmlEscape(req.params.id) + ",'"
        + utils.htmlEscape(req.body.name) + "',"
        + utils.htmlEscape(req.body.actID || null) + ",'"
        + utils.htmlEscape(req.body.yearPublished) + "','"
        + utils.htmlEscape(req.body.label) + "','"
        + utils.htmlEscape(req.body.notes) + "','"
        + utils.htmlEscape(req.body.isAlbum) + "','"
        + utils.htmlEscape(req.body.trackList) + "');";

    connection.query(query, function(err){
        if(err){
            console.log(err);
            res.status(400).send("can't update the playlist in the database");
        }
        res.json({msg: "success"});
    });
});

// DELETE /api/playlist/id
app.delete('/api/playlist/:id', function(req, res){
    connection.query("CALL DeletePlaylist(" + utils.htmlEscape(req.params.id) + ");", function (err) {
        if (err) {
            res.status(400).send("the artist could not be deleted from the database");
        }
        res.sendStatus(200);
    });
});




app.use(express.static('public'));

http.listen(config.SERVER_PORT, function(){
    console.log("Connected & Listen to port " + config.SERVER_PORT);
});