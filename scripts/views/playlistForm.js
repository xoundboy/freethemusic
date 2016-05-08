require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var notification = require('../helpers/notification.js');
var GalleryView = require('./gallery.js');
var template = require('./html/playlistForm.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "playlistEditPanel",
    className: "addOrEditPanel",
    containerElSelector: "#mainContent",
    newPlaylist: true,

    events: {
        "click #cancelEditButton": "closePanel",
        "submit #playlistInfo": "addOrUpdatePlaylist",
        "click #isAlbum": "toggleIsAlbum",
        "change #actID": "selectArtist"
    },

    initialize: function(options) {

        _.extend(this, _.pick(options, "returnUrl"));

        if (options.id){
            this.newPlaylist = false;
            this.model = X7.collections.playlists.get(options.id);
            this.setGalleryView(this.model.get("galleryID"));
        } else {
            this.model = X7.models.newPlaylist;
        }

        this.model.set("artistOptions", X7.collections.artists.toJSON(), {silent: true});

        this.listenTo(this.model, 'change', this.render);
    },

    toggleIsAlbum: function(e){
        var formData = this.$el.find("#playlistInfo").serializeJSON();
        formData.isAlbum = formData.isAlbum !== undefined;
        this.model.set(formData);
    },

    setGalleryView: function(galleryID){
        this.galleryView = new GalleryView({
            galleryID: galleryID,
            containerElSelector: "#playlistGalleryContainer"
        });
    },

    updateSelect: function () {
        var selectedArtistValue = parseInt(this.model.get("actID"));
        this.$el.find("select[name=actID]")
            .find("option[value=" + selectedArtistValue + "]")
            .attr("selected", true);
    },

    selectArtist: function(e){
        if(e.target.value === "new"){
            var returnUrl = encodeURIComponent('playlist/edit/' + this.model.id);
            X7.router.navigate("/artist/add?returnUrl=" + returnUrl , {trigger:true});
        }
    },

    closePanel: function() {
        this.remove();
        X7.router.navigate('playlists/highlight/' + this.model.id, {trigger: true});
    },

    reopenPanelWithGallery: function() {
        this.remove();
        X7.router.navigate('playlist/edit/' + this.model.id, {trigger: true});
    },

    addOrUpdatePlaylist: function(e) {

        e.preventDefault();

        var $infoForm = this.$el.find("#playlistInfo"),
            validator = $infoForm.validate();

        if (validator.form()) {
            this.model.set($infoForm.serializeJSON());
            this.model.save(null, {
                success: $.proxy(this.onPlaylistSaveSuccess, this)
            });
        }
        return false;
    },

    onPlaylistSaveSuccess: function(){
        X7.collections.playlists.fetch({
            reset: true,
            success: $.proxy(this.onPlaylistsFetchSuccess, this)
        });
    },

    onPlaylistsFetchSuccess: function(data){
        if (this.returnUrl){
            X7.router.navigate(this.returnUrl + '?playlistId='+ data.id, {trigger:true});
            return;
        }
        if (this.newPlaylist){
            this.reopenPanelWithGallery();
        } else {
            this.closePanel();
        }
    },

    render: function () {
        this.$el.html(template(this.model.attributes));

        // first render self into #mainContent
        $(this.containerElSelector).html(this.$el);

        // now render the gallery section if its available
        this.galleryView && this.galleryView.render();

        this.$el.find("button").button();

        this.updateSelect();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    }
});