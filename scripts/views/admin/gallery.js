/**
 * Created by xoundboy on 25/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

var viewUtils = require('../../helpers/viewUtils.js');
var GalleryModel = require('../../models/gallery.js');
var GalleryImagesCollection = require('../../collections/galleryImages.js');
var GalleryImagesView = require('./galleryImages.js');
var ImageModel = require('../../models/image.js');

/**
 * To associate and integrate a gallery with an "Other Entity" (OE)
 * for example, artist, track, playlist etc do the following:
 *
 *  1. create an empty gallery and get its id
 *
 *  2. assign this galleryID to the OE model
 *
 *  3. When initializing the OE view,
 *
 *          this.galleryView = utils.createGalleryView(galleryID, containerElSelector)
 *
 *  4. After the OE view HTML has been rendered into the DOM,
 *
 *          this.galleryView && this.galleryView.render();
 */


module.exports = Backbone.View.extend({

    id: "gallery",

    initialize: function (options) {

        this.model = new GalleryModel({id: options.galleryID});
        this.containerElSelector = options.containerElSelector;
        this.template = $("#template_gallery").html();
        this.formData = new FormData();

        this.listenTo(this.galleryImagesCollection, 'reset sort change remove fetch', this.render);

        // sub-view
        this.galleryImagesCollection = new GalleryImagesCollection();
        this.galleryImagesView = new GalleryImagesView({
            template: $("#template_galleryImages").html(),
            collection: this.galleryImagesCollection
        });

        this.model.fetch({success: $.proxy(this.onGalleryModelFetched, this)});
    },

    onGalleryModelFetched: function(model, response){
        this.galleryImagesCollection.reset(response);
    },

    events: {
        "change #artistImageUpload": "uploadImage"
    },

    uploadImage: function(e){
        var file = e.target.files[0],
            xhr_upload = new XMLHttpRequest();

        //this.showLoadingMessage();
        this.setFormData(file);

        xhr_upload.open('POST', "/api/image/upload", true);
        xhr_upload.onload = $.proxy(this.onUploadImageSuccess, this);
        xhr_upload.onerror = $.proxy(this.onUploadImageError, this);
        xhr_upload.send(this.formData);
    },

    onUploadImageSuccess: function (data) {
        var response = (JSON.parse(data.currentTarget.responseText));
        var newImage = new ImageModel({
            src: response.finalImageFileName,
            size: response.size
        });
        this.galleryImagesCollection.add(newImage);
        this.model.set({images:this.galleryImagesCollection.toJSON()},{silent:true});
        this.model.save();
        //this.loadingMessage.close();
    },

    onUploadImageError: function (data){
        alert("error uploading the file");
        console.log(data);
    },

    showLoadingMessage: function(){
        this.loadingMessage = viewUtils.createNotification({
            message: "Uploading file to server, please wait..."
        });
    },

    setFormData: function(uploadFile){
        this.formData.append('uploadFile', uploadFile);
        this.formData.append('actName', this.model.get("actName"));
        this.formData.append('playlistName', this.model.get("playlistName"));
        this.formData.append('trtackName', this.model.get("trackName"));
    },

    render: function() {

        console.log("rendering gallery");
        this.$el.html(Mustache.to_html(this.template, this.model.attributes));
        this.$el.find("#imagesContainer").html(this.galleryImagesView.render().el);

        // gallery renders itself into its assigned container Element
        $(this.containerElSelector).html(this.$el);

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});