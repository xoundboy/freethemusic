module.exports = new (Backbone.Collection.extend({
    model: x7.ArtistModel,
    url: "api/Artists"
}))();