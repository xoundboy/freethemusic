module.exports = Backbone.Model.extend({

    loadAndPlay: function(model){
        this.set(model.attributes);
        this.set("playing", true);
    }

});