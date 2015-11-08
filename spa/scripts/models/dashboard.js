var $ = require('jquery');

module.exports = new ( Backbone.Model.extend({
    defaults: {
        currentTabHref: "#recordings"
    },

    getCurrentTabIndex: function() {
        return $('#tabs a[href="' + this.get("currentTabHref") + '"]').parent().index();
    }

}))();