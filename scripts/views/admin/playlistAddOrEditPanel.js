require('jquery-validation');
require('jquery-serializejson');

var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');
var notification = require('../../helpers/notification.js');
var GalleryView = require('./gallery.js');

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

        this.template = $('#template_playlistAddOrEditPanel').html();
        if (options.id){
            this.newPlaylist = false;
            this.model = adminApp.collections.playlists.get(options.id);
            this.setGalleryView(this.model.get("galleryID"));
        } else {
            this.model = adminApp.models.newPlaylist;
        }

        this.model.set("artistOptions", adminApp.collections.artists.toJSON(), {silent: true});

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
            adminApp.routers.main.navigate("/artist/add?returnUrl=" + returnUrl , {trigger:true});
        }
    },

    closePanel: function() {
        this.remove();
        adminApp.routers.main.navigate('playlists/highlight/' + this.model.id, {trigger: true});
    },

    reopenPanelWithGallery: function() {
        this.remove();
        adminApp.routers.main.navigate('playlist/edit/' + this.model.id, {trigger: true});
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
        adminApp.collections.playlists.fetch({
            reset: true,
            success: $.proxy(this.onPlaylistsFetchSuccess, this)
        });
    },

    onPlaylistsFetchSuccess: function(data){
        if (this.returnUrl){
            adminApp.routers.main.navigate(this.returnUrl + '?playlistId='+ data.id, {trigger:true});
            return;
        }
        if (this.newPlaylist){
            this.reopenPanelWithGallery();
        } else {
            this.closePanel();
        }
    },

    render: function () {
        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

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