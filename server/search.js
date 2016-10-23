var express = require('express'),
    util = require('./util.js'),
    utils = require('../scripts/helpers/commonUtils.js'),
    fs = require('fs'),
    config = require('./config.js'),
    router = express.Router();

var connection = util.dbConn();

/**
 * GET /api/search?:q
 */
router.get('/', function(req, res){

    var output = {
        recordings: null,
        artists: null,
        playlists: null
    };

    var responseSent = false;

    setTimeout(timeout,2000);

    if (req.query)
        var searchQuery = req.query["q"];

    if ( searchQuery &&  searchQuery.length > 2){

        var query = "CALL SearchRecordings('"
            + utils.htmlEscape(searchQuery) + "');";
        connection.query(query, recordingsResponse);

        var query = "CALL SearchArtists('"
            + utils.htmlEscape(searchQuery) + "');";
        connection.query(query, artistsResponse);

        var query = "CALL SearchPlaylists('"
            + utils.htmlEscape(searchQuery) + "');";
        connection.query(query, playlistsResponse);
    }

    function recordingsResponse(err, result){
        if (!util.handleError(err, result)){
            output.recordings = result[0];
            dispatch();
        }
    }

    function artistsResponse(err, result){
        if (!util.handleError(err, result)){
            output.artists = result[0];
            dispatch();
        }
    }

    function playlistsResponse(err, result){
        if (!util.handleError(err, result)){
            output.playlists = result[0];
            dispatch();
        }
    }

    function dispatch(){
        if (output.recordings !== null &&
            output.artists !== null &&
            output.playlists !== null) {
            res.json(output);
            responseSent = true;
        }
    }

    function timeout(){
        if (!responseSent)
            res.status(408).send("search query timed out");
    }

});



module.exports = router;