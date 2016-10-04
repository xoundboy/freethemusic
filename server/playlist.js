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
    connection.query("CALL GetPlaylistById(" + utils.htmlEscape(req.params.id) + ");", function(err, rows){
        if (!util.handleError(err, res)){
            res.json(rows[0][0]);
        }
    });
});

/**
 * POST /api/playlist
 */
router.post('/', function(req, res){

    function onValidToken(){
        var output = {},

            onInsertGallery = function(err, res){
                util.handleError(err, res) || util.getLastId(res, onGetGalleryInsertId);
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
                handleError(err, res) || util.getLastId(res, onGetPlaylistInsertId);
            },

            onGetPlaylistInsertId = function(id){
                output.id = id;
                res.json(output);
            };

        connection.query("CALL InsertGallery();", onInsertGallery);
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * PUT /api/playlist/id
 */
router.put('/:id', function(req, res){

    function onValidToken(){
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