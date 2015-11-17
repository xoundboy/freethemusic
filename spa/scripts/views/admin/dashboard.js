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
        "click #tabRecordings": "loadRecordings",
        "tabsactivate": "updateTabInModel"
    },

    updateTabInModel: function (e, ui) {
        this.model.set("currentTabHref", ui.newTab.find('a[href^=#]').attr('href'));
    },

    loadRecordings: function() {
        recordingsView.render();
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

        return this;
    },
    renderUploads: function() {
        this.$("#audioUploadContainer").html(adminApp.views.audioUpload.render().el);
    },
    renderRecordings: function(highlightId){
        this.$("#recordingsContainer").html(adminApp.views.recordings.render().el);
        if (highlightId){
            recordingsView.highlight(highlightId);
        }
    }
});