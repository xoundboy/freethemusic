var template = require('./html/trackList.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "trackList",

    render: function(){
        this.$el.html(template({trackList: this.collection.toJSON()}));
        return this;
    }
});