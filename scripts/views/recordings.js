require('jquery-ui/effect');
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var button = require('../helpers/button.js');
var notification = require('../helpers/notification.js');
var AddToListContextMenuView = require('./recordingAddMenu.js');
var template = require('./html/recordings.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingsContent",
    className: "recordings",
    nowPlayingId: null,

    initialize: function () {
        this.listenTo(this.collection, 'reset sort change remove', this.render);
        this.collection.fetch({reset:true});
    },

    events: {
        "click th"                      : "sort",
        "click .playButton"             : "play",
        "click .add"                    : "add",
        "click .editRecordingButton"    : "edit",
        "click .deleteRecordingButton"  : "delete",
        "click a[href=#uploads]"        : "upload",
        "click .uploadRecordingButton"  : "upload"
    },

    upload: function(){
        X7.router.navigate("recording/add/1", {trigger: true});
    },

    edit: function(e) {
        var recID = $(e.currentTarget).closest("tr").attr("data-recordingId");
        X7.router.navigate('recording/edit/' + recID, {trigger:true});
    },

    closeContextMenu: function(){
        $(".listContextMenuContainer").html();
    },

    delete: function (e) {
        var $btn = $(e.currentTarget),
            recordingId = $btn.closest("tr").attr("data-recordingId");
        if (this.nowPlayingId === recordingId) {
            this.audio.pause();
        }
        if (confirm("Are you sure you want to delete this recording?")){
            var modelToDelete = this.collection.get(recordingId);
            this.collection.remove(modelToDelete);
        }
    },

    play: function (e) {
        var recordingId = $(e.currentTarget).closest("tr").attr("data-recordingId");
        X7.models.player.load(this.collection.get(recordingId), true);
    },

    add: function(e){

        e.stopPropagation();

        var $btn = $(e.currentTarget),
            recId = $btn.closest("tr").attr("data-recordingId");

        if (X7.adminUser){

            var $contextMenuContainer = $btn.parent().find(".listContextMenuContainer");
            var contextMenuView = new AddToListContextMenuView({
                collection: X7.collections.playlists,
                recordingId: recId
            });
            $contextMenuContainer.html(contextMenuView.render().el);

        } else {
            X7.collections.queue.addModel(X7.collections.recordings.get(recId), this.onTrackAdded);
        }



        // show onboarding help for first time a user adds a track to the queue
        //console.log(X7.collections.queue.length);
        //if (!X7.collections.queue.length){
        //    notification.create({
        //        message: "Thank queue!<br />You can queue up as many tracks as you like",
        //        okButtonText: "Take me to the queue"
        //    });
        //}
    },

    onTrackAdded: function(data){
        console.log(data);
        notification.create({
            message: "Track added to queue: " + data.get("title") + " by " + data.get("actName"),
            autohide: true
        });
    },

    sort: function(e) {
        var field = $(e.target).attr("bengrid-key");
        if (field) {
            this.collection.sortByField(field);
        }
    },

    styleButtons: function() {
        button.style(this.$el.find(".playButton"), "ui-icon-play");
        button.style(this.$el.find(".add"), "ui-icon-plusthick");
        button.style(this.$el.find(".editRecordingButton"), "ui-icon-pencil");
        button.style(this.$el.find(".deleteRecordingButton"), "ui-icon-trash");
        button.style(this.$el.find(".uploadRecordingButton"), "ui-icon-plusthick", true);
    },

    render: function () {
        var viewModel = {
            adminUser: X7.adminUser,
            recordings: this.collection.toJSON()
        };
        this.$el.html(template(viewModel));
        this.styleButtons();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    }

});