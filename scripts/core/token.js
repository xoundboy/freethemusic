var config = require('../config');
var ajax = require('./ajax');
var $ = require('jquery');

module.exports = {

    callback: null,

    getFromLocalStorage: function(){
        return window.localStorage.getItem(config.LS_ACCESS_TOKEN);
    },

    removeFromLocalStorage: function(){
        window.localStorage.removeItem(config.LS_ACCESS_TOKEN);
    },

    verify: function(callback){

        this.callback = callback;

        if (config.disableAuth){
            this.success();
            return;
        }

        var token = this.getFromLocalStorage();

        if (!token) {
            callback(false);
            return;
        }

        ajax.requestWithToken({
            url: 'api/login/verifyToken',
            method: "POST",
            success: this.success.bind(this),
            error: this.error.bind(this)
        });
    },

    success: function(){
        X7.adminUser = true;
        this.callback(true);
    },

    error: function(){
        X7.adminUser = false;
        this.removeFromLocalStorage();
        this.callback(false);
    }
};

