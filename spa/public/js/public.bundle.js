webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(52);
	__webpack_require__(54);
	__webpack_require__(56);
	__webpack_require__(60);

	__webpack_require__(9);
	__webpack_require__(25);
	__webpack_require__(27);

	var $ = __webpack_require__(29);
	var Backbone = __webpack_require__(30);

	// Bootstrap the application when the DOM is ready
	$(function(){
	    __webpack_require__(62);
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
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(53);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./base.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./base.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "html, body {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background: #000;\n  font-family: 'Open Sans', sans-serif;\n  color: white;\n  font-size: 1.0em; }\n\n.hidden {\n  display: none; }\n\n.buttonBar {\n  width: 100%;\n  display: block; }\n  .buttonBar button {\n    width: 33.33333%; }\n", ""]);

	// exports


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./menu.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./menu.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#nav li {\n  background: #033F15;\n  text-align: center;\n  border-top: 1px dashed #969696; }\n  #nav li a {\n    display: block;\n    padding: 20px 0;\n    font-size: 16px;\n    color: white; }\n\n#nav li:hover {\n  background: #AD6C0B; }\n  #nav li:hover a {\n    color: black;\n    font-weight: 900; }\n", ""]);

	// exports


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./player.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./player.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".searchPanel .panelContents, .playerPanel .panelContents {\n  width: 100%;\n  padding: 20px 0;\n  text-align: center; }\n\n.playerPanel {\n  background: #02044E; }\n  .playerPanel .transportRow #trackName {\n    margin: 20px 20px 0;\n    font-weight: bold; }\n  .playerPanel .transportRow #trackName span.byLine {\n    font-size: 0.75em; }\n  .playerPanel .transportButtons {\n    margin-top: 20px; }\n  .playerPanel .sliderRow {\n    width: 90%;\n    box-sizing: border-box; }\n    .playerPanel .sliderRow #trackPosition {\n      display: inline-block;\n      min-width: 280px;\n      width: 100%;\n      margin: 20px 0;\n      position: relative;\n      top: 3px; }\n\n.searchPanel {\n  background-color: #5D0303; }\n\n.showHide.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only {\n  margin: -2px; }\n\n.ui-state-default .ui-icon.ui-icon-player {\n  background-image: url(" + __webpack_require__(58) + "); }\n\n.ui-state-default .ui-icon.ui-icon-menu {\n  background-image: url(" + __webpack_require__(59) + "); }\n\n.ui-slider .ui-slider-range {\n  background: red; }\n\n.ui-slider-horizontal {\n  height: 8px; }\n\n.ui-slider .ui-slider-handle {\n  height: 20px;\n  width: 5px;\n  padding-left: 10px; }\n", ""]);

	// exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7c2d743cc71adc8db47d2ef68fba49c7.png"

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5a12ce1871dbf177807c3cca474a2923.png"

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(61);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(29);
	var Backbone = __webpack_require__(30);
	var appModel = __webpack_require__(63);
	var AppView = __webpack_require__(64);
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
/* 63 */
/***/ function(module, exports) {

	module.exports = new ( Backbone.Model.extend({

	    defaults: {
	        player: "show",
	        search: "hide",
	        nav: "hide"
	    }

	}))();

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	var $ = __webpack_require__(29);
	var _ = __webpack_require__(31);
	var Backbone = __webpack_require__(30);
	var Mustache = __webpack_require__(38);

	// subview: playerpanel
	var playerModel = __webpack_require__(65);
	var PlayerView = __webpack_require__(66);
	var playerView = new PlayerView({ model: playerModel, template: $("#template_player").html() });

	// subview: search
	var searchModel = __webpack_require__(67);
	var SearchView = __webpack_require__(68);
	var searchView = new SearchView({ model: searchModel, template: $("#template_search").html() });

	// subview: nav
	var navModel = __webpack_require__(69);
	var NavView = __webpack_require__(70);
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(30);

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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	var $ = __webpack_require__(29);
	var _ = __webpack_require__(31);
	var Backbone = __webpack_require__(30);
	var Mustache = __webpack_require__(38);

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
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	//require('jquery-ui/button');
	//var $ = require('jquery');
	var _ = __webpack_require__(31);
	var Backbone = __webpack_require__(30);
	var Mustache = __webpack_require__(38);


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
/* 69 */
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	//require('jquery-ui/button');
	//var $ = require('jquery');
	var _ = __webpack_require__(31);
	var Backbone = __webpack_require__(30);
	var Mustache = __webpack_require__(38);

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