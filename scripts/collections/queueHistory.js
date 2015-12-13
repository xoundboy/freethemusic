module.exports = Backbone.Collection.extend({

    getMostRecentTrack: function(){
        return this.shift();
    }

});
