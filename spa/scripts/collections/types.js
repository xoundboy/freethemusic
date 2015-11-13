var TypeModel = require('../models/type.js');

module.exports = Backbone.Collection.extend({
    model: TypeModel,
    url: "api/types",
    parse: function(response){
        return response[0];
    }
});