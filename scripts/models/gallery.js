/**
 * Created by xoundboy on 25/03/16.
 */
module.exports = Backbone.Model.extend({

    initialize: function(options){

        // listen to the gallery images ocllection and update the
        // images JSON string whenever it changes
        this.listenTo(options.galleryImagesCollection, "change remove", this.updateImagesString)
    },

    updateImagesString: function(e){
        this.set("images", e.collection.toJSON());
    },

    defaults: {
        actName: "",
        playlistName: "",
        trackName: "",
        images: null
    },

    urlRoot: 'api/gallery'
});