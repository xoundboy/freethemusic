/**
 * Created by xoundboy on 25/03/16.
 */
module.exports = Backbone.Model.extend({

    defaults: {
        actName: "",
        playlistName: "",
        trackName: "",
        images: null
    },

    urlRoot: 'api/gallery'
});