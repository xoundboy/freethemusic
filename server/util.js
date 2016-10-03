var config = require('./config.js'),
    nJwt = require('njwt'),
    mysql = require('mysql'),
    signingKey = new Buffer(config.base64SigningKey, 'base64');

module.exports = {

    verifyAccessToken: function (token, success, fail) {

        function onVerified(err, verifiedJwt) {

            if (!err && verifiedJwt.body.scope === config.VALID_AUTH_SCOPE) {
                success();
                return;
            }

            if (typeof fail === 'function') {
                fail(err);
                return;
            }

            fail.sendStatus(403);
        }

        nJwt.verify(token, signingKey, onVerified);
    },

    generateAccessToken: function () {
        return nJwt.create({scope:config.VALID_AUTH_SCOPE}, signingKey).compact();
    },

    dbConn: function() {
        return mysql.createConnection({
            host     : config.DB_HOST,
            user     : config.DB_USER,
            password : config.DB_PASS,
            database : config.DB_NAME
        });
    },

    getLastId: function(res, callback){

        this.dbConn().query('SELECT last_insert_id() AS id;', function (err, rows) {
            if (err) {
                res.status(400).send("can't get the latest insert ID from the database");
            } else {
                callback(rows[0].id);
            }
        });
    },

    handleError: function(err, res) {

        if (err) {
            console.log(err);
            res.status(400).send(err.msg);
            return true;
        }
        return false;
    }

};
