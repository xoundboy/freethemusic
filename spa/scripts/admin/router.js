window.x7 = window.x7 ? window.x7 : {};

x7.Router = Backbone.Router.extend({

    initialize: function (options) {
        this.adminApp = options;
    },

    routes: {
        '': 'showDashboard'
    },

    showDashboard: function () {
        this.adminApp.views.dashboard.render();
    }

});
