/**
 * Created by xoundboy on 25/03/16.
 */
var _ = require('underscore');
var $ = require('jquery');
var Mustache = require('mustache');

var utils = require('../../utils.js');
var GalleryImagesCollection = require('../../collections/galleryImages.js');
var GalleryImagesView = require('./galleryImages.js');

module.exports = Backbone.View.extend({

    id: "gallery",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.formData = new FormData();
        this.galleryImagesCollection = new GalleryImagesCollection({galleryID: this.model.get("galleryID")});
        this.galleryImagesView = new GalleryImagesView({
            template: $("#template_galleryImages").html(),
            collection: this.galleryImagesCollection
        });
        this.listenTo(this.galleryImagesCollection, 'reset sort change remove', this.render);
        this.galleryImagesCollection.fetch({reset:true});
    },

    events: {
        "change #artistImageUpload": "uploadImage"
    },

    uploadImage: function(e){
        var file = e.target.files[0],
            xhr_upload = new XMLHttpRequest();

        this.showLoadingMessage();
        this.setFormData(file);

        xhr_upload.open('POST', "/api/image/upload", true);
        xhr_upload.onload = $.proxy(this.onUploadSuccess, this);
        xhr_upload.onerror = $.proxy(this.onUploadError, this);
        xhr_upload.send(this.formData);
    },

    onUploadSuccess: function (data) {
        var response = (JSON.parse(data.currentTarget.responseText));
        this.model.set("tempName", response.tempName);
        this.model.set("size", response.size);
        this.loadingMessage.close();
        var newImage = new ImageModel({src:response.finalImageFileName});
        this.model.addImage(newImage);
        this.model.save();
    },

    onUploadError: function (data){
        alert("error uploading the file");
        console.log(data);
    },

    showLoadingMessage: function(){
        this.loadingMessage = utils.createNotification({
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
        this.$el.html(Mustache.to_html(this.template, this.model.attributes));
        this.$el.find("#imagesContainer").html(this.galleryImagesView.render().el);

        // sub-views need this
        this.delegateEvents();
        return this;
    }

});