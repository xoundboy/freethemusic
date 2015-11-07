var $ = require('jquery');
var Backbone = require('backbone');
var appModel = require('../models/app.js');
var AppView = require('../views/app/app.js');
var appView = new AppView({ model: appModel, template: $("#template_app").html() });



module.exports = new (Backbone.Router.extend({

    initialize: function(options) {
        this.app = options;
    },00ikoll

    routes: {
        '':          'showHome',
        'playlists': 'showPlayLists',
        'about':     'showAbout',
        'music':     'showMusic',
        'projects':  'showProjects',
        'contact':   'showContact'
    },

    showHome: function () {
        appView.render();
        //this.app.views.home.render();
    },
    showPlayLists: function() {
        //this.app.views.playlists.render();
    },
    showAbout: function(){
        //this.app.views.about.render();
    },
    showMusic: function(){
        //this.app.views.music.render();
    },
    showProjects: function(){
        //this.app.views.projects.render();
    },
    showContact: function(){
        //this.app.views.contact.render();
    }
}))();
