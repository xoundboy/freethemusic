var express = require('express'),
    util = require('./util.js'),
    utils = require('../scripts/helpers/commonUtils.js'),
    fs = require('fs'),
    config = require('./config.js'),
    router = express.Router();

var connection = util.dbConn();

/**
 * GET /api/playlist/all
 */
router.get('/all', function(req, res){
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

/**
 * GET /api/playlist/id
 */
router.get('/:id', function(req, res){

    var output;

    function loadTracklist(err, rows){
        if (!util.handleError(err, res)){
            output = rows[0][0];
            var trackList = output.trackList;
            delete output.trackList;
            if (trackList){
                connection.query("CALL GetTracklistFromIdArray('" + trackList + "');", dispatchResults);
            } else {
                res.json(output);
            }
        }
    }

    function dispatchResults(err, rows){
        if (!util.handleError(err, res)) {
            output.recordings = rows[0];
            res.json(output);
        }
    }


    connection.query("CALL GetPlaylistById(" + utils.htmlEscape(req.params.id) + ");", loadTracklist);
});

/**
 * POST /api/playlist
 */
router.post('/', function(req, res){

    function onValidToken(){

        var onInsertGallery = function(err, result){

                if (!util.handleError(err, res)){
                    var galleryId = util.getInsertId(result);
                    var query = "CALL InsertPlaylist('"
                        + utils.htmlEscape(req.body.name) + "',"
                        + utils.htmlEscape(req.body.actID || null) + ","
                        + galleryId + ",'"
                        + utils.htmlEscape(req.body.yearPublished || null) + "','"
                        + utils.htmlEscape(req.body.label || null) + "','"
                        + utils.htmlEscape(req.body.notes) + "','"
                        + utils.htmlEscape(req.body.isAlbum || false) + "', " +
                        "@insert_id); SELECT @insert_id;";
                    connection.query(query, onInsertPlaylist);
                }
            },

            onInsertPlaylist = function(err, result) {
                if (!util.handleError(err, result)){
                    res.json({id:util.getInsertId(result)});
                }
            };

        connection.query("CALL InsertGallery(@insert_id);SELECT @insert_id;", onInsertGallery);
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * PUT /api/playlist/id
 */
router.put('/:id', function(req, res){

    function onValidToken(){
        var query = "CALL UpdatePlaylist("
            + utils.htmlEscape(req.params .id) + ",'"
            + utils.htmlEscape(req.body.name) + "',"
            + utils.htmlEscape(req.body.actID || null) + ",'"
            + utils.htmlEscape(req.body.yearPublished) + "','"
            + utils.htmlEscape(req.body.label) + "','"
            + utils.htmlEscape(req.body.notes) + "','"
            + utils.htmlEscape(req.body.isAlbum) + "','"
            + utils.htmlEscape(req.body.trackList) + "',"
            + utils.htmlEscape(req.body.playlistLength) + ");";

        connection.query(query, function(err){
            if(err){
                console.log(err);
                res.status(400).send("can't update the playlist in the database");
            }
            res.json({msg: "success"});
        });
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * DELETE /api/playlist/id
 */
router.delete('/:id', function(req, res){

    function onValidToken(){
        connection.query("CALL DeletePlaylist(" + utils.htmlEscape(req.params.id) + ");", function (err) {
            if (err) {
                res.status(400).send("the artist could not be deleted from the database");
            }
            res.sendStatus(200);
        });
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

module.exports = router;
