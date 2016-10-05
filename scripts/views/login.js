require('jquery-validation');
require('jquery-serializejson');

var notification = require('../helpers/notification.js');

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var button = require('../helpers/button.js');
var template = require('./html/login.html');
var config = require('../config.js');

module.exports = Backbone.View.extend({

    LANDING_PAGE_URL: '',

    tagName: "div",

    events: {
        "click #loginButton": "onSubmit"
    },

    onSubmit: function(e){
        e.preventDefault();
        this.$form = this.$el.find("#loginForm");

        if (this.$form.validate().form()){
            this.sendAuthRequest();
        }
    },

    sendAuthRequest: function(){
        $.ajax({
            url: "api/login",
            success: $.proxy(this.onAuthSuccess,this),
            error: $.proxy(this.onAuthFail,this),
            method: "POST",
            data: this.$form.serializeJSON()
        });
    },

    onAuthSuccess: function(res){
        X7.adminUser = true;
        if (res.token){
            window.localStorage.setItem(config.LS_ACCESS_TOKEN, res.token);
        }
        X7.views.nav.render();
        this.showSuccessMessage();
    },

    showSuccessMessage: function(){
        notification.create({
            message: "Successfully logged in",
            autohide: true,
            type: "info",
            timeoutCallback: $.proxy(this.onSuccessMessageHide, this)
        });
    },

    onSuccessMessageHide: function() {
        X7.router.navigate(this.LANDING_PAGE_URL, {trigger: true});
    },

    onAuthFail: function(data){
        X7.adminUser = false;
        X7.accessToken = null;
        switch (data.status){
            case 400: this.displayInvalidCredsMsg();
        }
    },

    displayInvalidCredsMsg: function(){
        notification.create({
            message: "Wrong username or password",
            autohide: true,
            type: "error"
        });
    },

    render: function(){
        this.$el.html(template()).show();
        button.style(this.$el.find("#loginButton"));
        return this;
    }
});
