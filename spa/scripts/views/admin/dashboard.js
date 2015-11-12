require('jquery-ui/tabs');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

// subview: recordings
var RecordingsCollection = require('../../collections/recordings.js');
var RecordingsView = require('../../views/admin/recordings.js');
var recordingsView = new RecordingsView({collection: new RecordingsCollection(), template: $("#template_recordings").html()});

// subview: audioUpload
var AudioUploadModel = require('../../models/audioUpload.js');
var AudioUploadView = require('../../views/admin/audioUpload.js');
var audioUploadView = new AudioUploadView({model: new AudioUploadModel(), template: $("#template_audioUpload").html()});


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
        this.$("#audioUploadContainer").html(audioUploadView.render().el);
        this.$("#recordingsContainer").html(recordingsView.render().el);

        return this;
    }
});