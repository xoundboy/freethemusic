require('jquery-ui/tabs');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports = Backbone.View.extend({

    el: "#page",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        "tabsactivate": "changeTab"
    },

    changeTab: function (e, ui) {
        adminApp.routers.main.navigate(ui.newTab.find('a[href^=#]').attr('href'),{trigger:true});
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate)
            .find("#tabs")
            .tabs()
            .tabs('option', 'active', this.model.getCurrentTabIndex());

        // render sub-views
        this.renderUploads();
        this.renderRecordings();
        this.renderArtists();

        return this;
    },

    renderUploads: function() {
        this.$("#audioUploadContainer").html(adminApp.views.audioUpload.render().el);
    },

    renderArtists: function() {
        this.$("#artistsContainer").html(adminApp.views.artists.render().el);
    },

    renderRecordings: function(highlightId){
        this.$("#recordingsContainer").html(adminApp.views.recordings.render().el);
        if (highlightId){
            recordingsView.highlight(highlightId);
        }
    }
});