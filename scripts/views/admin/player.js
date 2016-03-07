var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var utils = require('../../utils.js');
var config = require('../../config.js');
require('jquery-ui/slider');

module.exports = Backbone.View.extend({

    el: "#playerContainer",

    interval: null,

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

    initProgressBar: function(){
        if (this.model.isPlaying()){
            this.interval = setInterval($.proxy(this.updateProgress, this), 50);
        } else {
            clearInterval(this.interval);
        }
    },

    updateProgress: function(dragPosition){
        if (!dragPosition){
            var audioEl = this.model.audioElement.elem;
            var ratioDone = audioEl.currentTime / audioEl.duration;
            var $progress = this.$el.find("#progressBar");
            var fullWidth = parseInt($progress.css("width"));
            $progress.find("#mercury").css("width", (fullWidth * ratioDone) + "px");
        } else {
            // override because playhead is being dragged
            console.log(dragPosition);
        }
    },

    activateProgressBar: function(){
        this.$el.find("#playHead").draggable({
            axis: "x",
            drag: $.proxy(this.onDrag, this)
        });
    },

    onDrag: function(e, ui){
        this.updateProgress(ui.position.left);
    },

    render: function(){

        var model = this.model.get("loadedModel") || null;
        var attributes = (model) ? model.attributes : null;
        var compiledTemplate = Mustache.to_html(this.template, {loadedModel: attributes});
        this.$el.html(compiledTemplate);

        this.styleButtons();
        this.initProgressBar();
        this.updateProgress();

        this.$el.find("#progressBar").slider();

        //this.activateProgressBar();

        // sub-views need this
        this.delegateEvents();
        return this;
    }
});
