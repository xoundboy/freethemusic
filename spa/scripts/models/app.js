var Backbone = require('backbone');

module.exports = new ( Backbone.Model.extend({

    defaults: {
        player: "show",
        search: "hide",
        nav: "hide"
    }

}))();