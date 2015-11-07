x7.ContactView = Backbone.View.extend({

    id: "contactView",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        $("#mainContent").html(compiledTemplate);
        return this;
    }
});
