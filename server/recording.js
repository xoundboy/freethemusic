var express = require('express'),
    config = require('./config.js'),
    fs = require('fs'),
    util = require('./util.js'),
    utils = require('../scripts/helpers/commonUtils.js'),
    router = express.Router();

var connection = util.dbConn();

/**
 * GET /api/recording/all
 */
router.get('/all', function(req,res){

    connection.query("CALL GetAllRecordings();", onQueryResult);

    function onQueryResult (err, rows) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        rows = (rows && rows.length != 0) ? rows : {};
        res.json(rows);
    }

});

/**
 * GET /api/recording/id
 */
router.get('/:id', function(req, res){

    var query = "CALL GetRecordingById(" + utils.htmlEscape(req.params.id) + ");";
    connection.query(query, onQueryResult);

    function onQueryResult (err, rows){
        if (err) {
            console.log(err);
            res.status(400).send("error retrieving recording from the database");
            return;
        }
        res.json(rows);
    }
});

/**
 * POST /api/recording
 */
router.post('/', function(req, res){

    function onValidToken(){

        // check if the tempfile exists as an mp3 in the uploads folder
        var tempFilePath = config.AUDIO_UPLOAD_DIR_PATH + '/' + req.body.tempName + ".mp3";

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
                + utils.htmlEscape(req.body.tags) + "', @insert_id); SELECT @insert_id;";

            connection.query(query, onInsertRecording);
        } else {
            res.status(400).send("file does not exist in uploads folder");
        }
    }

    function onInsertRecording (err, result) {
        if (!util.handleError(err, result)){
            res.json({id:util.getInsertId(result)});
        }
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * PUT /api/recording/id
 */
router.put('/:id', function(req, res){

    function onValidToken(){
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
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * DELETE /api/recording/id
 */
router.delete('/:id', function(req, res){

    function onValidToken(){
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
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});




module.exports = router;
