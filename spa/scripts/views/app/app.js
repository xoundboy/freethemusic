require('jquery-ui/button');
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

// subview: player
var playerModel = require('../../models/player.js');
var PlayerView = require('../../views/app/player.js');
var playerView = new PlayerView({ model: playerModel, template: $("#template_player").html() });

// subview: search
var searchModel = require('../../models/search.js');
var SearchView = require('../../views/app/search.js');
var searchView = new SearchView({ model: searchModel, template: $("#template_search").html() });

// subview: nav
var navModel = require('../../models/nav.js');
var NavView = require('../../views/app/nav.js');
var navView = new NavView({ model: navModel, template: $("#template_nav").html() });

module.exports = Backbone.View.extend({

    el: "body",

    initialize: function (options) {
        _.extend(this, _.pick(options, "template"));
        this.model.bind('change', this.render, this);
    },

    events: {
        "click #playerToggle": "togglePlayer",
        "click #searchToggle": "toggleSearch",
        "click #navToggle": "toggleNav"
    },

    togglePlayer: function (state) {
        playerModel.toggle();
    },

    toggleSearch: function (state) {
        searchModel.toggle();
    },

    toggleNav: function (/*state*/) {
        navModel.toggle();
    },

    render: function () {

        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
        this.$el.html(compiledTemplate);

        var $playerToggle = $("#playerToggle");
        var $navToggle = $("#navToggle");
        var $searchToggle = $("#searchToggle");

        $playerToggle.button({ icons: { primary: "ui-icon-player" }, text: false });
        $navToggle.button({ icons: { primary: "ui-icon-menu" }, text: false });
        $searchToggle.button({ icons: { primary: "ui-icon-search" }, text: false });

        // render sub-views
        this.$("#playerContainer").html(playerView.render().el);
        this.$("#searchContainer").html(searchView.render().el);
        this.$("#navContainer").html(navView.render().el);

        this.renderDefaults();

        return this;
    },

    renderDefaults: function () {

        // update visibility of sub-views
        playerModel.toggle(this.model.get("player"));
        searchModel.toggle(this.model.get("search"));
        navModel.toggle(this.model.get("nav"));
    }
});
