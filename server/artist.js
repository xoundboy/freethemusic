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

/**
 * POST /api/artist
 */
router.post('/', function(req, res){

    var output = {},

        onInsertGallery = function(err, res){
            util.handleError(err, res) || util.getLastId(res, onGetGalleryInsertId);
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
            util.handleError(err, res) || util.getLastId(res, onGetArtistInsertId);
        },

        onGetArtistInsertId = function(id){
            output.id = id;
            res.json(output);
        };

    connection.query("CALL InsertGallery();", onInsertGallery);
});

/**
 * PUT /api/artist/id
 */
router.put('/:id', function(req, res){
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

/**
 * DELETE /api/artist/id
 */
router.delete('/:id', function(req, res){

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

module.exports = router;