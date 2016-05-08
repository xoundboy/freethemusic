var template = require('./html/recording.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "recordingDetails",

    render: function() {
        this.$el.html(template(this.model.attributes));
        this.delegateEvents();
        return this;
    }
});