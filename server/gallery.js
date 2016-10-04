var express = require('express'),
    util = require('./util.js'),
    utils = require('../scripts/helpers/commonUtils.js'),
    router = express.Router();

var connection = util.dbConn();

/**
 * GET /api/gallery/id
 */
router.get('/:id', function(req, res){

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

/**
 * POST /api/gallery
 */
router.post('/', function(req, res){

    function onValidToken() {
        var onInsertGallery = function(err, res){
                util.handleError(err, res) || util.getLastId(res, onGetGalleryInsertId);
            },
            onGetGalleryInsertId = function(id){
                res.json({id:id});
            };
        connection.query("CALL InsertGallery();", onInsertGallery);
    }
    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * PUT /api/gallery/id
 */
router.put('/:id', function(req, res){

    function onValidToken(){
        var images = JSON.stringify(req.body.images);

        var query = "CALL UpdateGallery("
            + utils.htmlEscape(req.params.id) + ",'"
            + images + "');";

        var onGalleryUpdated = function(err){
            util.handleError(err, res) || res.json({msg: "success"});
        };

        connection.query(query, onGalleryUpdated);
    }
    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

module.exports = router;