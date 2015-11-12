var $ = require('jquery');
var Backbone = require('backbone');

var DashboardModel = require('../models/dashboard.js');
var DashboardView = require('../views/admin/dashboard.js');
var dashboardView = new DashboardView({ model: new DashboardModel(), template: $("#template_dashboard").html() });

module.exports = new (Backbone.Router.extend({

    routes: {
        '': 'showDashboard'
    },

    showDashboard: function () {
        dashboardView.render();
    }

}))();
