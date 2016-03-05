var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');
var config = require('../../config.js');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    canPlay: false,

    initialize: function (options) {

        _.extend(this, _.pick(options, "template"));
        this.listenTo(this.model, 'change', function(e){
            this.render();
        });

        this.render();
    },

    events: {
        "click #playPauseButton": "playPause",
        "click #nextButton": "skipForward",
        "click #prevButton": "skipBack"
    },

    playPause: function(){
        this.model.playPause();
    },

    skipForward: function(){
        this.model.loadNext();
    },

    skipBack: function(){
        this.model.loadPrevious();
    },

    styleButtons: function(){
        var playPauseButtonIcon = (this.model.isPlaying()) ? "ui-icon-pause" : "ui-icon-play";
        var nextButtonDisabled = false,//(adminApp.collections.queue.length < 2),
            prevButtonDisabled = false;//(adminApp.collections.queueHistory.length == 0);

        utils.styleButton(this.$el.find("#nextButton"), "ui-icon-arrowthickstop-1-e", false, nextButtonDisabled);
        utils.styleButton(this.$el.find("#prevButton"), "ui-icon-arrowthickstop-1-w", false, prevButtonDisabled);
        utils.styleButton(this.$el.find(".dummyPlus"), "ui-icon-plusthick");
        utils.styleButton(this.$el.find("#playPauseButton"), playPauseButtonIcon);
    },

    getCurrentTime: function(){
        return this.model.audioElement.elem.currentTime;
    },

    setCurrentTime: function(time){
        this.$el.find("#nowPlaying").currentTime = time;
    },

    updateProgressBar: function(){

    },

    renderAudioElement: function(){
console.log("rendering player remote");
        var that = this;


        $audioElem.bind('ended', function(){
            that.model.loadNextTrackFromQueue();
            that.model.pause();

        }).bind('canplay', function(e){
            $audioElem.unbind('canplay');

            that.canPlay = true;

            that.model.set("duration", e.target.duration);

            var position = that.model.getPlaybackPosition();
            this.currentTime = position;

            //$audioElem.currentTime = this.model.getPlaybackPosition();
            if (that.model.isPlaying()){
                $audioElem.trigger("play");
            } else {
                $audioElem.trigger("pause");
            }


        });

        if (!that.canPlay){
            console.log("triggering audio load");
            $audioElem.trigger("load");
        }
    },



    render: function(){

        var model = this.model.get("loadedModel") || null;
        var attributes = (model) ? model.attributes : null;
        var compiledTemplate = Mustache.to_html(this.template, {loadedModel: attributes});
        this.$el.html(compiledTemplate);

        this.styleButtons();

        // sub-views need this
        this.delegateEvents();
        return this;
    }
});
