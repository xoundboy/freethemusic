webpackJsonp([1],[
/* 0 */
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ function(module, exports, __webpack_require__) {

	//require('./css/reset.scss');
	//require('./css/app/base.scss');
	//require('./css/app/menu.scss');
	//require('./css/app/player.scss');
	//require('./css/app/style.scss');
	//
	//require('.///scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.min.css');
	//require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css');
	//require('./scripts/libs/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css');
	
	var $ = __webpack_require__(/*! jquery */ 1);
	var Backbone = __webpack_require__(/*! backbone */ 2);
	
	// Bootstrap the application when the DOM is ready
	$(function(){
	    __webpack_require__(/*! ./routers/appRouter.js */ 24);
	    Backbone.history.start();
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/*!******************************!*\
  !*** ./routers/appRouter.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! jquery */ 1);
	var Backbone = __webpack_require__(/*! backbone */ 2);
	var appModel = __webpack_require__(/*! ../models/app.js */ 25);
	var AppView = __webpack_require__(/*! ../views/app/app.js */ 26);
	var appView = new AppView({ model: appModel, template: $("#template_app").html() });
	
	module.exports = new (Backbone.Router.extend({
	
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


/***/ },
/* 25 */
/*!***********************!*\
  !*** ./models/app.js ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = new ( Backbone.Model.extend({
	
	    defaults: {
	        player: "show",
	        search: "hide",
	        nav: "hide"
	    }
	
	}))();

/***/ },
/* 26 */
/*!**************************!*\
  !*** ./views/app/app.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-ui/button */ 23);
	var $ = __webpack_require__(/*! jquery */ 1);
	var _ = __webpack_require__(/*! underscore */ 3);
	var Backbone = __webpack_require__(/*! backbone */ 2);
	var Mustache = __webpack_require__(/*! mustache */ 10);
	
	// subview: playerpanel
	var playerModel = __webpack_require__(/*! ../../models/player.js */ 27);
	var PlayerView = __webpack_require__(/*! ../../views/app/player.js */ 28);
	var playerView = new PlayerView({ model: playerModel, template: $("#template_player").html() });
	
	// subview: search
	var searchModel = __webpack_require__(/*! ../../models/search.js */ 29);
	var SearchView = __webpack_require__(/*! ../../views/app/search.js */ 30);
	var searchView = new SearchView({ model: searchModel, template: $("#template_search").html() });
	
	// subview: nav
	var navModel = __webpack_require__(/*! ../../models/nav.js */ 31);
	var NavView = __webpack_require__(/*! ../../views/app/nav.js */ 32);
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


/***/ },
/* 27 */
/*!**************************!*\
  !*** ./models/player.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(/*! backbone */ 2);
	
	module.exports = new (Backbone.Model.extend({
	
	    defaults: {
	        open: false,
	        name: "-",
	        artist: "-",
	        duration: 0,
	        empty: true,
	        isPlaying: false
	    },
	
	    toggle: function(state){
	        switch (state) {
	            case "show":
	                this.set("open", true);
	                break;
	            case "hide":
	                this.set("open", false);
	                break;
	            default:
	                this.set("open", !this.get("open"));
	        }
	    }
	}))();

/***/ },
/* 28 */
/*!*****************************!*\
  !*** ./views/app/player.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-ui/button */ 23);
	var $ = __webpack_require__(/*! jquery */ 1);
	var _ = __webpack_require__(/*! underscore */ 3);
	var Backbone = __webpack_require__(/*! backbone */ 2);
	var Mustache = __webpack_require__(/*! mustache */ 10);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "playerPanel",
	    className: "playerPanel",
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.bind('change', this.render, this);
	    },
	
	    events: {
	        
	    },
	
	    render: function () {
	
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	
	        // sub-views need this
	        this.delegateEvents();
	
	        if (this.model.get("empty")) {
	
	            var $searchBtn = $('#emptyPlayerSearchButton');
	            $searchBtn.button({ icons: { primary: "ui-icon-search" }, text: false });
	
	        } else {
	
	            // cache the button selectors
	            var btn = {
	                $play: $("#playButton"),
	                $pause: $("#pauseButton"),
	                $prev: $("#skipBackButton"),
	                $next: $("#skipForwardButton")
	            };
	
	            // style the buttons
	            btn.$play.button({ icons: { primary: "ui-icon-play" }, text: false });
	            btn.$pause.button({ icons: { primary: "ui-icon-pause" }, text: false });
	            btn.$prev.button({ icons: { primary: "ui-icon-seek-first" }, text: false });
	            btn.$next.button({ icons: { primary: "ui-icon-seek-end" }, text: false });
	
	            if (!this.model.trackLoaded) {
	
	                // disable the controls
	                btn.$play.button("option", "disabled", true);
	                btn.$pause.button("option", "disabled", true);
	                btn.$prev.button("option", "disabled", true);
	                btn.$next.button("option", "disabled", true);
	                $("#trackPosition").slider({ disabled: true });
	                $("#spinner").progressbar({ value: false });
	
	            } else {
	
	                // initialise song position slider
	                $("#trackPosition").slider({
	                    min: 0,
	                    max: _buffer.duration,
	                    value: _position,
	                    step: 0.01,
	                    range: 'min',
	                    start: _onSliderStart,
	                    stop: _onSliderStop
	                });
	                //$("#spinnerContainer").hide();
	                _setSkipButtonStates();
	            }
	        }
	
	        return this;
	    }
	});


/***/ },
/* 29 */
/*!**************************!*\
  !*** ./models/search.js ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = new (Backbone.Model.extend({
	    defaults: {
	        open: false
	    },
	    toggle: function (state) {
	        switch (state) {
	            case "show":
	                this.set("open", true);
	                break;
	            case "hide":
	                this.set("open", false);
	                break;
	            default:
	                this.set("open", !this.get("open"));
	        }
	    }
	}))();

/***/ },
/* 30 */
/*!*****************************!*\
  !*** ./views/app/search.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	//require('jquery-ui/button');
	//var $ = require('jquery');
	var _ = __webpack_require__(/*! underscore */ 3);
	var Backbone = __webpack_require__(/*! backbone */ 2);
	var Mustache = __webpack_require__(/*! mustache */ 10);
	
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "searchPanel",
	    className: "searchPanel",
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.bind('change', this.render, this);
	    },
	
	    events: {
	        "click #emptyPlayerSearchButton": "search"
	    },
	
	    search: function () {
	        alert("searching");
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	
	        // sub-views need this
	        this.delegateEvents();
	
	        return this;
	    }
	});

/***/ },
/* 31 */
/*!***********************!*\
  !*** ./models/nav.js ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = new (Backbone.Model.extend({
	    defaults: {
	        open: false
	    },
	    toggle: function (state) {
	        switch (state) {
	            case "show":
	                this.set("open", true);
	                break;
	            case "hide":
	                this.set("open", false);
	                break;
	            default:
	                this.set("open", !this.get("open"));
	        }
	    }
	
	}))();

/***/ },
/* 32 */
/*!**************************!*\
  !*** ./views/app/nav.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	//require('jquery-ui/button');
	//var $ = require('jquery');
	var _ = __webpack_require__(/*! underscore */ 3);
	var Backbone = __webpack_require__(/*! backbone */ 2);
	var Mustache = __webpack_require__(/*! mustache */ 10);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "ul",
	    id: "nav",
	    className: "navPanel",
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.bind('change', this.render, this);
	    },
	
	    events: {
	        "click a": "close"
	    },
	
	    close: function () {
	        this.model.set("open", false);
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	
	        // sub-views need this
	        this.delegateEvents();
	
	        return this;
	    }
	});


/***/ }
]);
//# sourceMappingURL=frontend.js.map