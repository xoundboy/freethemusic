var ArtistsCollection = require('../collections/artists.js');
var TypesCollection = require('../collections/types.js');

var data = {};

/**
 * Cache some data that is used in multiple pages
*/

new ArtistsCollection().fetch({
    success: function(collection){
        data.artistsCollection = collection.toJSON();
    },
    error: function(){
        console.log("cannot reach the artists api");
    }
});

new TypesCollection().fetch({
    success: function(collection){
        data.typesCollection = collection.toJSON();
    },
    error: function(){
        console.log("cannot reach the types api");
    }
});

module.exports = data;
