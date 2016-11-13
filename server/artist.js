var express = require('express'),
    util = require('./util.js'),
    utils = require('../scripts/helpers/commonUtils.js'),
    fs = require('fs'),
    config = require('./config.js'),
    router = express.Router();

var connection = util.dbConn();

/**
 * GET /api/artist/all
 */
router.get('/all', function(req, res){

    connection.query("CALL GetAllArtists();", function(err, rows){
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(rows[0].map(function(row){
                if(row.images){
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

/**
 * GET /api/artist/:id
 */
router.get('/:id', function(req, res){

    var actId = utils.htmlEscape(req.params.id);
    var response;

    function getArtistRecordings(err, rows){
        if (!util.handleError(err, res)){
            response = rows[0][0];
            if(response.images){
                response.images = JSON.parse(response.images);
                response.avatar = response.images[0];
            }

            var query = "CALL GetAllRecordingsByActId(" + actId + ");";
            connection.query(query, getArtistPlaylists);
        }
    }

    function getArtistPlaylists(err, rows){
        if (!util.handleError(err, res)){
            response.recordings = rows[0];
            var query = "CALL GetAllPlaylistsByActId(" + actId + ");";
            connection.query(query, dispatchResponse);
        }
    }

    function dispatchResponse(err, rows){
        if (!util.handleError(err, res)){
            response.playlists = rows[0];
            res.json(response);
        }
    }

    var query = "CALL GetArtistById(" + actId + ");";
    connection.query(query, getArtistRecordings);
});

/**
 * POST /api/artist
 */
router.post('/', function(req, res){

    function onValidToken() {

        var onInsertGallery = function(err, result){
                if (!util.handleError(err, res)){
                    var galleryId = util.getInsertId(result);
                    var query = "CALL InsertAct('"
                        + utils.htmlEscape(req.body.actName) + "','"
                        + utils.htmlEscape(req.body.actTown) + "','"
                        + utils.htmlEscape(req.body.actCountry) + "','"
                        + utils.htmlEscape(req.body.website) + "','"
                        + utils.htmlEscape(req.body.tags) + "','"
                        + utils.htmlEscape(req.body.biog) + "',"
                        + galleryId + ", @insert_id); SELECT @insert_id;";
                    connection.query(query, onInsertArtist);
                }
            },

            onInsertArtist = function(err, result) {
                if (!util.handleError(err, res)){
                    res.json({id:util.getInsertId(result)});
                }
            };

        connection.query("CALL InsertGallery(@insert_id);SELECT @insert_id;", onInsertGallery);
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * PUT /api/artist/id
 */
router.put('/:id', function(req, res){

    function onValidToken(){
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
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * DELETE /api/artist/id
 */
router.delete('/:id', function(req, res){

    function onValidToken(){

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
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

module.exports = router;