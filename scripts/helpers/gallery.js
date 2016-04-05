/**
 * Created by xoundboy on 30/03/16.
 */
var GalleryView = require('../views/admin/gallery.js');

module.exports = {

    createView: function(galleryID, containerElSelector){
        return new GalleryView({
            galleryID: galleryID,
            containerElSelector: containerElSelector
        });
    }
};
