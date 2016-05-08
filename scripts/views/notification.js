var template = require('./html/notification.html');

module.exports = Backbone.View.extend({

    el: "#notificationContainer",

    initialize: function(){
        this.listenTo(this.model, 'change', this.render);

        this.render();

        if (this.model.get("autohide")){
            setTimeout(this.close, this.model.get("duration"));
        }
    },

    close: function(){
        this.$el.empty().removeData().unbind().hide();
    },

    render: function(){
        this.$el.html(template(this.model.attributes)).show();
        return this;
    }
});