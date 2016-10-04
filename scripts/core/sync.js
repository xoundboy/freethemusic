require('backbone');
var config = require('../config.js');

var backboneSync = Backbone.sync;

Backbone.sync = function (method, model, options) {

    var token = window.localStorage.getItem(config.LS_ACCESS_TOKEN);

    if (token){
        options.headers = {
            'Authorization': token
        };
    }

    backboneSync(method, model, options);
};
