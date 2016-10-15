var express = require('express'),
    rimraf = require('rimraf'),
    config = require('./config.js'),
    fs = require('fs'),
    util = require('./util.js'),
    multer = require('multer'),
    router = express.Router();

/**
 *  POST /api/upload/recording - initial file upload
 */
router.post('/recording', multer({ dest: config.AUDIO_UPLOAD_DIR_PATH}).single('uploadFile'), function(req, res){

    function onValidToken(){
        // add the .mp3 extension to the uploaded file
        fs.rename(req.file.path, req.file.path + ".mp3");

        res.json({
            tempName: req.file.filename,
            size: req.file.size
        });
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

/**
 * DELETE /api/upload/removeTempUploads - empty the temporary uploads folder
 */
router.delete('/removeTempDir', function(req, res){

    function onValidToken(){
        rimraf(config.AUDIO_UPLOAD_DIR_PATH, onUploadsDirRemoved);
    }

    function onUploadsDirRemoved(err) {
        if (err){
            res.status(400).send("Temporary uploads folder cannot be removed");
            return;
        }
        fs.mkdir(config.AUDIO_UPLOAD_DIR_PATH, 0755, onUploadsDirRecreated);
    }

    function onUploadsDirRecreated (err){
        if (err){
            res.status(400).send("Temporary uploads folder cannot be recreated");
            return;
        }
        res.sendStatus(200);
    }

    util.verifyAccessToken(req.headers.authorization, onValidToken, res);
});

module.exports = router;