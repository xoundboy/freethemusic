x7.DashboardView = Backbone.View.extend({

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
        x7.views.recordings.render();
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate)
            .find("#tabs")
            .tabs()
            .tabs('option', 'active', this.model.getCurrentTabIndex());

        // render sub-views
        this.$("#audioUploadContainer").html(x7.views.audioUpload.render().el);
        this.$("#recordingsContainer").html(x7.views.recordings.render().el);

        return this;
    }
});