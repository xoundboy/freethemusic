var express = require('express'),
    config = require('./config.js'),
    fs = require('fs'),
    util = require('./util.js'),
    multer = require('multer'),
    router = express.Router();


/**
 *  POST /api/image/upload
 */

router.post('/upload', multer({ dest: config.IMAGE_UPLOAD_DIR_PATH}).single('uploadFile'), function(req, res){

    var acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg", "image/bmp", "image/jpg", "image/gif"];
    var mimetype = req.file.mimetype;

    if (acceptedFileTypes.indexOf(mimetype) != -1){
        var finalFileName = utils.getUniqueArtistImageFileName(req.body.actName, utils.getExtFromMimeType(mimetype));
        fs.rename(config.IMAGE_UPLOAD_DIR_PATH + "/" + req.file.filename, config.IMAGE_LIBRARY_PATH + finalFileName);

    } else {
        res.status(400).send("illegal file extension");
    }

    res.json({
        tempName: req.file.filename,
        size: req.file.size,
        finalImageFileName: finalFileName
    });
});

module.exports = router;
