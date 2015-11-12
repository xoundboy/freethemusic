var $ = require('jquery');

module.exports = Backbone.Model.extend({
    defaults: {
        currentTabHref: "#recordings"
    },

    getCurrentTabIndex: function() {
        return $('#tabs a[href="' + this.get("currentTabHref") + '"]').parent().index();
    }

});