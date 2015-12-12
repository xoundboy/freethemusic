var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    events: {
        "click #nextButton": "loadNextTrack",
        "click #prevButton": "loadPreviousTrack"
    },

    play: function(){
        this.$el.find("audio").trigger('play');
    },

    loadNextTrack: function(){

    },

    loadPreviousTrack: function(){
    },

    styleButtons: function(){
        utils.styleButton(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e");
        utils.styleButton(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w");
    },

    render: function(){

        var that = this;
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        this.styleButtons();

        // sub-views need this
        this.delegateEvents();

        this.$el.find("audio").bind('ended', function(){
            console.log("playback ended");
            that.model.loadNextTrackFromQueue();
        });

        return this;
    }
});
