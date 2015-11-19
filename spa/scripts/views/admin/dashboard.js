//require('jquery-ui/tabs');
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

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        var currentTab = this.model.get('currentTab');
        var htmlToRender = adminApp.views[currentTab].render().el;
        this.$el.find("#mainContent").html(htmlToRender);

        if (currentTab === 'recordings'){

        }

        return this;
    }
});