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
        if (adminApp.collections.queue.length > 1){
            this.model.skipToNext();
            this.play();
        }
    },

    loadPreviousTrack: function(){
    },

    styleButtons: function(){

        var nextButtonDisabled = false,//(adminApp.collections.queue.length < 2),
            prevButtonDisabled = false;//(adminApp.collections.queueHistory.length == 0);

        utils.styleButton(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e", false, nextButtonDisabled);
        utils.styleButton(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w", false, prevButtonDisabled);
        utils.styleButton(this.$el.find(".dummyPlus"), "ui-icon-plusthick");
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
