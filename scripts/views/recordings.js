require('jquery-ui/effect');
//var $ = require('jquery');
var button = require('../helpers/button.js');
var notification = require('../helpers/notification.js');
//var AddToListContextMenuView = require('./recordingAddMenu.js');
var TracklistView = require('./trackList');
var template = require('./html/recordings.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingsContent",
    className: "recordings",
    nowPlayingId: null,

    initialize: function () {
        this.collection.fetch({success:this.renderTrackList.bind(this)});
    },

    events: {
        "click .uploadRecordingButton"  : "upload"
    },

    upload: function(){
        X7.router.navigate("recording/add/1", {trigger: true});
    },


    styleButtons: function() {
        button.style(this.$el.find(".uploadRecordingButton"), "ui-icon-plusthick", true);
    },

    render: function () {
        this.$el.html(template({adminUser:X7.adminUser}));
        this.styleButtons();
        this.renderTrackList();
        this.delegateEvents();
        return this;
    },

    renderTrackList: function() {
        var tracklistView = new TracklistView({
            collection: this.collection
        });
        this.$el.find("#trackListContainer").html(tracklistView.render().el);
    }

});
