var express = require('express'),
    router = express.Router(),
    stormPath = require('stormpath'),
    util = require('./util.js');

var apiKey = new stormPath.ApiKey(
    process.env['STORMPATH_CLIENT_APIKEY_ID'],
    process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormPath.Client({ apiKey: apiKey });

var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];

client.getApplication(applicationHref, function(err, stormPathApp) {

    /**
     * POST /api/login
     */
    router.post('/', function(req, res){

        var authRequest = {
            username: req.body.username,
            password: req.body.password
        };

        stormPathApp.authenticateAccount(authRequest, function(err) {
            if (err){
                res.status(err.status).json({msg:err.userMessage});
                return;
            }
            res.status(200).json({token: util.generateAccessToken()});
        });
    });

    /**
     * POST /api/login/verifyToken
     */
    router.post('/verifyToken', function(req, res) {

        function onValidToken() {
            res.status(200).json({msg:"authenticated administrator"});
        }

        function onInvalidToken(err) {
            res.status(403).json({msg:err.userMessage});
        }

        util.verifyAccessToken(req.body.token, onValidToken, onInvalidToken);
    });
});

module.exports = router;