webpackJsonp([0],[
/* 0 */
/*!*********************!*\
  !*** ./adminApp.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	__webpack_require__(/*! ../css/reset.scss */ 1);
	__webpack_require__(/*! ../css/admin/base.scss */ 5);//
	__webpack_require__(/*! ../css/admin/style.scss */ 7);
	__webpack_require__(/*! ../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.min.css */ 9);
	__webpack_require__(/*! ../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css */ 25);
	__webpack_require__(/*! ../jquery-ui-custom-theme/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css */ 27);
	
	var $                       = __webpack_require__(/*! jquery */ 29);
	var Backbone                = __webpack_require__(/*! backbone */ 30);
	
	var AdminRouter             = __webpack_require__(/*! ./routers/adminRouter.js */ 32);
	
	var ArtistsCollection       = __webpack_require__(/*! ./collections/artists.js */ 45);
	var ArtistsView             = __webpack_require__(/*! ./views/admin/artists.js */ 46);
	
	var RecordingsCollection    = __webpack_require__(/*! ./collections/recordings.js */ 47);
	var RecordingsView          = __webpack_require__(/*! ./views/admin/recordings.js */ 49);
	
	var AudioUploadModel        = __webpack_require__(/*! ./models/audioUpload.js */ 51);
	var AudioUploadView         = __webpack_require__(/*! ./views/admin/audioUpload.js */ 54);
	
	var PlaylistsCollection     = __webpack_require__(/*! ./collections/playlists.js */ 57);
	var PlaylistsView           = __webpack_require__(/*! ./views/admin/playlists.js */ 59);
	
	var TagsCollection          = __webpack_require__(/*! ./collections/tags.js */ 60);
	var TagsView                = __webpack_require__(/*! ./views/admin/tags.js */ 62);
	
	//var PlayerModel             = require('./models/player.js');
	//var PlayerView              = require('./views/admin/player.js');
	
	var QueueHistoryCollection  = __webpack_require__(/*! ./collections/queueHistory.js */ 90);
	var QueueHistoryView        = __webpack_require__(/*! ./views/admin/queueHistory.js */ 91);
	
	var QueuePlayerModel        = __webpack_require__(/*! ./models/queuePlayer.js */ 93);
	var QueuePlayerView         = __webpack_require__(/*! ./views/admin/queuePlayer.js */ 94);
	
	var QueueCollection         = __webpack_require__(/*! ./collections/queue.js */ 65);
	var QueueView               = __webpack_require__(/*! ./views/admin/queue.js */ 67);
	
	var QueuePageView           = __webpack_require__(/*! ./views/admin/queuePage.js */ 95);
	
	var NavView                 = __webpack_require__(/*! ./views/admin/nav.js */ 71);
	
	
	// Global App Object
	global.adminApp = {
	    models: {},
	    collections: {},
	    views: {},
	    routers: {}
	};
	
	
	$(function(){
	
	    // artists tab
	    adminApp.collections.artists = new ArtistsCollection();
	    adminApp.views.artists = new ArtistsView({
	        collection: adminApp.collections.artists,
	        template: $("#template_artists").html()
	    });
	
	    // recordings tab
	    adminApp.collections.recordings = new RecordingsCollection();
	    adminApp.views.recordings = new RecordingsView({
	        collection: adminApp.collections.recordings,
	        template: $("#template_recordings").html()
	    });
	
	    // uploads tab
	    adminApp.models.audioUpload = new AudioUploadModel();
	    adminApp.views.audioUpload = new AudioUploadView({
	        model: adminApp.models.audioUpload,
	        template: $("#template_audioUpload").html()
	    });
	
	    // playlists tab
	    adminApp.collections.playlists = new PlaylistsCollection();
	    adminApp.views.playlists = new PlaylistsView({
	        collection: adminApp.collections.playlists,
	        template: $("#template_playlists").html()
	    });
	
	    // tags tab
	    adminApp.collections.tags = new TagsCollection();
	    adminApp.views.tags = new TagsView({
	        collection: adminApp.collections.tags,
	        template: $("#template_tags").html()
	    });
	
	    //// player
	    //adminApp.models.player = new PlayerModel();
	    //adminApp.views.player = new PlayerView({
	    //    model: adminApp.models.player,
	    //    template: $("#template_player").html()
	    //});
	
	    // queue history
	    adminApp.collections.queueHistory = new QueueHistoryCollection();
	    adminApp.views.queueHistory = new QueueHistoryView({
	        collection: adminApp.collections.queueHistory,
	        template: $("#template_queueHistory").html()
	    });
	
	    // play queue
	    adminApp.collections.queue = new QueueCollection();
	    adminApp.views.queue = new QueueView({
	        collection: adminApp.collections.queue,
	        template: $("#template_queue").html()
	    });
	
	    // queue player
	    // id = 1 to ensure that it gets saved in local storage
	    adminApp.models.queuePlayer = new QueuePlayerModel({id:1});
	    adminApp.views.queuePlayer = new QueuePlayerView({
	        model: adminApp.models.queuePlayer,
	        template: $("#template_queuePlayer").html()
	    });
	
	    // queue page
	    adminApp.views.queuePage = new QueuePageView({
	        template: $("#template_queuePage").html()
	    });
	
	    // Navigation
	    adminApp.views.nav = new NavView({
	        template: $("#template_nav").html()
	    });
	
	    // Bootstrap the application
	    $( document ).ajaxStop(function() {
	        $(this).unbind("ajaxStop");
	        $("#loading").remove();
	        adminApp.views.nav.render();
	        adminApp.routers.main = new AdminRouter();
	        Backbone.history.start();
	    });
	
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/*!******************************!*\
  !*** ../css/admin/base.scss ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./base.scss */ 6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
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
/* 6 */
/*!***************************************************************!*\
  !*** ../~/css-loader!../~/sass-loader!../css/admin/base.scss ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "body, html {\n  font-family: 'Open Sans', sans-serif;\n  background-color: #282828;\n  color: white;\n  min-width: 320px; }\n\nbody, html, input, select, textarea {\n  font-size: 15px; }\n\n#notificationContainer {\n  position: fixed;\n  height: 100vh;\n  width: 100vw;\n  opacity: 0.9;\n  z-index: 100;\n  display: none; }\n  #notificationContainer #notificationInner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100%; }\n    #notificationContainer #notificationInner p {\n      font-size: 18px;\n      text-align: center; }\n    #notificationContainer #notificationInner.info {\n      background: #565656;\n      color: white; }\n    #notificationContainer #notificationInner.warning {\n      background: orange;\n      color: black; }\n    #notificationContainer #notificationInner.error {\n      background: red;\n      color: white; }\n\n#queuePlayerContainer {\n  padding: 0 30px;\n  height: 60px;\n  background: #0d0d0e; }\n\n#queueContainer {\n  background: #424242;\n  padding: 3px; }\n\nselect {\n  -webkit-appearance: none; }\n\n.highlighted {\n  background: #298d12;\n  color: #b3c5ff; }\n\nh2 {\n  line-height: 2em;\n  font-size: 18px; }\n\n.ui-widget {\n  font-size: 1em !important; }\n\nform {\n  margin: 30px 0; }\n\nspan.warningText {\n  font-size: 0.8em;\n  color: orange; }\n\na.link, .ui-widget-content a.link {\n  color: #76a01b;\n  text-decoration: underline; }\n\n.ui-sortable-helper {\n  display: table; }\n\nbutton.ui-widget {\n  border: none; }\n\ninput[type=file] {\n  font-size: 14px; }\n\np {\n  margin: 10px 0;\n  line-height: 22px; }\n  p strong {\n    font-weight: 900; }\n  p.small {\n    font-size: 12px; }\n  p label {\n    display: inline-block;\n    width: 60px;\n    text-align: right;\n    vertical-align: top;\n    margin-right: 10px; }\n    p label.error {\n      display: block;\n      width: auto;\n      text-align: left;\n      color: red;\n      margin-left: 79px;\n      font-size: 0.8125em; }\n  p.buttons {\n    margin-top: 20px; }\n    p.buttons .nextBtn, p.buttons #step3NextBtn {\n      float: right; }\n\n#navContainer {\n  position: fixed;\n  height: 31px;\n  width: 100vw;\n  padding: 8px;\n  text-transform: uppercase;\n  z-index: 10;\n  background-color: #282828; }\n  #navContainer a {\n    display: inline-block;\n    color: #aaaaaa;\n    padding: 6px;\n    font-size: 16px; }\n    #navContainer a:hover {\n      background: white;\n      color: #333333; }\n  #navContainer button {\n    position: relative;\n    top: -2px; }\n\n#mainContent {\n  position: relative;\n  top: 31px;\n  height: calc(100% - $nav-height);\n  overflow: auto;\n  padding: 20px;\n  z-index: 5; }\n\n.buttonBar {\n  display: block;\n  text-align: right;\n  margin-bottom: 20px; }\n  .buttonBar button.cta {\n    background-image: none;\n    background-color: forestgreen; }\n\n.addOrEditPanel input, .addOrEditPanel select, .addOrEditPanel textarea {\n  width: 70%;\n  padding-left: 5px; }\n\n.addOrEditPanel textarea {\n  height: 100px; }\n\n.addOrEditPanel p.buttons {\n  text-align: right; }\n\ntable.benGrid {\n  width: 100%; }\n  table.benGrid th.rightAlign, table.benGrid td.rightAlign {\n    text-align: right; }\n  table.benGrid th.buttonColumn, table.benGrid td.buttonColumn {\n    width: 45px; }\n  table.benGrid th.emptyCollection, table.benGrid td.emptyCollection {\n    text-align: center; }\n  table.benGrid thead th {\n    text-transform: uppercase;\n    text-align: left;\n    color: #898989;\n    padding: 5px;\n    cursor: pointer;\n    font-size: 12px; }\n    table.benGrid thead th:hover {\n      background: #585858; }\n  table.benGrid tbody tr {\n    color: #E1E1E1; }\n    table.benGrid tbody tr.loadError {\n      background: #852C09; }\n    table.benGrid tbody tr:hover {\n      background: #D4D4D4;\n      color: #1E1E1E;\n      cursor: pointer; }\n    table.benGrid tbody tr.recordingEditPanel {\n      background: #343030;\n      color: #cccccc;\n      border: 1px solid #666; }\n      table.benGrid tbody tr.recordingEditPanel td {\n        padding: 10px 30px; }\n        table.benGrid tbody tr.recordingEditPanel td h2 {\n          font-weight: 400; }\n    table.benGrid tbody tr td {\n      vertical-align: middle;\n      padding: 6px;\n      font-size: 0.9em; }\n      table.benGrid tbody tr td .imgMask {\n        margin: auto;\n        width: 50px;\n        height: 50px;\n        overflow: hidden;\n        border-radius: 25px;\n        text-align: center; }\n        table.benGrid tbody tr td .imgMask img {\n          height: 50px; }\n      table.benGrid tbody tr td .nowPlaying {\n        background: green; }\n      table.benGrid tbody tr td.emptyTable {\n        text-align: center;\n        vertical-align: middle;\n        color: orange;\n        border: 1px solid orange;\n        height: 40px; }\n", ""]);
	
	// exports


/***/ },
/* 7 */
/*!*******************************!*\
  !*** ../css/admin/style.scss ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./style.scss */ 8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
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
/* 8 */
/*!****************************************************************!*\
  !*** ../~/css-loader!../~/sass-loader!../css/admin/style.scss ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "h1, h2, h3, h4 {\n  font-weight: 900; }\n\n.ui-tabs .ui-tabs-panel h2 {\n  font-size: 1.3em;\n  line-height: 2.3em; }\n", ""]);
	
	// exports


/***/ },
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
/* 32 */
/*!********************************!*\
  !*** ./routers/adminRouter.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! jquery */ 29);
	var Backbone = __webpack_require__(/*! backbone */ 30);
	
	var RecordingEditPanelView = __webpack_require__(/*! ../views/admin/recordingEditPanel.js */ 33);
	var ArtistAddOrEditPanelView = __webpack_require__(/*! ../views/admin/artistAddOrEditPanel.js */ 43);
	var ArtistModel = __webpack_require__(/*! ../models/artist.js */ 44);
	
	module.exports = Backbone.Router.extend({
	
	    $main: $("#mainContent"),
	
	    routes: {
	
	        ''                          : 'recordings',
	        'recordings'                : 'recordings',
	        'recordings/highlight/:id'  : 'recordingHighlight',
	        'recording/edit/:id'        : 'recordingEdit',
	        'recording/add'             : 'recordingAdd',
	
	        'queue'                     : 'queue',
	
	        'artists'                   : 'artists',
	        'artists/highlight/:id'     : 'artistHighlight',
	        'artist/edit/:id'           : 'artistEdit',
	        'artist/add'                : 'artistAdd',
	
	        'playlists'                 : 'playlists',
	
	        'tags'                      : 'tags'
	    },
	
	
	    recordings: function() {
	        this.$main.html(adminApp.views.recordings.render().el);
	    },
	
	    recordingHighlight: function(id){
	        this.$main.html(adminApp.views.recordings.render().el);
	        this.highlightElement($("#recordingId-" + id));
	    },
	
	    recordingEdit: function(id){
	        var recordingEditPanel = new RecordingEditPanelView({
	            model: adminApp.collections.recordings.get(id),
	            template: $('#template_recordingEditPanel').html()
	        });
	        this.$main.html(recordingEditPanel.render().el);
	    },
	
	    recordingAdd: function() {
	        this.$main.html(adminApp.views.audioUpload.render().el);
	    },
	
	
	    queue: function() {
	        var queueHtml = adminApp.views.queuePage.render().el;
	        this.$main.html(queueHtml);
	    },
	
	
	    artists: function() {
	        this.$main.html(adminApp.views.artists.render().el);
	    },
	
	    artistHighlight: function(id){
	        this.$main.html(adminApp.views.artists.render().el);
	        this.highlightElement($("#actID-" + id));
	    },
	
	    artistEdit: function(id){
	        var artistEditPanel = new ArtistAddOrEditPanelView({
	            model: adminApp.collections.artists.get(id),
	            template: $('#template_artistAddOrEditPanel').html()
	        });
	        this.$main.html(artistEditPanel.render().el);
	    },
	
	    artistAdd: function() {
	        var artistAddPanel = new ArtistAddOrEditPanelView({
	            model: new ArtistModel(),
	            template: $('#template_artistAddOrEditPanel').html()
	        });
	        this.$main.html(artistAddPanel.render().el);
	    },
	
	    playlists: function() {
	        this.$main.html(adminApp.views.playlists.render().el);
	    },
	
	    tags: function() {
	        this.$main.html(adminApp.views.tags.render().el);
	    },
	
	    highlightElement: function($element){
	
	        if ($element.length){
	
	            // highlight the colour
	            $element.addClass("highlighted");
	
	            // scroll into view
	            var offset = $element.offset();
	            if(offset){
	                $('html, body').animate({
	                    scrollTop: offset.top,
	                    scrollLeft: offset.left
	                }, "slow");
	
	                setTimeout(function(){
	                    // unhighlight after a couple of secs
	                    $element.removeClass("highlighted");
	                }, 2000);
	            }
	        }
	    }
	
	});


/***/ },
/* 33 */
/*!*******************************************!*\
  !*** ./views/admin/recordingEditPanel.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-validation */ 34);
	__webpack_require__(/*! jquery-serializejson */ 35);
	
	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	var RecordingAddEditView = __webpack_require__(/*! ./recordingAddEdit.js */ 37);
	var utils = __webpack_require__(/*! ../../utils.js */ 40);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "recordingEditPanel",
	    className: "recordingEditPanel",
	
	    initialize: function(options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.bind('change', this.render, this);
	    },
	
	    events: {
	        "click #cancelEditButton": "closePanel",
	        "click #updateRecordingButton": "updateRecording"
	    },
	
	    closePanel: function() {
	        adminApp.routers.main.navigate('recordings/highlight/' + this.model.id, {trigger: true});
	    },
	
	    updateRecording: function (e) {
	
	        e.preventDefault();
	
	        var that = this,
	            $infoForm = this.$el.find("#recordingInfo"),
	            validator = $infoForm.validate();
	
	        if (validator.form()) {
	
	            this.model
	                .set($infoForm.serializeJSON())
	                .unset("artistOptions", {silent: true})
	                .unset("artist", {silent: true})
	                .save(null, {
	                    success: function() {
	                        adminApp.collections.recordings.fetch({
	                            reset: true,
	                            success: function(){
	                                that.closePanel();
	                            }
	                        });
	                    }
	                });
	        }
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template);
	        this.$el.html(compiledTemplate);
	
	        // create the info form subview and render it
	        var recordingInfoForm = new RecordingAddEditView({
	            model: this.model,
	            template: $("#template_recordingAddEdit").html()
	        });
	
	        this.$el.find(".recordingInfoFormContainer").html(recordingInfoForm.render().el);
	
	        this.$el.find("button").button();
	
	        return this;
	    }
	
	});

/***/ },
/* 34 */
/*!******************************************************!*\
  !*** ../~/jquery-validation/dist/jquery.validate.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Validation Plugin v1.14.0
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2015 Jörn Zaefferer
	 * Released under the MIT license
	 */
	(function( factory ) {
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 29)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			factory( jQuery );
		}
	}(function( $ ) {
	
	$.extend($.fn, {
		// http://jqueryvalidation.org/validate/
		validate: function( options ) {
	
			// if nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				if ( options && options.debug && window.console ) {
					console.warn( "Nothing selected, can't validate, returning nothing." );
				}
				return;
			}
	
			// check if a validator for this form was already created
			var validator = $.data( this[ 0 ], "validator" );
			if ( validator ) {
				return validator;
			}
	
			// Add novalidate tag if HTML5.
			this.attr( "novalidate", "novalidate" );
	
			validator = new $.validator( options, this[ 0 ] );
			$.data( this[ 0 ], "validator", validator );
	
			if ( validator.settings.onsubmit ) {
	
				this.on( "click.validate", ":submit", function( event ) {
					if ( validator.settings.submitHandler ) {
						validator.submitButton = event.target;
					}
	
					// allow suppressing validation by adding a cancel class to the submit button
					if ( $( this ).hasClass( "cancel" ) ) {
						validator.cancelSubmit = true;
					}
	
					// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
						validator.cancelSubmit = true;
					}
				});
	
				// validate the form on submit
				this.on( "submit.validate", function( event ) {
					if ( validator.settings.debug ) {
						// prevent form submit to be able to see console output
						event.preventDefault();
					}
					function handle() {
						var hidden, result;
						if ( validator.settings.submitHandler ) {
							if ( validator.submitButton ) {
								// insert a hidden input as a replacement for the missing submit button
								hidden = $( "<input type='hidden'/>" )
									.attr( "name", validator.submitButton.name )
									.val( $( validator.submitButton ).val() )
									.appendTo( validator.currentForm );
							}
							result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
							if ( validator.submitButton ) {
								// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if ( result !== undefined ) {
								return result;
							}
							return false;
						}
						return true;
					}
	
					// prevent submit for invalid forms or custom submit handlers
					if ( validator.cancelSubmit ) {
						validator.cancelSubmit = false;
						return handle();
					}
					if ( validator.form() ) {
						if ( validator.pendingRequest ) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				});
			}
	
			return validator;
		},
		// http://jqueryvalidation.org/valid/
		valid: function() {
			var valid, validator, errorList;
	
			if ( $( this[ 0 ] ).is( "form" ) ) {
				valid = this.validate().form();
			} else {
				errorList = [];
				valid = true;
				validator = $( this[ 0 ].form ).validate();
				this.each( function() {
					valid = validator.element( this ) && valid;
					errorList = errorList.concat( validator.errorList );
				});
				validator.errorList = errorList;
			}
			return valid;
		},
	
		// http://jqueryvalidation.org/rules/
		rules: function( command, argument ) {
			var element = this[ 0 ],
				settings, staticRules, existingRules, data, param, filtered;
	
			if ( command ) {
				settings = $.data( element.form, "validator" ).settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules( element );
				switch ( command ) {
				case "add":
					$.extend( existingRules, $.validator.normalizeRule( argument ) );
					// remove messages from rules, but allow them to be set separately
					delete existingRules.messages;
					staticRules[ element.name ] = existingRules;
					if ( argument.messages ) {
						settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
					}
					break;
				case "remove":
					if ( !argument ) {
						delete staticRules[ element.name ];
						return existingRules;
					}
					filtered = {};
					$.each( argument.split( /\s/ ), function( index, method ) {
						filtered[ method ] = existingRules[ method ];
						delete existingRules[ method ];
						if ( method === "required" ) {
							$( element ).removeAttr( "aria-required" );
						}
					});
					return filtered;
				}
			}
	
			data = $.validator.normalizeRules(
			$.extend(
				{},
				$.validator.classRules( element ),
				$.validator.attributeRules( element ),
				$.validator.dataRules( element ),
				$.validator.staticRules( element )
			), element );
	
			// make sure required is at front
			if ( data.required ) {
				param = data.required;
				delete data.required;
				data = $.extend( { required: param }, data );
				$( element ).attr( "aria-required", "true" );
			}
	
			// make sure remote is at back
			if ( data.remote ) {
				param = data.remote;
				delete data.remote;
				data = $.extend( data, { remote: param });
			}
	
			return data;
		}
	});
	
	// Custom selectors
	$.extend( $.expr[ ":" ], {
		// http://jqueryvalidation.org/blank-selector/
		blank: function( a ) {
			return !$.trim( "" + $( a ).val() );
		},
		// http://jqueryvalidation.org/filled-selector/
		filled: function( a ) {
			return !!$.trim( "" + $( a ).val() );
		},
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function( a ) {
			return !$( a ).prop( "checked" );
		}
	});
	
	// constructor for validator
	$.validator = function( options, form ) {
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	};
	
	// http://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.validator.format.apply( this, args );
			};
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			});
		});
		return source;
	};
	
	$.extend( $.validator, {
	
		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $( [] ),
			errorLabelContainer: $( [] ),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function( element ) {
				this.lastActive = element;
	
				// Hide error label and remove error class on focus if enabled
				if ( this.settings.focusCleanup ) {
					if ( this.settings.unhighlight ) {
						this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
					}
					this.hideThese( this.errorsFor( element ) );
				}
			},
			onfocusout: function( element ) {
				if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
					this.element( element );
				}
			},
			onkeyup: function( element, event ) {
				// Avoid revalidate the field when pressing one of the following keys
				// Shift       => 16
				// Ctrl        => 17
				// Alt         => 18
				// Caps lock   => 20
				// End         => 35
				// Home        => 36
				// Left arrow  => 37
				// Up arrow    => 38
				// Right arrow => 39
				// Down arrow  => 40
				// Insert      => 45
				// Num lock    => 144
				// AltGr key   => 225
				var excludedKeys = [
					16, 17, 18, 20, 35, 36, 37,
					38, 39, 40, 45, 144, 225
				];
	
				if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
					return;
				} else if ( element.name in this.submitted || element === this.lastElement ) {
					this.element( element );
				}
			},
			onclick: function( element ) {
				// click on selects, radiobuttons and checkboxes
				if ( element.name in this.submitted ) {
					this.element( element );
	
				// or option elements, check parent select in that case
				} else if ( element.parentNode.name in this.submitted ) {
					this.element( element.parentNode );
				}
			},
			highlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
				} else {
					$( element ).addClass( errorClass ).removeClass( validClass );
				}
			},
			unhighlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
				} else {
					$( element ).removeClass( errorClass ).addClass( validClass );
				}
			}
		},
	
		// http://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults: function( settings ) {
			$.extend( $.validator.defaults, settings );
		},
	
		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date ( ISO ).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format( "Please enter no more than {0} characters." ),
			minlength: $.validator.format( "Please enter at least {0} characters." ),
			rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
			range: $.validator.format( "Please enter a value between {0} and {1}." ),
			max: $.validator.format( "Please enter a value less than or equal to {0}." ),
			min: $.validator.format( "Please enter a value greater than or equal to {0}." )
		},
	
		autoCreateRanges: false,
	
		prototype: {
	
			init: function() {
				this.labelContainer = $( this.settings.errorLabelContainer );
				this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
				this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
	
				var groups = ( this.groups = {} ),
					rules;
				$.each( this.settings.groups, function( key, value ) {
					if ( typeof value === "string" ) {
						value = value.split( /\s/ );
					}
					$.each( value, function( index, name ) {
						groups[ name ] = key;
					});
				});
				rules = this.settings.rules;
				$.each( rules, function( key, value ) {
					rules[ key ] = $.validator.normalizeRule( value );
				});
	
				function delegate( event ) {
					var validator = $.data( this.form, "validator" ),
						eventType = "on" + event.type.replace( /^validate/, "" ),
						settings = validator.settings;
					if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
						settings[ eventType ].call( validator, this, event );
					}
				}
	
				$( this.currentForm )
					.on( "focusin.validate focusout.validate keyup.validate",
						":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
						"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
						"[type='radio'], [type='checkbox']", delegate)
					// Support: Chrome, oldIE
					// "select" is provided as event.target when clicking a option
					.on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);
	
				if ( this.settings.invalidHandler ) {
					$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
				}
	
				// Add aria-required to any Static/Data/Class required fields before first validation
				// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
				$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
			},
	
			// http://jqueryvalidation.org/Validator.form/
			form: function() {
				this.checkForm();
				$.extend( this.submitted, this.errorMap );
				this.invalid = $.extend({}, this.errorMap );
				if ( !this.valid() ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				}
				this.showErrors();
				return this.valid();
			},
	
			checkForm: function() {
				this.prepareForm();
				for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
					this.check( elements[ i ] );
				}
				return this.valid();
			},
	
			// http://jqueryvalidation.org/Validator.element/
			element: function( element ) {
				var cleanElement = this.clean( element ),
					checkElement = this.validationTargetFor( cleanElement ),
					result = true;
	
				this.lastElement = checkElement;
	
				if ( checkElement === undefined ) {
					delete this.invalid[ cleanElement.name ];
				} else {
					this.prepareElement( checkElement );
					this.currentElements = $( checkElement );
	
					result = this.check( checkElement ) !== false;
					if ( result ) {
						delete this.invalid[ checkElement.name ];
					} else {
						this.invalid[ checkElement.name ] = true;
					}
				}
				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !result );
	
				if ( !this.numberOfInvalids() ) {
					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();
				return result;
			},
	
			// http://jqueryvalidation.org/Validator.showErrors/
			showErrors: function( errors ) {
				if ( errors ) {
					// add items to error list and map
					$.extend( this.errorMap, errors );
					this.errorList = [];
					for ( var name in errors ) {
						this.errorList.push({
							message: errors[ name ],
							element: this.findByName( name )[ 0 ]
						});
					}
					// remove items from success list
					this.successList = $.grep( this.successList, function( element ) {
						return !( element.name in errors );
					});
				}
				if ( this.settings.showErrors ) {
					this.settings.showErrors.call( this, this.errorMap, this.errorList );
				} else {
					this.defaultShowErrors();
				}
			},
	
			// http://jqueryvalidation.org/Validator.resetForm/
			resetForm: function() {
				if ( $.fn.resetForm ) {
					$( this.currentForm ).resetForm();
				}
				this.submitted = {};
				this.lastElement = null;
				this.prepareForm();
				this.hideErrors();
				var i, elements = this.elements()
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );
	
				if ( this.settings.unhighlight ) {
					for ( i = 0; elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ],
							this.settings.errorClass, "" );
					}
				} else {
					elements.removeClass( this.settings.errorClass );
				}
			},
	
			numberOfInvalids: function() {
				return this.objectLength( this.invalid );
			},
	
			objectLength: function( obj ) {
				/* jshint unused: false */
				var count = 0,
					i;
				for ( i in obj ) {
					count++;
				}
				return count;
			},
	
			hideErrors: function() {
				this.hideThese( this.toHide );
			},
	
			hideThese: function( errors ) {
				errors.not( this.containers ).text( "" );
				this.addWrapper( errors ).hide();
			},
	
			valid: function() {
				return this.size() === 0;
			},
	
			size: function() {
				return this.errorList.length;
			},
	
			focusInvalid: function() {
				if ( this.settings.focusInvalid ) {
					try {
						$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
						.filter( ":visible" )
						.focus()
						// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
						.trigger( "focusin" );
					} catch ( e ) {
						// ignore IE throwing errors when focusing hidden elements
					}
				}
			},
	
			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep( this.errorList, function( n ) {
					return n.element.name === lastActive.name;
				}).length === 1 && lastActive;
			},
	
			elements: function() {
				var validator = this,
					rulesCache = {};
	
				// select all valid inputs inside the form (no submit or reset buttons)
				return $( this.currentForm )
				.find( "input, select, textarea" )
				.not( ":submit, :reset, :image, :disabled" )
				.not( this.settings.ignore )
				.filter( function() {
					if ( !this.name && validator.settings.debug && window.console ) {
						console.error( "%o has no name assigned", this );
					}
	
					// select only the first element for each name, and only those with rules specified
					if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
						return false;
					}
	
					rulesCache[ this.name ] = true;
					return true;
				});
			},
	
			clean: function( selector ) {
				return $( selector )[ 0 ];
			},
	
			errors: function() {
				var errorClass = this.settings.errorClass.split( " " ).join( "." );
				return $( this.settings.errorElement + "." + errorClass, this.errorContext );
			},
	
			reset: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $( [] );
				this.toHide = $( [] );
				this.currentElements = $( [] );
			},
	
			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add( this.containers );
			},
	
			prepareElement: function( element ) {
				this.reset();
				this.toHide = this.errorsFor( element );
			},
	
			elementValue: function( element ) {
				var val,
					$element = $( element ),
					type = element.type;
	
				if ( type === "radio" || type === "checkbox" ) {
					return this.findByName( element.name ).filter(":checked").val();
				} else if ( type === "number" && typeof element.validity !== "undefined" ) {
					return element.validity.badInput ? false : $element.val();
				}
	
				val = $element.val();
				if ( typeof val === "string" ) {
					return val.replace(/\r/g, "" );
				}
				return val;
			},
	
			check: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );
	
				var rules = $( element ).rules(),
					rulesCount = $.map( rules, function( n, i ) {
						return i;
					}).length,
					dependencyMismatch = false,
					val = this.elementValue( element ),
					result, method, rule;
	
				for ( method in rules ) {
					rule = { method: method, parameters: rules[ method ] };
					try {
	
						result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
	
						// if a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if ( result === "dependency-mismatch" && rulesCount === 1 ) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;
	
						if ( result === "pending" ) {
							this.toHide = this.toHide.not( this.errorsFor( element ) );
							return;
						}
	
						if ( !result ) {
							this.formatAndAdd( element, rule );
							return false;
						}
					} catch ( e ) {
						if ( this.settings.debug && window.console ) {
							console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
						}
						if ( e instanceof TypeError ) {
							e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
						}
	
						throw e;
					}
				}
				if ( dependencyMismatch ) {
					return;
				}
				if ( this.objectLength( rules ) ) {
					this.successList.push( element );
				}
				return true;
			},
	
			// return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage: function( element, method ) {
				return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
					method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
			},
	
			// return the custom message for the given element name and validation method
			customMessage: function( name, method ) {
				var m = this.settings.messages[ name ];
				return m && ( m.constructor === String ? m : m[ method ]);
			},
	
			// return the first defined argument, allowing empty strings
			findDefined: function() {
				for ( var i = 0; i < arguments.length; i++) {
					if ( arguments[ i ] !== undefined ) {
						return arguments[ i ];
					}
				}
				return undefined;
			},
	
			defaultMessage: function( element, method ) {
				return this.findDefined(
					this.customMessage( element.name, method ),
					this.customDataMessage( element, method ),
					// title is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				);
			},
	
			formatAndAdd: function( element, rule ) {
				var message = this.defaultMessage( element, rule.method ),
					theregex = /\$?\{(\d+)\}/g;
				if ( typeof message === "function" ) {
					message = message.call( this, rule.parameters, element );
				} else if ( theregex.test( message ) ) {
					message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
				}
				this.errorList.push({
					message: message,
					element: element,
					method: rule.method
				});
	
				this.errorMap[ element.name ] = message;
				this.submitted[ element.name ] = message;
			},
	
			addWrapper: function( toToggle ) {
				if ( this.settings.wrapper ) {
					toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
				}
				return toToggle;
			},
	
			defaultShowErrors: function() {
				var i, elements, error;
				for ( i = 0; this.errorList[ i ]; i++ ) {
					error = this.errorList[ i ];
					if ( this.settings.highlight ) {
						this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					}
					this.showLabel( error.element, error.message );
				}
				if ( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if ( this.settings.success ) {
					for ( i = 0; this.successList[ i ]; i++ ) {
						this.showLabel( this.successList[ i ] );
					}
				}
				if ( this.settings.unhighlight ) {
					for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
			},
	
			validElements: function() {
				return this.currentElements.not( this.invalidElements() );
			},
	
			invalidElements: function() {
				return $( this.errorList ).map(function() {
					return this.element;
				});
			},
	
			showLabel: function( element, message ) {
				var place, group, errorID,
					error = this.errorsFor( element ),
					elementID = this.idOrName( element ),
					describedBy = $( element ).attr( "aria-describedby" );
				if ( error.length ) {
					// refresh error/success class
					error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
					// replace message on existing label
					error.html( message );
				} else {
					// create error element
					error = $( "<" + this.settings.errorElement + ">" )
						.attr( "id", elementID + "-error" )
						.addClass( this.settings.errorClass )
						.html( message || "" );
	
					// Maintain reference to the element to be placed into the DOM
					place = error;
					if ( this.settings.wrapper ) {
						// make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
					}
					if ( this.labelContainer.length ) {
						this.labelContainer.append( place );
					} else if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement( place, $( element ) );
					} else {
						place.insertAfter( element );
					}
	
					// Link error back to the element
					if ( error.is( "label" ) ) {
						// If the error is a label, then associate using 'for'
						error.attr( "for", elementID );
					} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby
	
						errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
						// Respect existing non-error aria-describedby
						if ( !describedBy ) {
							describedBy = errorID;
						} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
							// Add to end of list if not already present
							describedBy += " " + errorID;
						}
						$( element ).attr( "aria-describedby", describedBy );
	
						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[ element.name ];
						if ( group ) {
							$.each( this.groups, function( name, testgroup ) {
								if ( testgroup === group ) {
									$( "[name='" + name + "']", this.currentForm )
										.attr( "aria-describedby", error.attr( "id" ) );
								}
							});
						}
					}
				}
				if ( !message && this.settings.success ) {
					error.text( "" );
					if ( typeof this.settings.success === "string" ) {
						error.addClass( this.settings.success );
					} else {
						this.settings.success( error, element );
					}
				}
				this.toShow = this.toShow.add( error );
			},
	
			errorsFor: function( element ) {
				var name = this.idOrName( element ),
					describer = $( element ).attr( "aria-describedby" ),
					selector = "label[for='" + name + "'], label[for='" + name + "'] *";
	
				// aria-describedby should directly reference the error element
				if ( describer ) {
					selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
				}
				return this
					.errors()
					.filter( selector );
			},
	
			idOrName: function( element ) {
				return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
			},
	
			validationTargetFor: function( element ) {
	
				// If radio/checkbox, validate first element in group instead
				if ( this.checkable( element ) ) {
					element = this.findByName( element.name );
				}
	
				// Always apply ignore filter
				return $( element ).not( this.settings.ignore )[ 0 ];
			},
	
			checkable: function( element ) {
				return ( /radio|checkbox/i ).test( element.type );
			},
	
			findByName: function( name ) {
				return $( this.currentForm ).find( "[name='" + name + "']" );
			},
	
			getLength: function( value, element ) {
				switch ( element.nodeName.toLowerCase() ) {
				case "select":
					return $( "option:selected", element ).length;
				case "input":
					if ( this.checkable( element ) ) {
						return this.findByName( element.name ).filter( ":checked" ).length;
					}
				}
				return value.length;
			},
	
			depend: function( param, element ) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
			},
	
			dependTypes: {
				"boolean": function( param ) {
					return param;
				},
				"string": function( param, element ) {
					return !!$( param, element.form ).length;
				},
				"function": function( param, element ) {
					return param( element );
				}
			},
	
			optional: function( element ) {
				var val = this.elementValue( element );
				return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
			},
	
			startRequest: function( element ) {
				if ( !this.pending[ element.name ] ) {
					this.pendingRequest++;
					this.pending[ element.name ] = true;
				}
			},
	
			stopRequest: function( element, valid ) {
				this.pendingRequest--;
				// sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}
				delete this.pending[ element.name ];
				if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
					$( this.currentForm ).submit();
					this.formSubmitted = false;
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
					this.formSubmitted = false;
				}
			},
	
			previousValue: function( element ) {
				return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage( element, "remote" )
				});
			},
	
			// cleans up all forms and elements, removes validator-specific events
			destroy: function() {
				this.resetForm();
	
				$( this.currentForm )
					.off( ".validate" )
					.removeData( "validator" );
			}
	
		},
	
		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			number: { number: true },
			digits: { digits: true },
			creditcard: { creditcard: true }
		},
	
		addClassRules: function( className, rules ) {
			if ( className.constructor === String ) {
				this.classRuleSettings[ className ] = rules;
			} else {
				$.extend( this.classRuleSettings, className );
			}
		},
	
		classRules: function( element ) {
			var rules = {},
				classes = $( element ).attr( "class" );
	
			if ( classes ) {
				$.each( classes.split( " " ), function() {
					if ( this in $.validator.classRuleSettings ) {
						$.extend( rules, $.validator.classRuleSettings[ this ]);
					}
				});
			}
			return rules;
		},
	
		normalizeAttributeRule: function( rules, type, method, value ) {
	
			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );
	
				// Support Opera Mini, which returns NaN for undefined minlength
				if ( isNaN( value ) ) {
					value = undefined;
				}
			}
	
			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {
	
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		},
	
		attributeRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;
	
			for ( method in $.validator.methods ) {
	
				// support for <input required> in both html5 and older browsers
				if ( method === "required" ) {
					value = element.getAttribute( method );
	
					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if ( value === "" ) {
						value = true;
					}
	
					// force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr( method );
				}
	
				this.normalizeAttributeRule( rules, type, method, value );
			}
	
			// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
				delete rules.maxlength;
			}
	
			return rules;
		},
	
		dataRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;
	
			for ( method in $.validator.methods ) {
				value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
				this.normalizeAttributeRule( rules, type, method, value );
			}
			return rules;
		},
	
		staticRules: function( element ) {
			var rules = {},
				validator = $.data( element.form, "validator" );
	
			if ( validator.settings.rules ) {
				rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
			}
			return rules;
		},
	
		normalizeRules: function( rules, element ) {
			// handle dependency check
			$.each( rules, function( prop, val ) {
				// ignore rule when param is explicitly false, eg. required:false
				if ( val === false ) {
					delete rules[ prop ];
					return;
				}
				if ( val.param || val.depends ) {
					var keepRule = true;
					switch ( typeof val.depends ) {
					case "string":
						keepRule = !!$( val.depends, element.form ).length;
						break;
					case "function":
						keepRule = val.depends.call( element, element );
						break;
					}
					if ( keepRule ) {
						rules[ prop ] = val.param !== undefined ? val.param : true;
					} else {
						delete rules[ prop ];
					}
				}
			});
	
			// evaluate parameters
			$.each( rules, function( rule, parameter ) {
				rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
			});
	
			// clean number parameters
			$.each([ "minlength", "maxlength" ], function() {
				if ( rules[ this ] ) {
					rules[ this ] = Number( rules[ this ] );
				}
			});
			$.each([ "rangelength", "range" ], function() {
				var parts;
				if ( rules[ this ] ) {
					if ( $.isArray( rules[ this ] ) ) {
						rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
					} else if ( typeof rules[ this ] === "string" ) {
						parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
						rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
					}
				}
			});
	
			if ( $.validator.autoCreateRanges ) {
				// auto-create ranges
				if ( rules.min != null && rules.max != null ) {
					rules.range = [ rules.min, rules.max ];
					delete rules.min;
					delete rules.max;
				}
				if ( rules.minlength != null && rules.maxlength != null ) {
					rules.rangelength = [ rules.minlength, rules.maxlength ];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}
	
			return rules;
		},
	
		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function( data ) {
			if ( typeof data === "string" ) {
				var transformed = {};
				$.each( data.split( /\s/ ), function() {
					transformed[ this ] = true;
				});
				data = transformed;
			}
			return data;
		},
	
		// http://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod: function( name, method, message ) {
			$.validator.methods[ name ] = method;
			$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
			if ( method.length < 3 ) {
				$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
			}
		},
	
		methods: {
	
			// http://jqueryvalidation.org/required-method/
			required: function( value, element, param ) {
				// check if dependency is met
				if ( !this.depend( param, element ) ) {
					return "dependency-mismatch";
				}
				if ( element.nodeName.toLowerCase() === "select" ) {
					// could be an array for select-multiple or a string, both are fine this way
					var val = $( element ).val();
					return val && val.length > 0;
				}
				if ( this.checkable( element ) ) {
					return this.getLength( value, element ) > 0;
				}
				return value.length > 0;
			},
	
			// http://jqueryvalidation.org/email-method/
			email: function( value, element ) {
				// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
			},
	
			// http://jqueryvalidation.org/url-method/
			url: function( value, element ) {
	
				// Copyright (c) 2010-2013 Diego Perini, MIT licensed
				// https://gist.github.com/dperini/729294
				// see also https://mathiasbynens.be/demo/url-regex
				// modified to allow protocol-relative URLs
				return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
			},
	
			// http://jqueryvalidation.org/date-method/
			date: function( value, element ) {
				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			},
	
			// http://jqueryvalidation.org/dateISO-method/
			dateISO: function( value, element ) {
				return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
			},
	
			// http://jqueryvalidation.org/number-method/
			number: function( value, element ) {
				return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
			},
	
			// http://jqueryvalidation.org/digits-method/
			digits: function( value, element ) {
				return this.optional( element ) || /^\d+$/.test( value );
			},
	
			// http://jqueryvalidation.org/creditcard-method/
			// based on http://en.wikipedia.org/wiki/Luhn_algorithm
			creditcard: function( value, element ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}
				// accept only spaces, digits and dashes
				if ( /[^0-9 \-]+/.test( value ) ) {
					return false;
				}
				var nCheck = 0,
					nDigit = 0,
					bEven = false,
					n, cDigit;
	
				value = value.replace( /\D/g, "" );
	
				// Basing min and max length on
				// http://developer.ean.com/general_info/Valid_Credit_Card_Types
				if ( value.length < 13 || value.length > 19 ) {
					return false;
				}
	
				for ( n = value.length - 1; n >= 0; n--) {
					cDigit = value.charAt( n );
					nDigit = parseInt( cDigit, 10 );
					if ( bEven ) {
						if ( ( nDigit *= 2 ) > 9 ) {
							nDigit -= 9;
						}
					}
					nCheck += nDigit;
					bEven = !bEven;
				}
	
				return ( nCheck % 10 ) === 0;
			},
	
			// http://jqueryvalidation.org/minlength-method/
			minlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length >= param;
			},
	
			// http://jqueryvalidation.org/maxlength-method/
			maxlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length <= param;
			},
	
			// http://jqueryvalidation.org/rangelength-method/
			rangelength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
			},
	
			// http://jqueryvalidation.org/min-method/
			min: function( value, element, param ) {
				return this.optional( element ) || value >= param;
			},
	
			// http://jqueryvalidation.org/max-method/
			max: function( value, element, param ) {
				return this.optional( element ) || value <= param;
			},
	
			// http://jqueryvalidation.org/range-method/
			range: function( value, element, param ) {
				return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
			},
	
			// http://jqueryvalidation.org/equalTo-method/
			equalTo: function( value, element, param ) {
				// bind to the blur event of the target in order to revalidate whenever the target field is updated
				// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
				var target = $( param );
				if ( this.settings.onfocusout ) {
					target.off( ".validate-equalTo" ).on( "blur.validate-equalTo", function() {
						$( element ).valid();
					});
				}
				return value === target.val();
			},
	
			// http://jqueryvalidation.org/remote-method/
			remote: function( value, element, param ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}
	
				var previous = this.previousValue( element ),
					validator, data;
	
				if (!this.settings.messages[ element.name ] ) {
					this.settings.messages[ element.name ] = {};
				}
				previous.originalMessage = this.settings.messages[ element.name ].remote;
				this.settings.messages[ element.name ].remote = previous.message;
	
				param = typeof param === "string" && { url: param } || param;
	
				if ( previous.old === value ) {
					return previous.valid;
				}
	
				previous.old = value;
				validator = this;
				this.startRequest( element );
				data = {};
				data[ element.name ] = value;
				$.ajax( $.extend( true, {
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function( response ) {
						var valid = response === true || response === "true",
							errors, message, submitted;
	
						validator.settings.messages[ element.name ].remote = previous.originalMessage;
						if ( valid ) {
							submitted = validator.formSubmitted;
							validator.prepareElement( element );
							validator.formSubmitted = submitted;
							validator.successList.push( element );
							delete validator.invalid[ element.name ];
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage( element, "remote" );
							errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
							validator.invalid[ element.name ] = true;
							validator.showErrors( errors );
						}
						previous.valid = valid;
						validator.stopRequest( element, valid );
					}
				}, param ) );
				return "pending";
			}
		}
	
	});
	
	// ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
	
	var pendingRequests = {},
		ajax;
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}
	
	}));

/***/ },
/* 35 */
/*!*********************************************************!*\
  !*** ../~/jquery-serializejson/jquery.serializejson.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  SerializeJSON jQuery plugin.
	  https://github.com/marioizquierdo/jquery.serializeJSON
	  version 2.6.2 (May, 2015)
	
	  Copyright (c) 2012, 2015 Mario Izquierdo
	  Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
	  and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	*/
	(function (factory) {
	  if (true) { // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ 29)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') { // Node/CommonJS
	    var jQuery = require('jquery');
	    module.exports = factory(jQuery);
	  } else { // Browser globals (zepto supported)
	    factory(window.jQuery || window.Zepto || window.$); // Zepto supported on browsers as well
	  }
	
	}(function ($) {
	  "use strict";
	
	  // jQuery('form').serializeJSON()
	  $.fn.serializeJSON = function (options) {
	    var serializedObject, formAsArray, keys, type, value, _ref, f, opts;
	    f = $.serializeJSON;
	    opts = f.setupOpts(options); // calculate values for options {parseNumbers, parseBoolens, parseNulls}
	    formAsArray = this.serializeArray(); // array of objects {name, value}
	    f.readCheckboxUncheckedValues(formAsArray, this, opts); // add {name, value} of unchecked checkboxes if needed
	
	    serializedObject = {};
	    $.each(formAsArray, function (i, input) {
	      keys = f.splitInputNameIntoKeysArray(input.name, opts);
	      type = keys.pop(); // the last element is always the type ("string" by default)
	      if (type !== 'skip') { // easy way to skip a value
	        value = f.parseValue(input.value, type, opts); // string, number, boolean or null
	        if (opts.parseWithFunction && type === '_') { // allow for custom parsing
	          value = opts.parseWithFunction(value, input.name);
	        }
	        f.deepSet(serializedObject, keys, value, opts);
	      }
	    });
	    return serializedObject;
	  };
	
	  // Use $.serializeJSON as namespace for the auxiliar functions
	  // and to define defaults
	  $.serializeJSON = {
	
	    defaultOptions: {
	      checkboxUncheckedValue: undefined, // to include that value for unchecked checkboxes (instead of ignoring them)
	
	      parseNumbers: false, // convert values like "1", "-2.33" to 1, -2.33
	      parseBooleans: false, // convert "true", "false" to true, false
	      parseNulls: false, // convert "null" to null
	      parseAll: false, // all of the above
	      parseWithFunction: null, // to use custom parser, a function like: function(val){ return parsed_val; }
	
	      customTypes: {}, // override defaultTypes
	      defaultTypes: {
	        "string":  function(str) { return String(str); },
	        "number":  function(str) { return Number(str); },
	        "boolean": function(str) { var falses = ["false", "null", "undefined", "", "0"]; return falses.indexOf(str) === -1; },
	        "null":    function(str) { var falses = ["false", "null", "undefined", "", "0"]; return falses.indexOf(str) === -1 ? str : null; },
	        "array":   function(str) { return JSON.parse(str); },
	        "object":  function(str) { return JSON.parse(str); },
	        "auto":    function(str) { return $.serializeJSON.parseValue(str, null, {parseNumbers: true, parseBooleans: true, parseNulls: true}); } // try again with something like "parseAll"
	      },
	
	      useIntKeysAsArrayIndex: false // name="foo[2]" value="v" => {foo: [null, null, "v"]}, instead of {foo: ["2": "v"]}
	    },
	
	    // Merge option defaults into the options
	    setupOpts: function(options) {
	      var opt, validOpts, defaultOptions, optWithDefault, parseAll, f;
	      f = $.serializeJSON;
	
	      if (options == null) { options = {}; }   // options ||= {}
	      defaultOptions = f.defaultOptions || {}; // defaultOptions
	
	      // Make sure that the user didn't misspell an option
	      validOpts = ['checkboxUncheckedValue', 'parseNumbers', 'parseBooleans', 'parseNulls', 'parseAll', 'parseWithFunction', 'customTypes', 'defaultTypes', 'useIntKeysAsArrayIndex']; // re-define because the user may override the defaultOptions
	      for (opt in options) {
	        if (validOpts.indexOf(opt) === -1) {
	          throw new  Error("serializeJSON ERROR: invalid option '" + opt + "'. Please use one of " + validOpts.join(', '));
	        }
	      }
	
	      // Helper to get the default value for this option if none is specified by the user
	      optWithDefault = function(key) { return (options[key] !== false) && (options[key] !== '') && (options[key] || defaultOptions[key]); };
	
	      // Return computed options (opts to be used in the rest of the script)
	      parseAll = optWithDefault('parseAll');
	      return {
	        checkboxUncheckedValue:    optWithDefault('checkboxUncheckedValue'),
	
	        parseNumbers:  parseAll || optWithDefault('parseNumbers'),
	        parseBooleans: parseAll || optWithDefault('parseBooleans'),
	        parseNulls:    parseAll || optWithDefault('parseNulls'),
	        parseWithFunction:         optWithDefault('parseWithFunction'),
	
	        typeFunctions: $.extend({}, optWithDefault('defaultTypes'), optWithDefault('customTypes')),
	
	        useIntKeysAsArrayIndex: optWithDefault('useIntKeysAsArrayIndex')
	      };
	    },
	
	    // Given a string, apply the type or the relevant "parse" options, to return the parsed value
	    parseValue: function(str, type, opts) {
	      var typeFunction, f;
	      f = $.serializeJSON;
	
	      // Parse with a type if available
	      typeFunction = opts.typeFunctions && opts.typeFunctions[type];
	      if (typeFunction) { return typeFunction(str); } // use specific type
	
	      // Otherwise, check if there is any auto-parse option enabled and use it.
	      if (opts.parseNumbers  && f.isNumeric(str)) { return Number(str); } // auto: number
	      if (opts.parseBooleans && (str === "true" || str === "false")) { return str === "true"; } // auto: boolean
	      if (opts.parseNulls    && str == "null") { return null; } // auto: null
	
	      // If none applies, just return the str
	      return str;
	    },
	
	    isObject:          function(obj) { return obj === Object(obj); }, // is it an Object?
	    isUndefined:       function(obj) { return obj === void 0; }, // safe check for undefined values
	    isValidArrayIndex: function(val) { return /^[0-9]+$/.test(String(val)); }, // 1,2,3,4 ... are valid array indexes
	    isNumeric:         function(obj) { return obj - parseFloat(obj) >= 0; }, // taken from jQuery.isNumeric implementation. Not using jQuery.isNumeric to support old jQuery and Zepto versions
	
	    optionKeys: function(obj) { if (Object.keys) { return Object.keys(obj); } else { var key, keys = []; for(key in obj){ keys.push(key); } return keys;} }, // polyfill Object.keys to get option keys in IE<9
	
	    // Split the input name in programatically readable keys.
	    // The last element is always the type (default "_").
	    // Examples:
	    // "foo"              => ['foo', '_']
	    // "foo:string"       => ['foo', 'string']
	    // "foo:boolean"      => ['foo', 'boolean']
	    // "[foo]"            => ['foo', '_']
	    // "foo[inn][bar]"    => ['foo', 'inn', 'bar', '_']
	    // "foo[inn[bar]]"    => ['foo', 'inn', 'bar', '_']
	    // "foo[inn][arr][0]" => ['foo', 'inn', 'arr', '0', '_']
	    // "arr[][val]"       => ['arr', '', 'val', '_']
	    // "arr[][val]:null"  => ['arr', '', 'val', 'null']
	    splitInputNameIntoKeysArray: function(name, opts) {
	      var keys, nameWithoutType, type, _ref, f;
	      f = $.serializeJSON;
	      _ref = f.extractTypeFromInputName(name, opts); nameWithoutType = _ref[0]; type = _ref[1];
	      keys = nameWithoutType.split('['); // split string into array
	      keys = $.map(keys, function (key) { return key.replace(/\]/g, ''); }); // remove closing brackets
	      if (keys[0] === '') { keys.shift(); } // ensure no opening bracket ("[foo][inn]" should be same as "foo[inn]")
	      keys.push(type); // add type at the end
	      return keys;
	    },
	
	    // Returns [name-without-type, type] from name.
	    // "foo"              =>  ["foo",      '_']
	    // "foo:boolean"      =>  ["foo",      'boolean']
	    // "foo[bar]:null"    =>  ["foo[bar]", 'null']
	    extractTypeFromInputName: function(name, opts) {
	      var match, validTypes, f;
	      if (match = name.match(/(.*):([^:]+)$/)){
	        f = $.serializeJSON;
	
	        validTypes = f.optionKeys(opts ? opts.typeFunctions : f.defaultOptions.defaultTypes);
	        validTypes.push('skip'); // skip is a special type that makes it easy to remove
	        if (validTypes.indexOf(match[2]) !== -1) {
	          return [match[1], match[2]];
	        } else {
	          throw new Error("serializeJSON ERROR: Invalid type " + match[2] + " found in input name '" + name + "', please use one of " + validTypes.join(', '));
	        }
	      } else {
	        return [name, '_']; // no defined type, then use parse options
	      }
	    },
	
	    // Set a value in an object or array, using multiple keys to set in a nested object or array:
	    //
	    // deepSet(obj, ['foo'], v)               // obj['foo'] = v
	    // deepSet(obj, ['foo', 'inn'], v)        // obj['foo']['inn'] = v // Create the inner obj['foo'] object, if needed
	    // deepSet(obj, ['foo', 'inn', '123'], v) // obj['foo']['arr']['123'] = v //
	    //
	    // deepSet(obj, ['0'], v)                                   // obj['0'] = v
	    // deepSet(arr, ['0'], v, {useIntKeysAsArrayIndex: true})   // arr[0] = v
	    // deepSet(arr, [''], v)                                    // arr.push(v)
	    // deepSet(obj, ['arr', ''], v)                             // obj['arr'].push(v)
	    //
	    // arr = [];
	    // deepSet(arr, ['', v]          // arr => [v]
	    // deepSet(arr, ['', 'foo'], v)  // arr => [v, {foo: v}]
	    // deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}]
	    // deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}, {bar: v}]
	    //
	    deepSet: function (o, keys, value, opts) {
	      var key, nextKey, tail, lastIdx, lastVal, f;
	      if (opts == null) { opts = {}; }
	      f = $.serializeJSON;
	      if (f.isUndefined(o)) { throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined"); }
	      if (!keys || keys.length === 0) { throw new Error("ArgumentError: param 'keys' expected to be an array with least one element"); }
	
	      key = keys[0];
	
	      // Only one key, then it's not a deepSet, just assign the value.
	      if (keys.length === 1) {
	        if (key === '') {
	          o.push(value); // '' is used to push values into the array (assume o is an array)
	        } else {
	          o[key] = value; // other keys can be used as object keys or array indexes
	        }
	
	      // With more keys is a deepSet. Apply recursively.
	      } else {
	        nextKey = keys[1];
	
	        // '' is used to push values into the array,
	        // with nextKey, set the value into the same object, in object[nextKey].
	        // Covers the case of ['', 'foo'] and ['', 'var'] to push the object {foo, var}, and the case of nested arrays.
	        if (key === '') {
	          lastIdx = o.length - 1; // asume o is array
	          lastVal = o[lastIdx];
	          if (f.isObject(lastVal) && (f.isUndefined(lastVal[nextKey]) || keys.length > 2)) { // if nextKey is not present in the last object element, or there are more keys to deep set
	            key = lastIdx; // then set the new value in the same object element
	          } else {
	            key = lastIdx + 1; // otherwise, point to set the next index in the array
	          }
	        }
	
	        // '' is used to push values into the array "array[]"
	        if (nextKey === '') {
	          if (f.isUndefined(o[key]) || !$.isArray(o[key])) {
	            o[key] = []; // define (or override) as array to push values
	          }
	        } else {
	          if (opts.useIntKeysAsArrayIndex && f.isValidArrayIndex(nextKey)) { // if 1, 2, 3 ... then use an array, where nextKey is the index
	            if (f.isUndefined(o[key]) || !$.isArray(o[key])) {
	              o[key] = []; // define (or override) as array, to insert values using int keys as array indexes
	            }
	          } else { // for anything else, use an object, where nextKey is going to be the attribute name
	            if (f.isUndefined(o[key]) || !f.isObject(o[key])) {
	              o[key] = {}; // define (or override) as object, to set nested properties
	            }
	          }
	        }
	
	        // Recursively set the inner object
	        tail = keys.slice(1);
	        f.deepSet(o[key], tail, value, opts);
	      }
	    },
	
	    // Fill the formAsArray object with values for the unchecked checkbox inputs,
	    // using the same format as the jquery.serializeArray function.
	    // The value of the unchecked values is determined from the opts.checkboxUncheckedValue
	    // and/or the data-unchecked-value attribute of the inputs.
	    readCheckboxUncheckedValues: function (formAsArray, $form, opts) {
	      var selector, $uncheckedCheckboxes, $el, dataUncheckedValue, f;
	      if (opts == null) { opts = {}; }
	      f = $.serializeJSON;
	
	      selector = 'input[type=checkbox][name]:not(:checked):not([disabled])';
	      $uncheckedCheckboxes = $form.find(selector).add($form.filter(selector));
	      $uncheckedCheckboxes.each(function (i, el) {
	        $el = $(el);
	        dataUncheckedValue = $el.attr('data-unchecked-value');
	        if(dataUncheckedValue) { // data-unchecked-value has precedence over option opts.checkboxUncheckedValue
	          formAsArray.push({name: el.name, value: dataUncheckedValue});
	        } else {
	          if (!f.isUndefined(opts.checkboxUncheckedValue)) {
	            formAsArray.push({name: el.name, value: opts.checkboxUncheckedValue});
	          }
	        }
	      });
	    }
	
	  };
	
	}));


/***/ },
/* 36 */,
/* 37 */
/*!*****************************************!*\
  !*** ./views/admin/recordingAddEdit.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-ui/datepicker */ 38);
	
	var _ = __webpack_require__(/*! underscore */ 31);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    id: "recordingEditContent",
	    className: "addOrEditPanel",
	
	    initialize: function(options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.set("artistOptions", adminApp.collections.artists.toJSON(), {silent: true});
	        this.model.bind('change', this.render, this);
	    },
	
	    updateSelect: function () {
	        var selectedArtistValue = parseInt(this.model.get("actID"));
	        this.$el.find("select[name=actID]")
	            .find("option[value=" + selectedArtistValue + "]")
	            .attr("selected", true);
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	        this.$el.find(".datepicker").datepicker({
	            changeMonth: true,
	            changeYear: true
	        });
	        this.updateSelect();
	        return this;
	    }
	});

/***/ },
/* 38 */
/*!************************************!*\
  !*** ../~/jquery-ui/datepicker.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var jQuery = __webpack_require__(/*! jquery */ 29);
	__webpack_require__(/*! ./core */ 39);
	
	/*!
	 * jQuery UI Datepicker 1.10.4
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/datepicker/
	 *
	 * Depends:
	 *	jquery.ui.core.js
	 */
	(function( $, undefined ) {
	
	$.extend($.ui, { datepicker: { version: "1.10.4" } });
	
	var PROP_NAME = "datepicker",
		instActive;
	
	/* Date picker manager.
	   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
	   Settings for (groups of) date pickers are maintained in an instance object,
	   allowing multiple different settings on the same page. */
	
	function Datepicker() {
		this._curInst = null; // The current instance in use
		this._keyEvent = false; // If the last event was a key event
		this._disabledInputs = []; // List of date picker inputs that have been disabled
		this._datepickerShowing = false; // True if the popup picker is showing , false if not
		this._inDialog = false; // True if showing within a "dialog", false if not
		this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
		this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
		this._appendClass = "ui-datepicker-append"; // The name of the append marker class
		this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
		this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
		this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
		this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
		this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
		this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
		this.regional = []; // Available regional settings, indexed by language code
		this.regional[""] = { // Default regional settings
			closeText: "Done", // Display text for close link
			prevText: "Prev", // Display text for previous month link
			nextText: "Next", // Display text for next month link
			currentText: "Today", // Display text for current month link
			monthNames: ["January","February","March","April","May","June",
				"July","August","September","October","November","December"], // Names of months for drop-down and formatting
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
			dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
			weekHeader: "Wk", // Column header for week of the year
			dateFormat: "mm/dd/yy", // See format options on parseDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear: false, // True if the year select precedes month, false for month then year
			yearSuffix: "" // Additional text to append to the year in the month headers
		};
		this._defaults = { // Global defaults for all the date picker instances
			showOn: "focus", // "focus" for popup on focus,
				// "button" for trigger button, or "both" for either
			showAnim: "fadeIn", // Name of jQuery animation for popup
			showOptions: {}, // Options for enhanced animations
			defaultDate: null, // Used when field is blank: actual date,
				// +/-number for offset from today, null for today
			appendText: "", // Display text following the input box, e.g. showing the format
			buttonText: "...", // Text for trigger button
			buttonImage: "", // URL for trigger button image
			buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext: false, // True to hide next/previous month links
				// if not applicable, false to just disable them
			navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
			gotoCurrent: false, // True if today link goes back to current selection instead
			changeMonth: false, // True if month can be selected directly, false if only prev/next
			changeYear: false, // True if year can be selected directly, false if only prev/next
			yearRange: "c-10:c+10", // Range of years to display in drop-down,
				// either relative to today's year (-nn:+nn), relative to currently displayed year
				// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths: false, // True to show dates in other months, false to leave blank
			selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
			showWeek: false, // True to show week of the year, false to not show it
			calculateWeek: this.iso8601Week, // How to calculate the week of the year,
				// takes a Date and returns the number of the week for it
			shortYearCutoff: "+10", // Short year values < this are in the current century,
				// > this are in the previous century,
				// string value starting with "+" for current year + value
			minDate: null, // The earliest selectable date, or null for no limit
			maxDate: null, // The latest selectable date, or null for no limit
			duration: "fast", // Duration of display/closure
			beforeShowDay: null, // Function that takes a date and returns an array with
				// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
				// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow: null, // Function that takes an input field and
				// returns a set of custom settings for the date picker
			onSelect: null, // Define a callback function when a date is selected
			onChangeMonthYear: null, // Define a callback function when the month or year is changed
			onClose: null, // Define a callback function when the datepicker is closed
			numberOfMonths: 1, // Number of months to show at a time
			showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths: 1, // Number of months to step back/forward
			stepBigMonths: 12, // Number of months to step back/forward for the big links
			altField: "", // Selector for an alternate field to store selected dates into
			altFormat: "", // The date format to use for the alternate field
			constrainInput: true, // The input is constrained by the current date format
			showButtonPanel: false, // True to show button panel, false to not show it
			autoSize: false, // True to size the input for the date format, false to leave as is
			disabled: false // The initial disabled state
		};
		$.extend(this._defaults, this.regional[""]);
		this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
	}
	
	$.extend(Datepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName: "hasDatepicker",
	
		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows: 4,
	
		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker: function() {
			return this.dpDiv;
		},
	
		/* Override the default settings for all instances of the date picker.
		 * @param  settings  object - the new settings to use as defaults (anonymous object)
		 * @return the manager object
		 */
		setDefaults: function(settings) {
			extendRemove(this._defaults, settings || {});
			return this;
		},
	
		/* Attach the date picker to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
		 */
		_attachDatepicker: function(target, settings) {
			var nodeName, inline, inst;
			nodeName = target.nodeName.toLowerCase();
			inline = (nodeName === "div" || nodeName === "span");
			if (!target.id) {
				this.uuid += 1;
				target.id = "dp" + this.uuid;
			}
			inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {});
			if (nodeName === "input") {
				this._connectDatepicker(target, inst);
			} else if (inline) {
				this._inlineDatepicker(target, inst);
			}
		},
	
		/* Create a new instance object. */
		_newInst: function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
			return {id: id, input: target, // associated target
				selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
				drawMonth: 0, drawYear: 0, // month being drawn
				inline: inline, // is datepicker inline or not
				dpDiv: (!inline ? this.dpDiv : // presentation div
				bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};
		},
	
		/* Attach the date picker to an input field. */
		_connectDatepicker: function(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if (input.hasClass(this.markerClassName)) {
				return;
			}
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).
				keypress(this._doKeyPress).keyup(this._doKeyUp);
			this._autoSize(inst);
			$.data(target, PROP_NAME, inst);
			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
		},
	
		/* Make attachments based on settings. */
		_attachments: function(input, inst) {
			var showOn, buttonText, buttonImage,
				appendText = this._get(inst, "appendText"),
				isRTL = this._get(inst, "isRTL");
	
			if (inst.append) {
				inst.append.remove();
			}
			if (appendText) {
				inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
				input[isRTL ? "before" : "after"](inst.append);
			}
	
			input.unbind("focus", this._showDatepicker);
	
			if (inst.trigger) {
				inst.trigger.remove();
			}
	
			showOn = this._get(inst, "showOn");
			if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
				input.focus(this._showDatepicker);
			}
			if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
				buttonText = this._get(inst, "buttonText");
				buttonImage = this._get(inst, "buttonImage");
				inst.trigger = $(this._get(inst, "buttonImageOnly") ?
					$("<img/>").addClass(this._triggerClass).
						attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
					$("<button type='button'></button>").addClass(this._triggerClass).
						html(!buttonImage ? buttonText : $("<img/>").attr(
						{ src:buttonImage, alt:buttonText, title:buttonText })));
				input[isRTL ? "before" : "after"](inst.trigger);
				inst.trigger.click(function() {
					if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
						$.datepicker._hideDatepicker();
					} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker(input[0]);
					} else {
						$.datepicker._showDatepicker(input[0]);
					}
					return false;
				});
			}
		},
	
		/* Apply the maximum length for the date format. */
		_autoSize: function(inst) {
			if (this._get(inst, "autoSize") && !inst.inline) {
				var findMax, max, maxI, i,
					date = new Date(2009, 12 - 1, 20), // Ensure double digits
					dateFormat = this._get(inst, "dateFormat");
	
				if (dateFormat.match(/[DM]/)) {
					findMax = function(names) {
						max = 0;
						maxI = 0;
						for (i = 0; i < names.length; i++) {
							if (names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
						"monthNames" : "monthNamesShort"))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
						"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
				}
				inst.input.attr("size", this._formatDate(inst, date).length);
			}
		},
	
		/* Attach an inline date picker to a div. */
		_inlineDatepicker: function(target, inst) {
			var divSpan = $(target);
			if (divSpan.hasClass(this.markerClassName)) {
				return;
			}
			divSpan.addClass(this.markerClassName).append(inst.dpDiv);
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css( "display", "block" );
		},
	
		/* Pop-up the date picker in a "dialog" box.
		 * @param  input element - ignored
		 * @param  date	string or Date - the initial date to display
		 * @param  onSelect  function - the function to call when a date is selected
		 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
		 * @param  pos int[2] - coordinates for the dialog's position within the screen or
		 *					event - with x/y coordinates or
		 *					leave empty for default (screen centre)
		 * @return the manager object
		 */
		_dialogDatepicker: function(input, date, onSelect, settings, pos) {
			var id, browserWidth, browserHeight, scrollX, scrollY,
				inst = this._dialogInst; // internal instance
	
			if (!inst) {
				this.uuid += 1;
				id = "dp" + this.uuid;
				this._dialogInput = $("<input type='text' id='" + id +
					"' style='position: absolute; top: -100px; width: 0px;'/>");
				this._dialogInput.keydown(this._doKeyDown);
				$("body").append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst);
			}
			extendRemove(inst.settings, settings || {});
			date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);
	
			this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if (!this._pos) {
				browserWidth = document.documentElement.clientWidth;
				browserHeight = document.documentElement.clientHeight;
				scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
					[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
			}
	
			// move input on screen for focus, but hidden behind dialog
			this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if ($.blockUI) {
				$.blockUI(this.dpDiv);
			}
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this;
		},
	
		/* Detach a datepicker from its control.
		 * @param  target	element - the target input field or division or span
		 */
		_destroyDatepicker: function(target) {
			var nodeName,
				$target = $(target),
				inst = $.data(target, PROP_NAME);
	
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
	
			nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if (nodeName === "input") {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).
					unbind("focus", this._showDatepicker).
					unbind("keydown", this._doKeyDown).
					unbind("keypress", this._doKeyPress).
					unbind("keyup", this._doKeyUp);
			} else if (nodeName === "div" || nodeName === "span") {
				$target.removeClass(this.markerClassName).empty();
			}
		},
	
		/* Enable the date picker to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 */
		_enableDatepicker: function(target) {
			var nodeName, inline,
				$target = $(target),
				inst = $.data(target, PROP_NAME);
	
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
	
			nodeName = target.nodeName.toLowerCase();
			if (nodeName === "input") {
				target.disabled = false;
				inst.trigger.filter("button").
					each(function() { this.disabled = false; }).end().
					filter("img").css({opacity: "1.0", cursor: ""});
			} else if (nodeName === "div" || nodeName === "span") {
				inline = $target.children("." + this._inlineClass);
				inline.children().removeClass("ui-state-disabled");
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
					prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value === target ? null : value); }); // delete entry
		},
	
		/* Disable the date picker to a jQuery selection.
		 * @param  target	element - the target input field or division or span
		 */
		_disableDatepicker: function(target) {
			var nodeName, inline,
				$target = $(target),
				inst = $.data(target, PROP_NAME);
	
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
	
			nodeName = target.nodeName.toLowerCase();
			if (nodeName === "input") {
				target.disabled = true;
				inst.trigger.filter("button").
					each(function() { this.disabled = true; }).end().
					filter("img").css({opacity: "0.5", cursor: "default"});
			} else if (nodeName === "div" || nodeName === "span") {
				inline = $target.children("." + this._inlineClass);
				inline.children().addClass("ui-state-disabled");
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
					prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value === target ? null : value); }); // delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},
	
		/* Is the first field in a jQuery collection disabled as a datepicker?
		 * @param  target	element - the target input field or division or span
		 * @return boolean - true if disabled, false if enabled
		 */
		_isDisabledDatepicker: function(target) {
			if (!target) {
				return false;
			}
			for (var i = 0; i < this._disabledInputs.length; i++) {
				if (this._disabledInputs[i] === target) {
					return true;
				}
			}
			return false;
		},
	
		/* Retrieve the instance data for the target control.
		 * @param  target  element - the target input field or division or span
		 * @return  object - the associated instance data
		 * @throws  error if a jQuery problem getting data
		 */
		_getInst: function(target) {
			try {
				return $.data(target, PROP_NAME);
			}
			catch (err) {
				throw "Missing instance data for this datepicker";
			}
		},
	
		/* Update or retrieve the settings for a date picker attached to an input field or division.
		 * @param  target  element - the target input field or division or span
		 * @param  name	object - the new settings to update or
		 *				string - the name of the setting to change or retrieve,
		 *				when retrieving also "all" for all instance settings or
		 *				"defaults" for all global defaults
		 * @param  value   any - the new value for the setting
		 *				(omit if above is an object or to retrieve a value)
		 */
		_optionDatepicker: function(target, name, value) {
			var settings, date, minDate, maxDate,
				inst = this._getInst(target);
	
			if (arguments.length === 2 && typeof name === "string") {
				return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :
					(inst ? (name === "all" ? $.extend({}, inst.settings) :
					this._get(inst, name)) : null));
			}
	
			settings = name || {};
			if (typeof name === "string") {
				settings = {};
				settings[name] = value;
			}
	
			if (inst) {
				if (this._curInst === inst) {
					this._hideDatepicker();
				}
	
				date = this._getDateDatepicker(target, true);
				minDate = this._getMinMaxDate(inst, "min");
				maxDate = this._getMinMaxDate(inst, "max");
				extendRemove(inst.settings, settings);
				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
					inst.settings.minDate = this._formatDate(inst, minDate);
				}
				if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				}
				if ( "disabled" in settings ) {
					if ( settings.disabled ) {
						this._disableDatepicker(target);
					} else {
						this._enableDatepicker(target);
					}
				}
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatepicker(inst);
			}
		},
	
		// change method deprecated
		_changeDatepicker: function(target, name, value) {
			this._optionDatepicker(target, name, value);
		},
	
		/* Redraw the date picker attached to an input field or division.
		 * @param  target  element - the target input field or division or span
		 */
		_refreshDatepicker: function(target) {
			var inst = this._getInst(target);
			if (inst) {
				this._updateDatepicker(inst);
			}
		},
	
		/* Set the dates for a jQuery selection.
		 * @param  target element - the target input field or division or span
		 * @param  date	Date - the new date
		 */
		_setDateDatepicker: function(target, date) {
			var inst = this._getInst(target);
			if (inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst);
			}
		},
	
		/* Get the date(s) for the first entry in a jQuery selection.
		 * @param  target element - the target input field or division or span
		 * @param  noDefault boolean - true if no default date is to be used
		 * @return Date - the current date
		 */
		_getDateDatepicker: function(target, noDefault) {
			var inst = this._getInst(target);
			if (inst && !inst.inline) {
				this._setDateFromField(inst, noDefault);
			}
			return (inst ? this._getDate(inst) : null);
		},
	
		/* Handle keystrokes. */
		_doKeyDown: function(event) {
			var onSelect, dateStr, sel,
				inst = $.datepicker._getInst(event.target),
				handled = true,
				isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
	
			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing) {
				switch (event.keyCode) {
					case 9: $.datepicker._hideDatepicker();
							handled = false;
							break; // hide on tab out
					case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
										$.datepicker._currentClass + ")", inst.dpDiv);
							if (sel[0]) {
								$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
							}
	
							onSelect = $.datepicker._get(inst, "onSelect");
							if (onSelect) {
								dateStr = $.datepicker._formatDate(inst);
	
								// trigger custom callback
								onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
							} else {
								$.datepicker._hideDatepicker();
							}
	
							return false; // don't submit the form
					case 27: $.datepicker._hideDatepicker();
							break; // hide on escape
					case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
							break; // previous month/year on page up/+ ctrl
					case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
							break; // next month/year on page down/+ ctrl
					case 35: if (event.ctrlKey || event.metaKey) {
								$.datepicker._clearDate(event.target);
							}
							handled = event.ctrlKey || event.metaKey;
							break; // clear on ctrl or command +end
					case 36: if (event.ctrlKey || event.metaKey) {
								$.datepicker._gotoToday(event.target);
							}
							handled = event.ctrlKey || event.metaKey;
							break; // current on ctrl or command +home
					case 37: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
							}
							handled = event.ctrlKey || event.metaKey;
							// -1 day on ctrl or command +left
							if (event.originalEvent.altKey) {
								$.datepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.datepicker._get(inst, "stepBigMonths") :
									-$.datepicker._get(inst, "stepMonths")), "M");
							}
							// next month/year on alt +left on Mac
							break;
					case 38: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, -7, "D");
							}
							handled = event.ctrlKey || event.metaKey;
							break; // -1 week on ctrl or command +up
					case 39: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
							}
							handled = event.ctrlKey || event.metaKey;
							// +1 day on ctrl or command +right
							if (event.originalEvent.altKey) {
								$.datepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.datepicker._get(inst, "stepBigMonths") :
									+$.datepicker._get(inst, "stepMonths")), "M");
							}
							// next month/year on alt +right
							break;
					case 40: if (event.ctrlKey || event.metaKey) {
								$.datepicker._adjustDate(event.target, +7, "D");
							}
							handled = event.ctrlKey || event.metaKey;
							break; // +1 week on ctrl or command +down
					default: handled = false;
				}
			} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
				$.datepicker._showDatepicker(this);
			} else {
				handled = false;
			}
	
			if (handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},
	
		/* Filter entered characters - based on date format. */
		_doKeyPress: function(event) {
			var chars, chr,
				inst = $.datepicker._getInst(event.target);
	
			if ($.datepicker._get(inst, "constrainInput")) {
				chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
				chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
			}
		},
	
		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp: function(event) {
			var date,
				inst = $.datepicker._getInst(event.target);
	
			if (inst.input.val() !== inst.lastVal) {
				try {
					date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
						(inst.input ? inst.input.val() : null),
						$.datepicker._getFormatConfig(inst));
	
					if (date) { // only if valid
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst);
					}
				}
				catch (err) {
				}
			}
			return true;
		},
	
		/* Pop-up the date picker for a given input field.
		 * If false returned from beforeShow event handler do not show.
		 * @param  input  element - the input field attached to the date picker or
		 *					event - if triggered by focus
		 */
		_showDatepicker: function(input) {
			input = input.target || input;
			if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
				input = $("input", input.parentNode)[0];
			}
	
			if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
				return;
			}
	
			var inst, beforeShow, beforeShowSettings, isFixed,
				offset, showAnim, duration;
	
			inst = $.datepicker._getInst(input);
			if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
				$.datepicker._curInst.dpDiv.stop(true, true);
				if ( inst && $.datepicker._datepickerShowing ) {
					$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
				}
			}
	
			beforeShow = $.datepicker._get(inst, "beforeShow");
			beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if(beforeShowSettings === false){
				return;
			}
			extendRemove(inst.settings, beforeShowSettings);
	
			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
	
			if ($.datepicker._inDialog) { // hide cursor
				input.value = "";
			}
			if (!$.datepicker._pos) { // position below input
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight; // add the height
			}
	
			isFixed = false;
			$(input).parents().each(function() {
				isFixed |= $(this).css("position") === "fixed";
				return !isFixed;
			});
	
			offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
			$.datepicker._pos = null;
			//to avoid flashes on Firefox
			inst.dpDiv.empty();
			// determine sizing offscreen
			inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
			$.datepicker._updateDatepicker(inst);
			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
				"static" : (isFixed ? "fixed" : "absolute")), display: "none",
				left: offset.left + "px", top: offset.top + "px"});
	
			if (!inst.inline) {
				showAnim = $.datepicker._get(inst, "showAnim");
				duration = $.datepicker._get(inst, "duration");
				inst.dpDiv.zIndex($(input).zIndex()+1);
				$.datepicker._datepickerShowing = true;
	
				if ( $.effects && $.effects.effect[ showAnim ] ) {
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
				} else {
					inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
				}
	
				if ( $.datepicker._shouldFocusInput( inst ) ) {
					inst.input.focus();
				}
	
				$.datepicker._curInst = inst;
			}
		},
	
		/* Generate the date picker content. */
		_updateDatepicker: function(inst) {
			this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
			instActive = inst; // for delegate hover events
			inst.dpDiv.empty().append(this._generateHTML(inst));
			this._attachHandlers(inst);
			inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
	
			var origyearshtml,
				numMonths = this._getNumberOfMonths(inst),
				cols = numMonths[1],
				width = 17;
	
			inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			if (cols > 1) {
				inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
			}
			inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
				"Class"]("ui-datepicker-multi");
			inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
				"Class"]("ui-datepicker-rtl");
	
			if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.focus();
			}
	
			// deffered render of the years select (to avoid flashes on Firefox)
			if( inst.yearshtml ){
				origyearshtml = inst.yearshtml;
				setTimeout(function(){
					//assure that inst.yearshtml didn't change.
					if( origyearshtml === inst.yearshtml && inst.yearshtml ){
						inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},
	
		// #6694 - don't focus the input if it's already focused
		// this breaks the change event in IE
		// Support: IE and jQuery <1.9
		_shouldFocusInput: function( inst ) {
			return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
		},
	
		/* Check positioning to remain on screen. */
		_checkOffset: function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth(),
				dpHeight = inst.dpDiv.outerHeight(),
				inputWidth = inst.input ? inst.input.outerWidth() : 0,
				inputHeight = inst.input ? inst.input.outerHeight() : 0,
				viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
				viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
	
			offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
	
			// now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
				Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
				Math.abs(dpHeight + inputHeight) : 0);
	
			return offset;
		},
	
		/* Find an object's position on the screen. */
		_findPos: function(obj) {
			var position,
				inst = this._getInst(obj),
				isRTL = this._get(inst, "isRTL");
	
			while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
				obj = obj[isRTL ? "previousSibling" : "nextSibling"];
			}
	
			position = $(obj).offset();
			return [position.left, position.top];
		},
	
		/* Hide the date picker from view.
		 * @param  input  element - the input field attached to the date picker
		 */
		_hideDatepicker: function(input) {
			var showAnim, duration, postProcess, onClose,
				inst = this._curInst;
	
			if (!inst || (input && inst !== $.data(input, PROP_NAME))) {
				return;
			}
	
			if (this._datepickerShowing) {
				showAnim = this._get(inst, "showAnim");
				duration = this._get(inst, "duration");
				postProcess = function() {
					$.datepicker._tidyDialog(inst);
				};
	
				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
				} else {
					inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
						(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
				}
	
				if (!showAnim) {
					postProcess();
				}
				this._datepickerShowing = false;
	
				onClose = this._get(inst, "onClose");
				if (onClose) {
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
				}
	
				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
					if ($.blockUI) {
						$.unblockUI();
						$("body").append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},
	
		/* Tidy up after a dialog display. */
		_tidyDialog: function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
		},
	
		/* Close date picker if clicked elsewhere. */
		_checkExternalClick: function(event) {
			if (!$.datepicker._curInst) {
				return;
			}
	
			var $target = $(event.target),
				inst = $.datepicker._getInst($target[0]);
	
			if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
					$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
					!$target.hasClass($.datepicker.markerClassName) &&
					!$target.closest("." + $.datepicker._triggerClass).length &&
					$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
				( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
					$.datepicker._hideDatepicker();
			}
		},
	
		/* Adjust one of the date sub-fields. */
		_adjustDate: function(id, offset, period) {
			var target = $(id),
				inst = this._getInst(target[0]);
	
			if (this._isDisabledDatepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset +
				(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
				period);
			this._updateDatepicker(inst);
		},
	
		/* Action for current link. */
		_gotoToday: function(id) {
			var date,
				target = $(id),
				inst = this._getInst(target[0]);
	
			if (this._get(inst, "gotoCurrent") && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},
	
		/* Action for selecting a new month/year. */
		_selectMonthYear: function(id, select, period) {
			var target = $(id),
				inst = this._getInst(target[0]);
	
			inst["selected" + (period === "M" ? "Month" : "Year")] =
			inst["draw" + (period === "M" ? "Month" : "Year")] =
				parseInt(select.options[select.selectedIndex].value,10);
	
			this._notifyChange(inst);
			this._adjustDate(target);
		},
	
		/* Action for selecting a day. */
		_selectDay: function(id, month, year, td) {
			var inst,
				target = $(id);
	
			if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return;
			}
	
			inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $("a", td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		},
	
		/* Erase the input field and hide the date picker. */
		_clearDate: function(id) {
			var target = $(id);
			this._selectDate(target, "");
		},
	
		/* Update the input field with the selected date. */
		_selectDate: function(id, dateStr) {
			var onSelect,
				target = $(id),
				inst = this._getInst(target[0]);
	
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			if (inst.input) {
				inst.input.val(dateStr);
			}
			this._updateAlternate(inst);
	
			onSelect = this._get(inst, "onSelect");
			if (onSelect) {
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
			} else if (inst.input) {
				inst.input.trigger("change"); // fire the change event
			}
	
			if (inst.inline){
				this._updateDatepicker(inst);
			} else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if (typeof(inst.input[0]) !== "object") {
					inst.input.focus(); // restore focus
				}
				this._lastInput = null;
			}
		},
	
		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate: function(inst) {
			var altFormat, date, dateStr,
				altField = this._get(inst, "altField");
	
			if (altField) { // update alternate field too
				altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
				date = this._getDate(inst);
				dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function() { $(this).val(dateStr); });
			}
		},
	
		/* Set as beforeShowDay function to prevent selection of weekends.
		 * @param  date  Date - the date to customise
		 * @return [boolean, string] - is this date selectable?, what is its CSS class?
		 */
		noWeekends: function(date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ""];
		},
	
		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
		 * @param  date  Date - the date to get the week for
		 * @return  number - the number of the week within the year that contains this date
		 */
		iso8601Week: function(date) {
			var time,
				checkDate = new Date(date.getTime());
	
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
	
			time = checkDate.getTime();
			checkDate.setMonth(0); // Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},
	
		/* Parse a string value into a date object.
		 * See formatDate below for the possible formats.
		 *
		 * @param  format string - the expected format of the date
		 * @param  value string - the date in the above format
		 * @param  settings Object - attributes include:
		 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
		 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
		 *					dayNames		string[7] - names of the days from Sunday (optional)
		 *					monthNamesShort string[12] - abbreviated names of the months (optional)
		 *					monthNames		string[12] - names of the months (optional)
		 * @return  Date - the extracted date value or null if value is blank
		 */
		parseDate: function (format, value, settings) {
			if (format == null || value == null) {
				throw "Invalid arguments";
			}
	
			value = (typeof value === "object" ? value.toString() : value + "");
			if (value === "") {
				return null;
			}
	
			var iFormat, dim, extra,
				iValue = 0,
				shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
					new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
				dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
				dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
				monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
				monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
				year = -1,
				month = -1,
				day = -1,
				doy = -1,
				literal = false,
				date,
				// Check whether a format character is doubled
				lookAhead = function(match) {
					var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
					if (matches) {
						iFormat++;
					}
					return matches;
				},
				// Extract a number from the string value
				getNumber = function(match) {
					var isDoubled = lookAhead(match),
						size = (match === "@" ? 14 : (match === "!" ? 20 :
						(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
						digits = new RegExp("^\\d{1," + size + "}"),
						num = value.substring(iValue).match(digits);
					if (!num) {
						throw "Missing number at position " + iValue;
					}
					iValue += num[0].length;
					return parseInt(num[0], 10);
				},
				// Extract a name from the string value and convert to an index
				getName = function(match, shortNames, longNames) {
					var index = -1,
						names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
							return [ [k, v] ];
						}).sort(function (a, b) {
							return -(a[1].length - b[1].length);
						});
	
					$.each(names, function (i, pair) {
						var name = pair[1];
						if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
							index = pair[0];
							iValue += name.length;
							return false;
						}
					});
					if (index !== -1) {
						return index + 1;
					} else {
						throw "Unknown name at position " + iValue;
					}
				},
				// Confirm that a literal character matches the string value
				checkLiteral = function() {
					if (value.charAt(iValue) !== format.charAt(iFormat)) {
						throw "Unexpected literal at position " + iValue;
					}
					iValue++;
				};
	
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						checkLiteral();
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							day = getNumber("d");
							break;
						case "D":
							getName("D", dayNamesShort, dayNames);
							break;
						case "o":
							doy = getNumber("o");
							break;
						case "m":
							month = getNumber("m");
							break;
						case "M":
							month = getName("M", monthNamesShort, monthNames);
							break;
						case "y":
							year = getNumber("y");
							break;
						case "@":
							date = new Date(getNumber("@"));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "!":
							date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if (lookAhead("'")){
								checkLiteral();
							} else {
								literal = true;
							}
							break;
						default:
							checkLiteral();
					}
				}
			}
	
			if (iValue < value.length){
				extra = value.substr(iValue);
				if (!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}
	
			if (year === -1) {
				year = new Date().getFullYear();
			} else if (year < 100) {
				year += new Date().getFullYear() - new Date().getFullYear() % 100 +
					(year <= shortYearCutoff ? 0 : -100);
			}
	
			if (doy > -1) {
				month = 1;
				day = doy;
				do {
					dim = this._getDaysInMonth(year, month - 1);
					if (day <= dim) {
						break;
					}
					month++;
					day -= dim;
				} while (true);
			}
	
			date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
				throw "Invalid date"; // E.g. 31/02/00
			}
			return date;
		},
	
		/* Standard date formats. */
		ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y", // RFC 822
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd", // ISO 8601
	
		_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
			Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
	
		/* Format a date object into a string value.
		 * The format can be combinations of the following:
		 * d  - day of month (no leading zero)
		 * dd - day of month (two digit)
		 * o  - day of year (no leading zeros)
		 * oo - day of year (three digit)
		 * D  - day name short
		 * DD - day name long
		 * m  - month of year (no leading zero)
		 * mm - month of year (two digit)
		 * M  - month name short
		 * MM - month name long
		 * y  - year (two digit)
		 * yy - year (four digit)
		 * @ - Unix timestamp (ms since 01/01/1970)
		 * ! - Windows ticks (100ns since 01/01/0001)
		 * "..." - literal text
		 * '' - single quote
		 *
		 * @param  format string - the desired format of the date
		 * @param  date Date - the date value to format
		 * @param  settings Object - attributes include:
		 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
		 *					dayNames		string[7] - names of the days from Sunday (optional)
		 *					monthNamesShort string[12] - abbreviated names of the months (optional)
		 *					monthNames		string[12] - names of the months (optional)
		 * @return  string - the date in the above format
		 */
		formatDate: function (format, date, settings) {
			if (!date) {
				return "";
			}
	
			var iFormat,
				dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
				dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
				monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
				monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
				// Check whether a format character is doubled
				lookAhead = function(match) {
					var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
					if (matches) {
						iFormat++;
					}
					return matches;
				},
				// Format a number, with leading zero if necessary
				formatNumber = function(match, value, len) {
					var num = "" + value;
					if (lookAhead(match)) {
						while (num.length < len) {
							num = "0" + num;
						}
					}
					return num;
				},
				// Format a name, short or long as requested
				formatName = function(match, value, shortNames, longNames) {
					return (lookAhead(match) ? longNames[value] : shortNames[value]);
				},
				output = "",
				literal = false;
	
			if (date) {
				for (iFormat = 0; iFormat < format.length; iFormat++) {
					if (literal) {
						if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
							literal = false;
						} else {
							output += format.charAt(iFormat);
						}
					} else {
						switch (format.charAt(iFormat)) {
							case "d":
								output += formatNumber("d", date.getDate(), 2);
								break;
							case "D":
								output += formatName("D", date.getDay(), dayNamesShort, dayNames);
								break;
							case "o":
								output += formatNumber("o",
									Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case "m":
								output += formatNumber("m", date.getMonth() + 1, 2);
								break;
							case "M":
								output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
								break;
							case "y":
								output += (lookAhead("y") ? date.getFullYear() :
									(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
								break;
							case "@":
								output += date.getTime();
								break;
							case "!":
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if (lookAhead("'")) {
									output += "'";
								} else {
									literal = true;
								}
								break;
							default:
								output += format.charAt(iFormat);
						}
					}
				}
			}
			return output;
		},
	
		/* Extract all possible characters from the date format. */
		_possibleChars: function (format) {
			var iFormat,
				chars = "",
				literal = false,
				// Check whether a format character is doubled
				lookAhead = function(match) {
					var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
					if (matches) {
						iFormat++;
					}
					return matches;
				};
	
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						chars += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d": case "m": case "y": case "@":
							chars += "0123456789";
							break;
						case "D": case "M":
							return null; // Accept anything
						case "'":
							if (lookAhead("'")) {
								chars += "'";
							} else {
								literal = true;
							}
							break;
						default:
							chars += format.charAt(iFormat);
					}
				}
			}
			return chars;
		},
	
		/* Get a setting value, defaulting if necessary. */
		_get: function(inst, name) {
			return inst.settings[name] !== undefined ?
				inst.settings[name] : this._defaults[name];
		},
	
		/* Parse existing date and initialise date picker. */
		_setDateFromField: function(inst, noDefault) {
			if (inst.input.val() === inst.lastVal) {
				return;
			}
	
			var dateFormat = this._get(inst, "dateFormat"),
				dates = inst.lastVal = inst.input ? inst.input.val() : null,
				defaultDate = this._getDefaultDate(inst),
				date = defaultDate,
				settings = this._getFormatConfig(inst);
	
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				dates = (noDefault ? "" : dates);
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = (dates ? date.getDate() : 0);
			inst.currentMonth = (dates ? date.getMonth() : 0);
			inst.currentYear = (dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst);
		},
	
		/* Retrieve the default date shown on opening. */
		_getDefaultDate: function(inst) {
			return this._restrictMinMax(inst,
				this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
		},
	
		/* A date may be specified as an exact value or a relative one. */
		_determineDate: function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
					var date = new Date();
					date.setDate(date.getDate() + offset);
					return date;
				},
				offsetString = function(offset) {
					try {
						return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
							offset, $.datepicker._getFormatConfig(inst));
					}
					catch (e) {
						// Ignore
					}
	
					var date = (offset.toLowerCase().match(/^c/) ?
						$.datepicker._getDate(inst) : null) || new Date(),
						year = date.getFullYear(),
						month = date.getMonth(),
						day = date.getDate(),
						pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
						matches = pattern.exec(offset);
	
					while (matches) {
						switch (matches[2] || "d") {
							case "d" : case "D" :
								day += parseInt(matches[1],10); break;
							case "w" : case "W" :
								day += parseInt(matches[1],10) * 7; break;
							case "m" : case "M" :
								month += parseInt(matches[1],10);
								day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
								break;
							case "y": case "Y" :
								year += parseInt(matches[1],10);
								day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
								break;
						}
						matches = pattern.exec(offset);
					}
					return new Date(year, month, day);
				},
				newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
					(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
	
			newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
			if (newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},
	
		/* Handle switch to/from daylight saving.
		 * Hours may be non-zero on daylight saving cut-over:
		 * > 12 when midnight changeover, but then cannot generate
		 * midnight datetime, so jump to 1AM, otherwise reset.
		 * @param  date  (Date) the date to check
		 * @return  (Date) the corrected date
		 */
		_daylightSavingAdjust: function(date) {
			if (!date) {
				return null;
			}
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},
	
		/* Set the date(s) directly. */
		_setDate: function(inst, date, noChange) {
			var clear = !date,
				origMonth = inst.selectedMonth,
				origYear = inst.selectedYear,
				newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
	
			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
				this._notifyChange(inst);
			}
			this._adjustInstDate(inst);
			if (inst.input) {
				inst.input.val(clear ? "" : this._formatDate(inst));
			}
		},
	
		/* Retrieve the date(s) directly. */
		_getDate: function(inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
				this._daylightSavingAdjust(new Date(
				inst.currentYear, inst.currentMonth, inst.currentDay)));
				return startDate;
		},
	
		/* Attach the onxxx handlers.  These are declared statically so
		 * they work with static code transformers like Caja.
		 */
		_attachHandlers: function(inst) {
			var stepMonths = this._get(inst, "stepMonths"),
				id = "#" + inst.id.replace( /\\\\/g, "\\" );
			inst.dpDiv.find("[data-handler]").map(function () {
				var handler = {
					prev: function () {
						$.datepicker._adjustDate(id, -stepMonths, "M");
					},
					next: function () {
						$.datepicker._adjustDate(id, +stepMonths, "M");
					},
					hide: function () {
						$.datepicker._hideDatepicker();
					},
					today: function () {
						$.datepicker._gotoToday(id);
					},
					selectDay: function () {
						$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
						return false;
					},
					selectMonth: function () {
						$.datepicker._selectMonthYear(id, this, "M");
						return false;
					},
					selectYear: function () {
						$.datepicker._selectMonthYear(id, this, "Y");
						return false;
					}
				};
				$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
			});
		},
	
		/* Generate the HTML for the current state of the date picker. */
		_generateHTML: function(inst) {
			var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
				controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
				monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
				selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
				cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
				printDate, dRow, tbody, daySettings, otherMonth, unselectable,
				tempDate = new Date(),
				today = this._daylightSavingAdjust(
					new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
				isRTL = this._get(inst, "isRTL"),
				showButtonPanel = this._get(inst, "showButtonPanel"),
				hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
				navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
				numMonths = this._getNumberOfMonths(inst),
				showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
				stepMonths = this._get(inst, "stepMonths"),
				isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
				currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
					new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
				minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				drawMonth = inst.drawMonth - showCurrentAtPos,
				drawYear = inst.drawYear;
	
			if (drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if (maxDate) {
				maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
					maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if (drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
	
			prevText = this._get(inst, "prevText");
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
				this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
				this._getFormatConfig(inst)));
	
			prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
				"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
				" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
				(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));
	
			nextText = this._get(inst, "nextText");
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
				this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
				this._getFormatConfig(inst)));
	
			next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
				"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
				" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
				(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));
	
			currentText = this._get(inst, "currentText");
			gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText :
				this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
	
			controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
				this._get(inst, "closeText") + "</button>" : "");
	
			buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
				(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
				">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
	
			firstDay = parseInt(this._get(inst, "firstDay"),10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
	
			showWeek = this._get(inst, "showWeek");
			dayNames = this._get(inst, "dayNames");
			dayNamesMin = this._get(inst, "dayNamesMin");
			monthNames = this._get(inst, "monthNames");
			monthNamesShort = this._get(inst, "monthNamesShort");
			beforeShowDay = this._get(inst, "beforeShowDay");
			showOtherMonths = this._get(inst, "showOtherMonths");
			selectOtherMonths = this._get(inst, "selectOtherMonths");
			defaultDate = this._getDefaultDate(inst);
			html = "";
			dow;
			for (row = 0; row < numMonths[0]; row++) {
				group = "";
				this.maxRows = 4;
				for (col = 0; col < numMonths[1]; col++) {
					selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					cornerClass = " ui-corner-all";
					calender = "";
					if (isMultiMonth) {
						calender += "<div class='ui-datepicker-group";
						if (numMonths[1] > 1) {
							switch (col) {
								case 0: calender += " ui-datepicker-group-first";
									cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
								case numMonths[1]-1: calender += " ui-datepicker-group-last";
									cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
								default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
							}
						}
						calender += "'>";
					}
					calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
						(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
						(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
						this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
						row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
						"</div><table class='ui-datepicker-calendar'><thead>" +
						"<tr>";
					thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
					for (dow = 0; dow < 7; dow++) { // days of the week
						day = (dow + firstDay) % 7;
						thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
							"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
					}
					calender += thead + "</tr></thead><tbody>";
					daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					}
					leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
					numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
						calender += "<tr>";
						tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
							this._get(inst, "calculateWeek")(printDate) + "</td>");
						for (dow = 0; dow < 7; dow++) { // create date picker days
							daySettings = (beforeShowDay ?
								beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
							otherMonth = (printDate.getMonth() !== drawMonth);
							unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
								(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += "<td class='" +
								((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
								(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
								((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
								(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
								// or defaultDate is current printedDate and defaultDate is selectedDate
								" " + this._dayOverClass : "") + // highlight selected day
								(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable days
								(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
								(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
								(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)
								((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
								(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
								(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
								(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
								(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
								(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day
								(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
								"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + "</tr>";
					}
					drawMonth++;
					if (drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
								((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
					group += calender;
				}
				html += group;
			}
			html += buttonPanel;
			inst._keyEvent = false;
			return html;
		},
	
		/* Generate the month and year header. */
		_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
				secondary, monthNames, monthNamesShort) {
	
			var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
				changeMonth = this._get(inst, "changeMonth"),
				changeYear = this._get(inst, "changeYear"),
				showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
				html = "<div class='ui-datepicker-title'>",
				monthHtml = "";
	
			// month selection
			if (secondary || !changeMonth) {
				monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
			} else {
				inMinYear = (minDate && minDate.getFullYear() === drawYear);
				inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
				monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
				for ( month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
						monthHtml += "<option value='" + month + "'" +
							(month === drawMonth ? " selected='selected'" : "") +
							">" + monthNamesShort[month] + "</option>";
					}
				}
				monthHtml += "</select>";
			}
	
			if (!showMonthAfterYear) {
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
			}
	
			// year selection
			if ( !inst.yearshtml ) {
				inst.yearshtml = "";
				if (secondary || !changeYear) {
					html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
				} else {
					// determine range of years to display
					years = this._get(inst, "yearRange").split(":");
					thisYear = new Date().getFullYear();
					determineYear = function(value) {
						var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
							(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
							parseInt(value, 10)));
						return (isNaN(year) ? thisYear : year);
					};
					year = determineYear(years[0]);
					endYear = Math.max(year, determineYear(years[1] || ""));
					year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
					endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
					inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
					for (; year <= endYear; year++) {
						inst.yearshtml += "<option value='" + year + "'" +
							(year === drawYear ? " selected='selected'" : "") +
							">" + year + "</option>";
					}
					inst.yearshtml += "</select>";
	
					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}
	
			html += this._get(inst, "yearSuffix");
			if (showMonthAfterYear) {
				html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
			}
			html += "</div>"; // Close datepicker_header
			return html;
		},
	
		/* Adjust one of the date sub-fields. */
		_adjustInstDate: function(inst, offset, period) {
			var year = inst.drawYear + (period === "Y" ? offset : 0),
				month = inst.drawMonth + (period === "M" ? offset : 0),
				day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
				date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
	
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if (period === "M" || period === "Y") {
				this._notifyChange(inst);
			}
		},
	
		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax: function(inst, date) {
			var minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				newDate = (minDate && date < minDate ? minDate : date);
			return (maxDate && newDate > maxDate ? maxDate : newDate);
		},
	
		/* Notify change of month/year. */
		_notifyChange: function(inst) {
			var onChange = this._get(inst, "onChangeMonthYear");
			if (onChange) {
				onChange.apply((inst.input ? inst.input[0] : null),
					[inst.selectedYear, inst.selectedMonth + 1, inst]);
			}
		},
	
		/* Determine the number of months to show. */
		_getNumberOfMonths: function(inst) {
			var numMonths = this._get(inst, "numberOfMonths");
			return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
		},
	
		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate: function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
		},
	
		/* Find the number of days in a given month. */
		_getDaysInMonth: function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},
	
		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth: function(year, month) {
			return new Date(year, month, 1).getDay();
		},
	
		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth: function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst),
				date = this._daylightSavingAdjust(new Date(curYear,
				curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
	
			if (offset < 0) {
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			}
			return this._isInRange(inst, date);
		},
	
		/* Is the given date in the accepted range? */
		_isInRange: function(inst, date) {
			var yearSplit, currentYear,
				minDate = this._getMinMaxDate(inst, "min"),
				maxDate = this._getMinMaxDate(inst, "max"),
				minYear = null,
				maxYear = null,
				years = this._get(inst, "yearRange");
				if (years){
					yearSplit = years.split(":");
					currentYear = new Date().getFullYear();
					minYear = parseInt(yearSplit[0], 10);
					maxYear = parseInt(yearSplit[1], 10);
					if ( yearSplit[0].match(/[+\-].*/) ) {
						minYear += currentYear;
					}
					if ( yearSplit[1].match(/[+\-].*/) ) {
						maxYear += currentYear;
					}
				}
	
			return ((!minDate || date.getTime() >= minDate.getTime()) &&
				(!maxDate || date.getTime() <= maxDate.getTime()) &&
				(!minYear || date.getFullYear() >= minYear) &&
				(!maxYear || date.getFullYear() <= maxYear));
		},
	
		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig: function(inst) {
			var shortYearCutoff = this._get(inst, "shortYearCutoff");
			shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
				monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};
		},
	
		/* Format the given date for display. */
		_formatDate: function(inst, day, month, year) {
			if (!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			var date = (day ? (typeof day === "object" ? day :
				this._daylightSavingAdjust(new Date(year, month, day))) :
				this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
		}
	});
	
	/*
	 * Bind hover events for datepicker elements.
	 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
	 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
	 */
	function bindHover(dpDiv) {
		var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return dpDiv.delegate(selector, "mouseout", function() {
				$(this).removeClass("ui-state-hover");
				if (this.className.indexOf("ui-datepicker-prev") !== -1) {
					$(this).removeClass("ui-datepicker-prev-hover");
				}
				if (this.className.indexOf("ui-datepicker-next") !== -1) {
					$(this).removeClass("ui-datepicker-next-hover");
				}
			})
			.delegate(selector, "mouseover", function(){
				if (!$.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
					$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
					$(this).addClass("ui-state-hover");
					if (this.className.indexOf("ui-datepicker-prev") !== -1) {
						$(this).addClass("ui-datepicker-prev-hover");
					}
					if (this.className.indexOf("ui-datepicker-next") !== -1) {
						$(this).addClass("ui-datepicker-next-hover");
					}
				}
			});
	}
	
	/* jQuery extend now ignores nulls! */
	function extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props) {
			if (props[name] == null) {
				target[name] = props[name];
			}
		}
		return target;
	}
	
	/* Invoke the datepicker functionality.
	   @param  options  string - a command, optionally followed by additional parameters or
						Object - settings for attaching new datepicker functionality
	   @return  jQuery object */
	$.fn.datepicker = function(options){
	
		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if ( !this.length ) {
			return this;
		}
	
		/* Initialise the date picker. */
		if (!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick);
			$.datepicker.initialized = true;
		}
	
		/* Append datepicker main container to body if not exist. */
		if ($("#"+$.datepicker._mainDivId).length === 0) {
			$("body").append($.datepicker.dpDiv);
		}
	
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
			return $.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this[0]].concat(otherArgs));
		}
		if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
			return $.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this[0]].concat(otherArgs));
		}
		return this.each(function() {
			typeof options === "string" ?
				$.datepicker["_" + options + "Datepicker"].
					apply($.datepicker, [this].concat(otherArgs)) :
				$.datepicker._attachDatepicker(this, options);
		});
	};
	
	$.datepicker = new Datepicker(); // singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.10.4";
	
	})(jQuery);


/***/ },
/* 39 */,
/* 40 */
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! jquery */ 29);
	var NotificationModel = __webpack_require__(/*! ./models/notification.js */ 41);
	var NotificationView = __webpack_require__(/*! ./views/admin/notification.js */ 42);
	
	var _getMonthFormatted = function (dateObj) {
	    var month = dateObj.getMonth() + 1;
	    return month < 10 ? '0' + month : '' + month;
	};
	var _getDayFormatted = function (dateObj) {
	    var day = dateObj.getDate() + 1;
	    return day < 10 ? '0' + day : '' + day;
	};
	
	var _secondsToHoursMinsSeconds = function(durationInSeconds){
	    var sec_num = parseInt(durationInSeconds, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);
	    var time = "";
	
	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10 && hours !== "00") {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	
	    if (hours !== "00") {
	        time += hours + ':';
	    }
	    time += minutes + ':' + seconds;
	    return time;
	
	};
	
	module.exports = {
	
	    formattedDate: function (date) {
	        var dateObj = new Date(date);
	        return _getMonthFormatted(dateObj) + "/" + _getDayFormatted(dateObj) + '/' + dateObj.getFullYear();
	    },
	
	    formattedDuration: function(duration){
	        if (duration === 0){
	            return '';
	        } else {
	            return _secondsToHoursMinsSeconds(duration);
	        }
	    },
	
	    mysqlFormatDate: function (unformattedDate){
	
	        // converts from 'MM/DD/YYYY' to 'YYYY-MM-DD 00:00:00'
	        var MM = unformattedDate.substring(0,2);
	        var DD = unformattedDate.substring(3,5);
	        var YYYY = unformattedDate.substring(6,10);
	
	        return YYYY + '-' + MM + '-' + DD + ' 00:00:00';
	    },
	
	    getUniqueAudioFileName: function (fields){
	        var strippedTitle = fields.title.replace(/[^a-zA-Z0-9.]+/g,'');
	        var strippedArtist = fields.actName.replace(/[^a-zA-Z0-9.]+/g,'');
	        var random = Math.random()*100000000000000000;
	        var longName = strippedTitle + '-' + strippedArtist + '-' + random;
	        return longName.substring(0,46);
	    },
	
	    htmlEscape: function (str) {
	        return String(str)
	            .replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;');
	    },
	
	    createNotification: function(options){
	        return new NotificationView({
	            model: new NotificationModel(options),
	            template: $("#template_notification").html()
	        });
	    }
	};

/***/ },
/* 41 */
/*!********************************!*\
  !*** ./models/notification.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(/*! backbone */ 30);
	
	module.exports = Backbone.Model.extend({
	
	    defaults: {
	        type: 'info', // possible values 'info', 'warning', 'error'
	        message: "no message yet",
	
	        autohide: false,
	        duration: 4000, // length of time in ms before auto hide kicks in
	
	        showOkButton: true,
	        showCancelButton: false,
	
	        okCallback: function(){},
	        cancelCallback: function(){}
	    }
	});

/***/ },
/* 42 */
/*!*************************************!*\
  !*** ./views/admin/notification.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! jquery */ 29);
	var _ = __webpack_require__(/*! underscore */ 31);
	var Backbone = __webpack_require__(/*! backbone */ 30);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    el: "#notificationContainer",
	
	    initialize: function(options){
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.model, 'change', this.render);
	        this.render();
	
	        if (this.model.get("autohide")){
	            setTimeout(this.close, this.model.get("duration"));
	        }
	    },
	
	    close: function(){
	        $("#notificationContainer").empty().removeData().unbind().hide();
	        Backbone.View.prototype.remove.call(this);
	    },
	
	    render: function(){
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate).show();
	        return this;
	    }
	});

/***/ },
/* 43 */
/*!*********************************************!*\
  !*** ./views/admin/artistAddOrEditPanel.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-validation */ 34);
	__webpack_require__(/*! jquery-serializejson */ 35);
	
	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	var utils = __webpack_require__(/*! ../../utils.js */ 40);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "artistEditPanel",
	    className: "addOrEditPanel",
	
	    initialize: function(options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.bind('change', this.render, this);
	    },
	
	    events: {
	        "click #cancelEditButton": "closePanel",
	        "click #addOrUpdateArtist": "addOrUpdateArtist"
	    },
	
	    closePanel: function() {
	        adminApp.routers.main.navigate('artists/highlight/' + this.model.id, {trigger: true});
	    },
	
	    addOrUpdateArtist: function (e) {
	
	        e.preventDefault();
	
	        var that = this,
	            $infoForm = this.$el.find("#artistInfo"),
	            validator = $infoForm.validate();
	
	        if (validator.form()) {
	            this.model
	                .set($infoForm.serializeJSON())
	                .save(null, {
	                    success: function() {
	                        adminApp.collections.artists.fetch({
	                            reset: true,
	                            success: function(){
	                                that.closePanel();
	                            }
	                        });
	                    }
	                });
	        }
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	        this.$el.find("button").button();
	        return this;
	    }
	
	});

/***/ },
/* 44 */
/*!**************************!*\
  !*** ./models/artist.js ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = Backbone.Model.extend({
	
	    urlRoot: "api/artist",
	
	    defaults: {
	        imgFile: "no_image.jpg"
	    }
	});

/***/ },
/* 45 */
/*!********************************!*\
  !*** ./collections/artists.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(/*! ../utils.js */ 40);
	var ArtistModel = __webpack_require__(/*! ../models/artist.js */ 44);
	
	module.exports = Backbone.Collection.extend({
	
	    model: ArtistModel,
	    url: "api/artists",
	    sort_key: "actName",
	
	    initialize: function() {
	        this.bind("remove", function (model) {
	            model.destroy({wait: true});
	            utils.createNotification({
	                message: "ARTIST DELETED<br />" + model.get("actName"),
	                autohide: true
	            });
	        });
	    },
	
	    parse: function(response){
	        return response[0];
	    }
	});

/***/ },
/* 46 */
/*!********************************!*\
  !*** ./views/admin/artists.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "artistsContent",
	    className: "artists",
	    selectedId: null,
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.collection, 'reset sort change remove', this.render);
	        this.collection.fetch({reset:true});
	    },
	
	    events: {
	        "click button.addArtistButton"      : "add",
	        "click button.deleteArtistButton"   : "delete",
	        "click button.editArtistButton"     : "edit"
	    },
	
	    add: function(){
	        adminApp.routers.main.navigate("/artist/add", {trigger: true});
	    },
	
	    edit: function(e){
	        var actID = $(e.currentTarget).closest("tr").attr("data-actid");
	        adminApp.routers.main.navigate('artist/edit/' + actID, {trigger:true});
	    },
	
	    delete: function (e){
	        var $btn = $(e.currentTarget),
	            actID = parseInt($btn.closest("tr").attr("data-actid"));
	
	        var thisArtistsRecordings = adminApp.collections.recordings.where({actID: actID});
	        console.log(thisArtistsRecordings);
	        var recordingList = "";
	
	        thisArtistsRecordings.map(function(recording){
	            recordingList += recording.get("title") + "\n";
	        });
	
	        if (confirm("WARNING: If you delete this artist then the following recordings will also be deleted:\n" + recordingList)){
	            if (confirm("Really really really sure?")){
	                this.collection.remove(this.collection.get(actID));
	            }
	        }
	    },
	
	    styleButtons: function() {
	        this.$el.find(".editArtistButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-pencil"
	            }
	        });
	        this.$el.find(".deleteArtistButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-trash"
	            }
	        });
	        this.$el.find(".addArtistButton").button({
	            icons: {
	                primary: "ui-icon-plusthick"
	            }
	        });
	    },
	
	    render: function(){
	        var compiledTemplate = Mustache.to_html(this.template, { artists: this.collection.toJSON()});
	        this.$el.html(compiledTemplate);
	        this.styleButtons();
	
	        // Sub-views need this or events associated with
	        // previous renderings of the view will be lost.
	        this.delegateEvents();
	
	        return this;
	    }
	});


/***/ },
/* 47 */
/*!***********************************!*\
  !*** ./collections/recordings.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(/*! ../utils.js */ 40);
	var RecordingModel = __webpack_require__(/*! ../models/recording.js */ 48);
	
	module.exports = Backbone.Collection.extend({
	
	    model: RecordingModel,
	    url: "api/recordings",
	    sort_key: "title",
	
	    initialize: function() {
	        this.bind("remove", function (model) {
	            model.destroy({wait: true});
	            utils.createNotification({
	                message: "RECORDING DELETED<br />'" + model.get("title") + "' by " + model.get("actName"),
	                autohide: true
	            });
	        });
	    },
	
	    comparator: function(item) {
	        return item.get(this.sort_key);
	    },
	
	    sortByField: function(fieldName) {
	        this.sort_key = fieldName;
	        this.sort();
	    },
	
	    parse: function (response) {
	        return response.Recordings[0];
	    }
	
	
	});

/***/ },
/* 48 */
/*!*****************************!*\
  !*** ./models/recording.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(/*! ../utils.js */ 40);
	
	module.exports = Backbone.Model.extend({
	
	    urlRoot: "api/recording",
	
	    parse: function (response) {
	        if (response) {
	            this.set(response);
	            this.set("recDate", utils.formattedDate(response.recDate));
	        }
	    }
	
	});

/***/ },
/* 49 */
/*!***********************************!*\
  !*** ./views/admin/recordings.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-ui/effect */ 50);
	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "recordingsContent",
	    className: "recordings",
	    audio: new Audio(),
	    nowPlayingId: null,
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.collection, 'reset sort change remove', this.render);
	        this.collection.fetch({reset:true});
	        this.audio.addEventListener('error', $.proxy(this.handleAudioLoadError, this));
	    },
	
	    events: {
	        "click th"                      : "sort",
	        "click .playButton"             : "play",
	        "click .plusButton"             : "addToQueue",
	        "click .editRecordingButton"    : "edit",
	        "click .deleteRecordingButton"  : "delete",
	        "click a[href=#uploads]"        : "add",
	        "click .addRecordingButton"     : "add"
	    },
	
	    add: function(){
	        adminApp.routers.main.navigate("/recording/add", {trigger: true});
	    },
	
	    edit: function(e) {
	        var recID = $(e.currentTarget).closest("tr").attr("data-recordingId");
	        adminApp.routers.main.navigate('recording/edit/' + recID, {trigger:true});
	    },
	
	    delete: function (e) {
	        var $btn = $(e.currentTarget),
	            recordingId = $btn.closest("tr").attr("data-recordingId");
	        if (this.nowPlayingId === recordingId) {
	            this.audio.pause();
	        }
	        if (confirm("Are you sure you want to delete this recording?")){
	            var modelToDelete = this.collection.get(recordingId);
	            this.collection.remove(modelToDelete);
	        }
	    },
	
	    play: function (e) {
	        //var recordingId = $(e.currentTarget).closest("tr").attr("data-recordingId");
	        //var player = adminApp.models.player;
	        //
	    },
	
	    addToQueue: function(e){
	
	        var $btn = $(e.currentTarget),
	            recordingId = $btn.closest("tr").attr("data-recordingId");
	        adminApp.collections.queue.pushRecording(this.collection.get(recordingId));
	    },
	
	    sort: function(e) {
	        var field = $(e.target).attr("bengrid-key");
	
	        if (field) {
	            this.collection.sortByField(field);
	        }
	    },
	
	    handleAudioLoadError: function (e) {
	        $("#recordingId-" + this.nowPlayingId).addClass("loadError");
	        $(".previewButton").removeClass("nowPlaying");
	        // todo should set a flag in the db that audio is broken
	    },
	
	    styleButtons: function() {
	        this.$el.find(".playButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-play"
	            }
	        });
	        this.$el.find(".plusButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-plusthick"
	            }
	        });
	        this.$el.find(".editRecordingButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-pencil"
	            }
	        });
	        this.$el.find(".deleteRecordingButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-trash"
	            }
	        });
	        this.$el.find(".addRecordingButton").button({
	            icons: {
	                primary: "ui-icon-plusthick"
	            }
	        });
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template, { recordings: this.collection.toJSON()});
	        this.$el.html(compiledTemplate);
	        this.styleButtons();
	
	        // Sub-views need this or events associated with
	        // previous renderings of the view will be lost.
	        this.delegateEvents();
	
	        return this;
	    }
	
	});

/***/ },
/* 50 */
/*!********************************!*\
  !*** ../~/jquery-ui/effect.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var jQuery = __webpack_require__(/*! jquery */ 29);
	
	/*!
	 * jQuery UI Effects 1.10.4
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/effects-core/
	 */
	(function($, undefined) {
	
	var dataSpace = "ui-effects-";
	
	$.effects = {
		effect: {}
	};
	
	/*!
	 * jQuery Color Animations v2.1.2
	 * https://github.com/jquery/jquery-color
	 *
	 * Copyright 2013 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * Date: Wed Jan 16 08:47:09 2013 -0600
	 */
	(function( jQuery, undefined ) {
	
		var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
	
		// plusequals test for += 100 -= 100
		rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
		// a set of RE's that can match strings and generate color tuples.
		stringParsers = [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ],
						execResult[ 3 ],
						execResult[ 4 ]
					];
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ] * 2.55,
						execResult[ 2 ] * 2.55,
						execResult[ 3 ] * 2.55,
						execResult[ 4 ]
					];
				}
			}, {
				// this regex ignores A-F because it's compared against an already lowercased string
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ], 16 )
					];
				}
			}, {
				// this regex ignores A-F because it's compared against an already lowercased string
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
					];
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ] / 100,
						execResult[ 3 ] / 100,
						execResult[ 4 ]
					];
				}
			}],
	
		// jQuery.Color( )
		color = jQuery.Color = function( color, green, blue, alpha ) {
			return new jQuery.Color.fn.parse( color, green, blue, alpha );
		},
		spaces = {
			rgba: {
				props: {
					red: {
						idx: 0,
						type: "byte"
					},
					green: {
						idx: 1,
						type: "byte"
					},
					blue: {
						idx: 2,
						type: "byte"
					}
				}
			},
	
			hsla: {
				props: {
					hue: {
						idx: 0,
						type: "degrees"
					},
					saturation: {
						idx: 1,
						type: "percent"
					},
					lightness: {
						idx: 2,
						type: "percent"
					}
				}
			}
		},
		propTypes = {
			"byte": {
				floor: true,
				max: 255
			},
			"percent": {
				max: 1
			},
			"degrees": {
				mod: 360,
				floor: true
			}
		},
		support = color.support = {},
	
		// element for support tests
		supportElem = jQuery( "<p>" )[ 0 ],
	
		// colors = jQuery.Color.names
		colors,
	
		// local aliases of functions called often
		each = jQuery.each;
	
	// determine rgba support immediately
	supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
	support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;
	
	// define cache name and alpha properties
	// for rgba and hsla spaces
	each( spaces, function( spaceName, space ) {
		space.cache = "_" + spaceName;
		space.props.alpha = {
			idx: 3,
			type: "percent",
			def: 1
		};
	});
	
	function clamp( value, prop, allowEmpty ) {
		var type = propTypes[ prop.type ] || {};
	
		if ( value == null ) {
			return (allowEmpty || !prop.def) ? null : prop.def;
		}
	
		// ~~ is an short way of doing floor for positive numbers
		value = type.floor ? ~~value : parseFloat( value );
	
		// IE will pass in empty strings as value for alpha,
		// which will hit this case
		if ( isNaN( value ) ) {
			return prop.def;
		}
	
		if ( type.mod ) {
			// we add mod before modding to make sure that negatives values
			// get converted properly: -10 -> 350
			return (value + type.mod) % type.mod;
		}
	
		// for now all property types without mod have min and max
		return 0 > value ? 0 : type.max < value ? type.max : value;
	}
	
	function stringParse( string ) {
		var inst = color(),
			rgba = inst._rgba = [];
	
		string = string.toLowerCase();
	
		each( stringParsers, function( i, parser ) {
			var parsed,
				match = parser.re.exec( string ),
				values = match && parser.parse( match ),
				spaceName = parser.space || "rgba";
	
			if ( values ) {
				parsed = inst[ spaceName ]( values );
	
				// if this was an rgba parse the assignment might happen twice
				// oh well....
				inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
				rgba = inst._rgba = parsed._rgba;
	
				// exit each( stringParsers ) here because we matched
				return false;
			}
		});
	
		// Found a stringParser that handled it
		if ( rgba.length ) {
	
			// if this came from a parsed string, force "transparent" when alpha is 0
			// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
			if ( rgba.join() === "0,0,0,0" ) {
				jQuery.extend( rgba, colors.transparent );
			}
			return inst;
		}
	
		// named colors
		return colors[ string ];
	}
	
	color.fn = jQuery.extend( color.prototype, {
		parse: function( red, green, blue, alpha ) {
			if ( red === undefined ) {
				this._rgba = [ null, null, null, null ];
				return this;
			}
			if ( red.jquery || red.nodeType ) {
				red = jQuery( red ).css( green );
				green = undefined;
			}
	
			var inst = this,
				type = jQuery.type( red ),
				rgba = this._rgba = [];
	
			// more than 1 argument specified - assume ( red, green, blue, alpha )
			if ( green !== undefined ) {
				red = [ red, green, blue, alpha ];
				type = "array";
			}
	
			if ( type === "string" ) {
				return this.parse( stringParse( red ) || colors._default );
			}
	
			if ( type === "array" ) {
				each( spaces.rgba.props, function( key, prop ) {
					rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
				});
				return this;
			}
	
			if ( type === "object" ) {
				if ( red instanceof color ) {
					each( spaces, function( spaceName, space ) {
						if ( red[ space.cache ] ) {
							inst[ space.cache ] = red[ space.cache ].slice();
						}
					});
				} else {
					each( spaces, function( spaceName, space ) {
						var cache = space.cache;
						each( space.props, function( key, prop ) {
	
							// if the cache doesn't exist, and we know how to convert
							if ( !inst[ cache ] && space.to ) {
	
								// if the value was null, we don't need to copy it
								// if the key was alpha, we don't need to copy it either
								if ( key === "alpha" || red[ key ] == null ) {
									return;
								}
								inst[ cache ] = space.to( inst._rgba );
							}
	
							// this is the only case where we allow nulls for ALL properties.
							// call clamp with alwaysAllowEmpty
							inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
						});
	
						// everything defined but alpha?
						if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
							// use the default of 1
							inst[ cache ][ 3 ] = 1;
							if ( space.from ) {
								inst._rgba = space.from( inst[ cache ] );
							}
						}
					});
				}
				return this;
			}
		},
		is: function( compare ) {
			var is = color( compare ),
				same = true,
				inst = this;
	
			each( spaces, function( _, space ) {
				var localCache,
					isCache = is[ space.cache ];
				if (isCache) {
					localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
					each( space.props, function( _, prop ) {
						if ( isCache[ prop.idx ] != null ) {
							same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
							return same;
						}
					});
				}
				return same;
			});
			return same;
		},
		_space: function() {
			var used = [],
				inst = this;
			each( spaces, function( spaceName, space ) {
				if ( inst[ space.cache ] ) {
					used.push( spaceName );
				}
			});
			return used.pop();
		},
		transition: function( other, distance ) {
			var end = color( other ),
				spaceName = end._space(),
				space = spaces[ spaceName ],
				startColor = this.alpha() === 0 ? color( "transparent" ) : this,
				start = startColor[ space.cache ] || space.to( startColor._rgba ),
				result = start.slice();
	
			end = end[ space.cache ];
			each( space.props, function( key, prop ) {
				var index = prop.idx,
					startValue = start[ index ],
					endValue = end[ index ],
					type = propTypes[ prop.type ] || {};
	
				// if null, don't override start value
				if ( endValue === null ) {
					return;
				}
				// if null - use end
				if ( startValue === null ) {
					result[ index ] = endValue;
				} else {
					if ( type.mod ) {
						if ( endValue - startValue > type.mod / 2 ) {
							startValue += type.mod;
						} else if ( startValue - endValue > type.mod / 2 ) {
							startValue -= type.mod;
						}
					}
					result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
				}
			});
			return this[ spaceName ]( result );
		},
		blend: function( opaque ) {
			// if we are already opaque - return ourself
			if ( this._rgba[ 3 ] === 1 ) {
				return this;
			}
	
			var rgb = this._rgba.slice(),
				a = rgb.pop(),
				blend = color( opaque )._rgba;
	
			return color( jQuery.map( rgb, function( v, i ) {
				return ( 1 - a ) * blend[ i ] + a * v;
			}));
		},
		toRgbaString: function() {
			var prefix = "rgba(",
				rgba = jQuery.map( this._rgba, function( v, i ) {
					return v == null ? ( i > 2 ? 1 : 0 ) : v;
				});
	
			if ( rgba[ 3 ] === 1 ) {
				rgba.pop();
				prefix = "rgb(";
			}
	
			return prefix + rgba.join() + ")";
		},
		toHslaString: function() {
			var prefix = "hsla(",
				hsla = jQuery.map( this.hsla(), function( v, i ) {
					if ( v == null ) {
						v = i > 2 ? 1 : 0;
					}
	
					// catch 1 and 2
					if ( i && i < 3 ) {
						v = Math.round( v * 100 ) + "%";
					}
					return v;
				});
	
			if ( hsla[ 3 ] === 1 ) {
				hsla.pop();
				prefix = "hsl(";
			}
			return prefix + hsla.join() + ")";
		},
		toHexString: function( includeAlpha ) {
			var rgba = this._rgba.slice(),
				alpha = rgba.pop();
	
			if ( includeAlpha ) {
				rgba.push( ~~( alpha * 255 ) );
			}
	
			return "#" + jQuery.map( rgba, function( v ) {
	
				// default to 0 when nulls exist
				v = ( v || 0 ).toString( 16 );
				return v.length === 1 ? "0" + v : v;
			}).join("");
		},
		toString: function() {
			return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
		}
	});
	color.fn.parse.prototype = color.fn;
	
	// hsla conversions adapted from:
	// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021
	
	function hue2rgb( p, q, h ) {
		h = ( h + 1 ) % 1;
		if ( h * 6 < 1 ) {
			return p + (q - p) * h * 6;
		}
		if ( h * 2 < 1) {
			return q;
		}
		if ( h * 3 < 2 ) {
			return p + (q - p) * ((2/3) - h) * 6;
		}
		return p;
	}
	
	spaces.hsla.to = function ( rgba ) {
		if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
			return [ null, null, null, rgba[ 3 ] ];
		}
		var r = rgba[ 0 ] / 255,
			g = rgba[ 1 ] / 255,
			b = rgba[ 2 ] / 255,
			a = rgba[ 3 ],
			max = Math.max( r, g, b ),
			min = Math.min( r, g, b ),
			diff = max - min,
			add = max + min,
			l = add * 0.5,
			h, s;
	
		if ( min === max ) {
			h = 0;
		} else if ( r === max ) {
			h = ( 60 * ( g - b ) / diff ) + 360;
		} else if ( g === max ) {
			h = ( 60 * ( b - r ) / diff ) + 120;
		} else {
			h = ( 60 * ( r - g ) / diff ) + 240;
		}
	
		// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
		// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
		if ( diff === 0 ) {
			s = 0;
		} else if ( l <= 0.5 ) {
			s = diff / add;
		} else {
			s = diff / ( 2 - add );
		}
		return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
	};
	
	spaces.hsla.from = function ( hsla ) {
		if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
			return [ null, null, null, hsla[ 3 ] ];
		}
		var h = hsla[ 0 ] / 360,
			s = hsla[ 1 ],
			l = hsla[ 2 ],
			a = hsla[ 3 ],
			q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
			p = 2 * l - q;
	
		return [
			Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
			Math.round( hue2rgb( p, q, h ) * 255 ),
			Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
			a
		];
	};
	
	
	each( spaces, function( spaceName, space ) {
		var props = space.props,
			cache = space.cache,
			to = space.to,
			from = space.from;
	
		// makes rgba() and hsla()
		color.fn[ spaceName ] = function( value ) {
	
			// generate a cache for this space if it doesn't exist
			if ( to && !this[ cache ] ) {
				this[ cache ] = to( this._rgba );
			}
			if ( value === undefined ) {
				return this[ cache ].slice();
			}
	
			var ret,
				type = jQuery.type( value ),
				arr = ( type === "array" || type === "object" ) ? value : arguments,
				local = this[ cache ].slice();
	
			each( props, function( key, prop ) {
				var val = arr[ type === "object" ? key : prop.idx ];
				if ( val == null ) {
					val = local[ prop.idx ];
				}
				local[ prop.idx ] = clamp( val, prop );
			});
	
			if ( from ) {
				ret = color( from( local ) );
				ret[ cache ] = local;
				return ret;
			} else {
				return color( local );
			}
		};
	
		// makes red() green() blue() alpha() hue() saturation() lightness()
		each( props, function( key, prop ) {
			// alpha is included in more than one space
			if ( color.fn[ key ] ) {
				return;
			}
			color.fn[ key ] = function( value ) {
				var vtype = jQuery.type( value ),
					fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
					local = this[ fn ](),
					cur = local[ prop.idx ],
					match;
	
				if ( vtype === "undefined" ) {
					return cur;
				}
	
				if ( vtype === "function" ) {
					value = value.call( this, cur );
					vtype = jQuery.type( value );
				}
				if ( value == null && prop.empty ) {
					return this;
				}
				if ( vtype === "string" ) {
					match = rplusequals.exec( value );
					if ( match ) {
						value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
					}
				}
				local[ prop.idx ] = value;
				return this[ fn ]( local );
			};
		});
	});
	
	// add cssHook and .fx.step function for each named hook.
	// accept a space separated string of properties
	color.hook = function( hook ) {
		var hooks = hook.split( " " );
		each( hooks, function( i, hook ) {
			jQuery.cssHooks[ hook ] = {
				set: function( elem, value ) {
					var parsed, curElem,
						backgroundColor = "";
	
					if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
						value = color( parsed || value );
						if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
							curElem = hook === "backgroundColor" ? elem.parentNode : elem;
							while (
								(backgroundColor === "" || backgroundColor === "transparent") &&
								curElem && curElem.style
							) {
								try {
									backgroundColor = jQuery.css( curElem, "backgroundColor" );
									curElem = curElem.parentNode;
								} catch ( e ) {
								}
							}
	
							value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
								backgroundColor :
								"_default" );
						}
	
						value = value.toRgbaString();
					}
					try {
						elem.style[ hook ] = value;
					} catch( e ) {
						// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
					}
				}
			};
			jQuery.fx.step[ hook ] = function( fx ) {
				if ( !fx.colorInit ) {
					fx.start = color( fx.elem, hook );
					fx.end = color( fx.end );
					fx.colorInit = true;
				}
				jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
			};
		});
	
	};
	
	color.hook( stepHooks );
	
	jQuery.cssHooks.borderColor = {
		expand: function( value ) {
			var expanded = {};
	
			each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
				expanded[ "border" + part + "Color" ] = value;
			});
			return expanded;
		}
	};
	
	// Basic color names only.
	// Usage of any of the other color names requires adding yourself or including
	// jquery.color.svg-names.js.
	colors = jQuery.Color.names = {
		// 4.1. Basic color keywords
		aqua: "#00ffff",
		black: "#000000",
		blue: "#0000ff",
		fuchsia: "#ff00ff",
		gray: "#808080",
		green: "#008000",
		lime: "#00ff00",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		purple: "#800080",
		red: "#ff0000",
		silver: "#c0c0c0",
		teal: "#008080",
		white: "#ffffff",
		yellow: "#ffff00",
	
		// 4.2.3. "transparent" color keyword
		transparent: [ null, null, null, 0 ],
	
		_default: "#ffffff"
	};
	
	})( jQuery );
	
	
	/******************************************************************************/
	/****************************** CLASS ANIMATIONS ******************************/
	/******************************************************************************/
	(function() {
	
	var classAnimationActions = [ "add", "remove", "toggle" ],
		shorthandStyles = {
			border: 1,
			borderBottom: 1,
			borderColor: 1,
			borderLeft: 1,
			borderRight: 1,
			borderTop: 1,
			borderWidth: 1,
			margin: 1,
			padding: 1
		};
	
	$.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function( _, prop ) {
		$.fx.step[ prop ] = function( fx ) {
			if ( fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr ) {
				jQuery.style( fx.elem, prop, fx.end );
				fx.setAttr = true;
			}
		};
	});
	
	function getElementStyles( elem ) {
		var key, len,
			style = elem.ownerDocument.defaultView ?
				elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :
				elem.currentStyle,
			styles = {};
	
		if ( style && style.length && style[ 0 ] && style[ style[ 0 ] ] ) {
			len = style.length;
			while ( len-- ) {
				key = style[ len ];
				if ( typeof style[ key ] === "string" ) {
					styles[ $.camelCase( key ) ] = style[ key ];
				}
			}
		// support: Opera, IE <9
		} else {
			for ( key in style ) {
				if ( typeof style[ key ] === "string" ) {
					styles[ key ] = style[ key ];
				}
			}
		}
	
		return styles;
	}
	
	
	function styleDifference( oldStyle, newStyle ) {
		var diff = {},
			name, value;
	
		for ( name in newStyle ) {
			value = newStyle[ name ];
			if ( oldStyle[ name ] !== value ) {
				if ( !shorthandStyles[ name ] ) {
					if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {
						diff[ name ] = value;
					}
				}
			}
		}
	
		return diff;
	}
	
	// support: jQuery <1.8
	if ( !$.fn.addBack ) {
		$.fn.addBack = function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		};
	}
	
	$.effects.animateClass = function( value, duration, easing, callback ) {
		var o = $.speed( duration, easing, callback );
	
		return this.queue( function() {
			var animated = $( this ),
				baseClass = animated.attr( "class" ) || "",
				applyClassChange,
				allAnimations = o.children ? animated.find( "*" ).addBack() : animated;
	
			// map the animated objects to store the original styles.
			allAnimations = allAnimations.map(function() {
				var el = $( this );
				return {
					el: el,
					start: getElementStyles( this )
				};
			});
	
			// apply class change
			applyClassChange = function() {
				$.each( classAnimationActions, function(i, action) {
					if ( value[ action ] ) {
						animated[ action + "Class" ]( value[ action ] );
					}
				});
			};
			applyClassChange();
	
			// map all animated objects again - calculate new styles and diff
			allAnimations = allAnimations.map(function() {
				this.end = getElementStyles( this.el[ 0 ] );
				this.diff = styleDifference( this.start, this.end );
				return this;
			});
	
			// apply original class
			animated.attr( "class", baseClass );
	
			// map all animated objects again - this time collecting a promise
			allAnimations = allAnimations.map(function() {
				var styleInfo = this,
					dfd = $.Deferred(),
					opts = $.extend({}, o, {
						queue: false,
						complete: function() {
							dfd.resolve( styleInfo );
						}
					});
	
				this.el.animate( this.diff, opts );
				return dfd.promise();
			});
	
			// once all animations have completed:
			$.when.apply( $, allAnimations.get() ).done(function() {
	
				// set the final class
				applyClassChange();
	
				// for each animated element,
				// clear all css properties that were animated
				$.each( arguments, function() {
					var el = this.el;
					$.each( this.diff, function(key) {
						el.css( key, "" );
					});
				});
	
				// this is guarnteed to be there if you use jQuery.speed()
				// it also handles dequeuing the next anim...
				o.complete.call( animated[ 0 ] );
			});
		});
	};
	
	$.fn.extend({
		addClass: (function( orig ) {
			return function( classNames, speed, easing, callback ) {
				return speed ?
					$.effects.animateClass.call( this,
						{ add: classNames }, speed, easing, callback ) :
					orig.apply( this, arguments );
			};
		})( $.fn.addClass ),
	
		removeClass: (function( orig ) {
			return function( classNames, speed, easing, callback ) {
				return arguments.length > 1 ?
					$.effects.animateClass.call( this,
						{ remove: classNames }, speed, easing, callback ) :
					orig.apply( this, arguments );
			};
		})( $.fn.removeClass ),
	
		toggleClass: (function( orig ) {
			return function( classNames, force, speed, easing, callback ) {
				if ( typeof force === "boolean" || force === undefined ) {
					if ( !speed ) {
						// without speed parameter
						return orig.apply( this, arguments );
					} else {
						return $.effects.animateClass.call( this,
							(force ? { add: classNames } : { remove: classNames }),
							speed, easing, callback );
					}
				} else {
					// without force parameter
					return $.effects.animateClass.call( this,
						{ toggle: classNames }, force, speed, easing );
				}
			};
		})( $.fn.toggleClass ),
	
		switchClass: function( remove, add, speed, easing, callback) {
			return $.effects.animateClass.call( this, {
				add: add,
				remove: remove
			}, speed, easing, callback );
		}
	});
	
	})();
	
	/******************************************************************************/
	/*********************************** EFFECTS **********************************/
	/******************************************************************************/
	
	(function() {
	
	$.extend( $.effects, {
		version: "1.10.4",
	
		// Saves a set of properties in a data storage
		save: function( element, set ) {
			for( var i=0; i < set.length; i++ ) {
				if ( set[ i ] !== null ) {
					element.data( dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ] );
				}
			}
		},
	
		// Restores a set of previously saved properties from a data storage
		restore: function( element, set ) {
			var val, i;
			for( i=0; i < set.length; i++ ) {
				if ( set[ i ] !== null ) {
					val = element.data( dataSpace + set[ i ] );
					// support: jQuery 1.6.2
					// http://bugs.jquery.com/ticket/9917
					// jQuery 1.6.2 incorrectly returns undefined for any falsy value.
					// We can't differentiate between "" and 0 here, so we just assume
					// empty string since it's likely to be a more common value...
					if ( val === undefined ) {
						val = "";
					}
					element.css( set[ i ], val );
				}
			}
		},
	
		setMode: function( el, mode ) {
			if (mode === "toggle") {
				mode = el.is( ":hidden" ) ? "show" : "hide";
			}
			return mode;
		},
	
		// Translates a [top,left] array into a baseline value
		// this should be a little more flexible in the future to handle a string & hash
		getBaseline: function( origin, original ) {
			var y, x;
			switch ( origin[ 0 ] ) {
				case "top": y = 0; break;
				case "middle": y = 0.5; break;
				case "bottom": y = 1; break;
				default: y = origin[ 0 ] / original.height;
			}
			switch ( origin[ 1 ] ) {
				case "left": x = 0; break;
				case "center": x = 0.5; break;
				case "right": x = 1; break;
				default: x = origin[ 1 ] / original.width;
			}
			return {
				x: x,
				y: y
			};
		},
	
		// Wraps the element around a wrapper that copies position properties
		createWrapper: function( element ) {
	
			// if the element is already wrapped, return it
			if ( element.parent().is( ".ui-effects-wrapper" )) {
				return element.parent();
			}
	
			// wrap the element
			var props = {
					width: element.outerWidth(true),
					height: element.outerHeight(true),
					"float": element.css( "float" )
				},
				wrapper = $( "<div></div>" )
					.addClass( "ui-effects-wrapper" )
					.css({
						fontSize: "100%",
						background: "transparent",
						border: "none",
						margin: 0,
						padding: 0
					}),
				// Store the size in case width/height are defined in % - Fixes #5245
				size = {
					width: element.width(),
					height: element.height()
				},
				active = document.activeElement;
	
			// support: Firefox
			// Firefox incorrectly exposes anonymous content
			// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
			try {
				active.id;
			} catch( e ) {
				active = document.body;
			}
	
			element.wrap( wrapper );
	
			// Fixes #7595 - Elements lose focus when wrapped.
			if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
				$( active ).focus();
			}
	
			wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element
	
			// transfer positioning properties to the wrapper
			if ( element.css( "position" ) === "static" ) {
				wrapper.css({ position: "relative" });
				element.css({ position: "relative" });
			} else {
				$.extend( props, {
					position: element.css( "position" ),
					zIndex: element.css( "z-index" )
				});
				$.each([ "top", "left", "bottom", "right" ], function(i, pos) {
					props[ pos ] = element.css( pos );
					if ( isNaN( parseInt( props[ pos ], 10 ) ) ) {
						props[ pos ] = "auto";
					}
				});
				element.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				});
			}
			element.css(size);
	
			return wrapper.css( props ).show();
		},
	
		removeWrapper: function( element ) {
			var active = document.activeElement;
	
			if ( element.parent().is( ".ui-effects-wrapper" ) ) {
				element.parent().replaceWith( element );
	
				// Fixes #7595 - Elements lose focus when wrapped.
				if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
					$( active ).focus();
				}
			}
	
	
			return element;
		},
	
		setTransition: function( element, list, factor, value ) {
			value = value || {};
			$.each( list, function( i, x ) {
				var unit = element.cssUnit( x );
				if ( unit[ 0 ] > 0 ) {
					value[ x ] = unit[ 0 ] * factor + unit[ 1 ];
				}
			});
			return value;
		}
	});
	
	// return an effect options object for the given parameters:
	function _normalizeArguments( effect, options, speed, callback ) {
	
		// allow passing all options as the first parameter
		if ( $.isPlainObject( effect ) ) {
			options = effect;
			effect = effect.effect;
		}
	
		// convert to an object
		effect = { effect: effect };
	
		// catch (effect, null, ...)
		if ( options == null ) {
			options = {};
		}
	
		// catch (effect, callback)
		if ( $.isFunction( options ) ) {
			callback = options;
			speed = null;
			options = {};
		}
	
		// catch (effect, speed, ?)
		if ( typeof options === "number" || $.fx.speeds[ options ] ) {
			callback = speed;
			speed = options;
			options = {};
		}
	
		// catch (effect, options, callback)
		if ( $.isFunction( speed ) ) {
			callback = speed;
			speed = null;
		}
	
		// add options to effect
		if ( options ) {
			$.extend( effect, options );
		}
	
		speed = speed || options.duration;
		effect.duration = $.fx.off ? 0 :
			typeof speed === "number" ? speed :
			speed in $.fx.speeds ? $.fx.speeds[ speed ] :
			$.fx.speeds._default;
	
		effect.complete = callback || options.complete;
	
		return effect;
	}
	
	function standardAnimationOption( option ) {
		// Valid standard speeds (nothing, number, named speed)
		if ( !option || typeof option === "number" || $.fx.speeds[ option ] ) {
			return true;
		}
	
		// Invalid strings - treat as "normal" speed
		if ( typeof option === "string" && !$.effects.effect[ option ] ) {
			return true;
		}
	
		// Complete callback
		if ( $.isFunction( option ) ) {
			return true;
		}
	
		// Options hash (but not naming an effect)
		if ( typeof option === "object" && !option.effect ) {
			return true;
		}
	
		// Didn't match any standard API
		return false;
	}
	
	$.fn.extend({
		effect: function( /* effect, options, speed, callback */ ) {
			var args = _normalizeArguments.apply( this, arguments ),
				mode = args.mode,
				queue = args.queue,
				effectMethod = $.effects.effect[ args.effect ];
	
			if ( $.fx.off || !effectMethod ) {
				// delegate to the original method (e.g., .show()) if possible
				if ( mode ) {
					return this[ mode ]( args.duration, args.complete );
				} else {
					return this.each( function() {
						if ( args.complete ) {
							args.complete.call( this );
						}
					});
				}
			}
	
			function run( next ) {
				var elem = $( this ),
					complete = args.complete,
					mode = args.mode;
	
				function done() {
					if ( $.isFunction( complete ) ) {
						complete.call( elem[0] );
					}
					if ( $.isFunction( next ) ) {
						next();
					}
				}
	
				// If the element already has the correct final state, delegate to
				// the core methods so the internal tracking of "olddisplay" works.
				if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {
					elem[ mode ]();
					done();
				} else {
					effectMethod.call( elem[0], args, done );
				}
			}
	
			return queue === false ? this.each( run ) : this.queue( queue || "fx", run );
		},
	
		show: (function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "show";
					return this.effect.call( this, args );
				}
			};
		})( $.fn.show ),
	
		hide: (function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "hide";
					return this.effect.call( this, args );
				}
			};
		})( $.fn.hide ),
	
		toggle: (function( orig ) {
			return function( option ) {
				if ( standardAnimationOption( option ) || typeof option === "boolean" ) {
					return orig.apply( this, arguments );
				} else {
					var args = _normalizeArguments.apply( this, arguments );
					args.mode = "toggle";
					return this.effect.call( this, args );
				}
			};
		})( $.fn.toggle ),
	
		// helper functions
		cssUnit: function(key) {
			var style = this.css( key ),
				val = [];
	
			$.each( [ "em", "px", "%", "pt" ], function( i, unit ) {
				if ( style.indexOf( unit ) > 0 ) {
					val = [ parseFloat( style ), unit ];
				}
			});
			return val;
		}
	});
	
	})();
	
	/******************************************************************************/
	/*********************************** EASING ***********************************/
	/******************************************************************************/
	
	(function() {
	
	// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
	
	var baseEasings = {};
	
	$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
		baseEasings[ name ] = function( p ) {
			return Math.pow( p, i + 2 );
		};
	});
	
	$.extend( baseEasings, {
		Sine: function ( p ) {
			return 1 - Math.cos( p * Math.PI / 2 );
		},
		Circ: function ( p ) {
			return 1 - Math.sqrt( 1 - p * p );
		},
		Elastic: function( p ) {
			return p === 0 || p === 1 ? p :
				-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
		},
		Back: function( p ) {
			return p * p * ( 3 * p - 2 );
		},
		Bounce: function ( p ) {
			var pow2,
				bounce = 4;
	
			while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
			return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
		}
	});
	
	$.each( baseEasings, function( name, easeIn ) {
		$.easing[ "easeIn" + name ] = easeIn;
		$.easing[ "easeOut" + name ] = function( p ) {
			return 1 - easeIn( 1 - p );
		};
		$.easing[ "easeInOut" + name ] = function( p ) {
			return p < 0.5 ?
				easeIn( p * 2 ) / 2 :
				1 - easeIn( p * -2 + 2 ) / 2;
		};
	});
	
	})();
	
	})(jQuery);


/***/ },
/* 51 */
/*!*******************************!*\
  !*** ./models/audioUpload.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var ArtistsCollection = __webpack_require__(/*! ../collections/artists.js */ 45);
	var TypesCollection = __webpack_require__(/*! ../collections/types.js */ 52);
	
	module.exports = Backbone.Model.extend({
	
	    defaults: {
	        size: 0,
	        stepCount: 4
	    },
	
	    initialize: function() {
	        this.set("artistOptions", new ArtistsCollection().toJSON());
	        this.set("typeOptions", new TypesCollection().toJSON());
	    },
	
	    setStep: function (step) {
	
	        var i, 
	            result, 
	            updateObj = {},
	            stepCount = this.get("stepCount");
	
	        updateObj.currentStep = step;
	
	        for (i = 1; i <= stepCount; i++) {
	            result = i === step;
	            updateObj["step" + i] = result;
	        }
	
	        this.set(updateObj);
	    },
	
	    stepBack: function () {
	        var cs = this.get("currentStep");
	        if (cs > 1) {
	            this.setStep(cs - 1);
	        }
	    },
	
	    stepForward: function () {
	        var cs = this.get("currentStep"),
	            sc = this.get("stepCount");
	        if (cs < sc) {
	            this.setStep(cs + 1);
	        }
	    },
	
	    getSaveProps: function(){
	        var that = this, attrs = {};
	        [
	            "actID",
	            "recDate",
	            "recLocation",
	            "recNotes",
	            "actName",
	            "size",
	            "tempName",
	            "title",
	            "tags",
	            "duration"
	
	        ].map(function(prop){
	            attrs[prop] = that.get(prop);
	        });
	
	        return attrs;
	    }
	
	});

/***/ },
/* 52 */
/*!******************************!*\
  !*** ./collections/types.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var TypeModel = __webpack_require__(/*! ../models/type.js */ 53);
	
	module.exports = Backbone.Collection.extend({
	    model: TypeModel,
	    url: "api/types",
	    parse: function(response){
	        return response[0];
	    }
	});

/***/ },
/* 53 */
/*!************************!*\
  !*** ./models/type.js ***!
  \************************/
/***/ function(module, exports) {

	module.exports  = Backbone.Model.extend({});

/***/ },
/* 54 */
/*!************************************!*\
  !*** ./views/admin/audioUpload.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! jquery-ui/button */ 55);
	var $ = __webpack_require__(/*! jquery */ 29);
	var _ = __webpack_require__(/*! underscore */ 31);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	var Backbone = __webpack_require__(/*! backbone */ 30);
	var utils = __webpack_require__(/*! ../../utils.js */ 40);
	
	var RecordingAddEdit = __webpack_require__(/*! ./recordingAddEdit.js */ 37);
	var RecordingModel = __webpack_require__(/*! ../../models/recording.js */ 48);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "audioUploadContent",
	    className: "audioUpload",
	    model: {},
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.model.bind('change', this.render, this);
	
	        // Start from the beginning
	        this.model.setStep(1);
	    },
	
	    events: {
	        "change #uploadFile": "initiateUpload",
	        "click .backBtn": "stepBack",
	        "click .nextBtn": "stepForward",
	        "click #step3BackBtn": "backToStepTwo",
	        "click #step3NextBtn": "onToStepFour",
	        "click #step4NextBtn": "confirmUpload",
	        "change #actID": "selectArtist"
	    },
	
	    initiateUpload: function (e) {
	
	        var that = this,
	            file = e.target.files[0],
	            formData = new FormData(),
	            xhr_removeuploads = new XMLHttpRequest(),
	            xhr_upload = new XMLHttpRequest();
	
	        // show the "uploading" message
	        var loadingMessage = utils.createNotification({
	            message: "Uploading file to server, please wait..."
	        });
	
	        // empty the temporary uploads folder on the server
	        xhr_removeuploads.open('DELETE', '/api/removetempuploads', true);
	        xhr_removeuploads.onload = function(){
	
	            formData.append('uploadFile', file);
	            xhr_upload.open('POST', "/api/upload", true);
	            xhr_upload.onload = function (data) {
	                var response = (JSON.parse(data.currentTarget.responseText));
	                that.model.set("tempName", response.tempName);
	                that.model.set("size", response.size);
	                loadingMessage.close();
	                that.model.setStep(2);
	            };
	            xhr_upload.onerror = function (data) {
	                alert("error uploading the file");
	                console.log(data);
	            };
	            xhr_upload.send(formData);
	        };
	        xhr_removeuploads.onerror = function(){
	            console.log("could not recreate the remote uploads folder");
	        };
	        xhr_removeuploads.send();
	    },
	
	    confirmUpload: function() {
	
	        var recording = new RecordingModel(),
	            that = this;
	
	        recording.save(this.model.getSaveProps(), {
	            success: function(data) {
	                adminApp.collections.recordings.fetch({
	                    reset: true,
	                    success: function(){
	                        that.model.clear().set(that.model.defaults);
	                        that.model.setStep(1);
	                        adminApp.routers.main.navigate('/recordings/highlight/' + data.id, {trigger: true});
	                    },
	                    error: function(err){
	                        console.log(err);
	                    }
	                });
	            },
	            error: function(model, response, options) {
	                console.log(model);
	                console.log(response);
	                console.log(options);
	            }
	        });
	    },
	
	    backToStepTwo: function(){
	        this.stashFormData();
	        this.stepBack();
	    },
	
	    onToStepFour: function () {
	        this.stashFormData();
	        if (this.$el.find("#newRecordingInfo").validate().form()) {
	            this.model.stepForward();
	        }
	    },
	
	    stashFormData: function(){
	        this.model.set(this.$el.find("#newRecordingInfo").serializeJSON());
	        this.model.set("actName", this.$el.find("select[name=actID] option:selected").html());
	    },
	
	    stepBack: function() {
	        this.model.stepBack();
	    },
	
	    stepForward: function() {
	        this.model.stepForward();
	    },
	
	    selectArtist: function(e){
	        if(e.target.value === "new"){
	            this.stashFormData();
	            adminApp.routers.main.navigate("/artists", {trigger:true});
	        }
	    },
	
	    render: function () {
	
	        var that = this;
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	
	
	        // only for step 2
	        if(this.model.get('step2')){
	
	            // get the audio file's duration from the audio object
	            if (!this.model.get('duration')){
	                var audioTag = document.getElementById("uploadedFile");
	                audioTag.addEventListener('loadedmetadata', function(e){
	                    that.model.set('duration', utils.formattedDuration(audioTag.duration));
	                }, false);
	            }
	        }
	
	        // only for step 3
	        if(this.model.get("step3")){
	            var recordingInfoForm = new RecordingAddEdit({
	                model: this.model,
	                template: $("#template_recordingAddEdit").html()
	            });
	            this.$el.find(".newRecordingInfoFormContainer").html(recordingInfoForm.render().el);
	            this.$el.find(".datepicker").datepicker({
	                changeMonth: true,
	                changeYear: true
	            });
	        }
	
	        this.$el.find("button").button();
	
	        // sub-views need this
	        this.delegateEvents();
	
	        return this;
	    }
	});

/***/ },
/* 55 */,
/* 56 */,
/* 57 */
/*!**********************************!*\
  !*** ./collections/playlists.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var PlaylistModel = __webpack_require__(/*! ../models/playlist.js */ 58);
	
	module.exports = Backbone.Collection.extend({
	
	    model: PlaylistModel,
	    url: "api/playlists",
	    sort_key: "name",
	
	    initialize: function() {
	        this.bind("remove", function (model) {
	            model.destroy({wait: true});
	        });
	    },
	
	    comparator: function(item) {
	        return item.get(this.sort_key);
	    },
	
	    sortByField: function(fieldName) {
	        this.sort_key = fieldName;
	        this.sort();
	    }
	
	});

/***/ },
/* 58 */
/*!****************************!*\
  !*** ./models/playlist.js ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = Backbone.Model.extend({
	    urlRoot: "api/playlist"
	});

/***/ },
/* 59 */
/*!**********************************!*\
  !*** ./views/admin/playlists.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! underscore */ 31);
	var Backbone = __webpack_require__(/*! backbone */ 30);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "playlistsContent",
	    className: "playlists",
	    selectedId: null,
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.collection, 'reset sort remove fetch change', this.render);
	        this.collection.fetch();
	    },
	
	    render: function(){
	        var compiledTemplate = Mustache.to_html(this.template, { playlists: this.collection.toJSON()});
	        this.$el.html(compiledTemplate);
	        return this;
	    }
	});

/***/ },
/* 60 */
/*!*****************************!*\
  !*** ./collections/tags.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var TagModel = __webpack_require__(/*! ../models/tag.js */ 61);
	
	module.exports = Backbone.Collection.extend({
	
	    model: TagModel,
	    url: "api/tags",
	    sort_key: "name",
	
	    initialize: function() {
	        this.bind("remove", function (model) {
	            model.destroy({wait: true});
	        });
	    },
	
	    comparator: function(item) {
	        return item.get(this.sort_key);
	    },
	
	    sortByField: function(fieldName) {
	        this.sort_key = fieldName;
	        this.sort();
	    }
	
	});

/***/ },
/* 61 */
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = Backbone.Model.extend({
	    urlRoot: "api/tag"
	});

/***/ },
/* 62 */
/*!*****************************!*\
  !*** ./views/admin/tags.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! underscore */ 31);
	var Backbone = __webpack_require__(/*! backbone */ 30);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "tagsContent",
	    className: "tags",
	    selectedId: null,
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.collection, 'reset sort remove fetch change', this.render);
	        this.collection.fetch();
	    },
	
	    render: function(){
	        var compiledTemplate = Mustache.to_html(this.template, { tags: this.collection.toJSON()});
	        this.$el.html(compiledTemplate);
	        return this;
	    }
	});

/***/ },
/* 63 */,
/* 64 */,
/* 65 */
/*!******************************!*\
  !*** ./collections/queue.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	Backbone.LocalStorage = __webpack_require__(/*! backbone.localstorage */ 66);
	var $ = __webpack_require__(/*! jquery */ 29);
	var RecordingModel = __webpack_require__(/*! ../models/recording.js */ 48);
	
	var localStorageKey = "x7-queue";
	
	module.exports = Backbone.Collection.extend({
	
	    model: RecordingModel,
	    localStorage: new Backbone.LocalStorage(localStorageKey),
	
	    initialize: function(){
	        var that = this;
	        this.on('update', function(){
	            // localstorage adapter unfortunately doesn't save collections in
	            // the correct order after they have been re-ordered so doing it manually
	            window.localStorage.setItem(localStorageKey, that.pluck('id'));
	        });
	    },
	
	    // TODO - remove models from local storage when they are removed from the collection
	
	
	    addRecording: function(recording, position){
	        this.add(recording, {at: position});
	    },
	
	    pushRecording: function(recording){
	        var copyOfRecordingModel = recording.clone();
	        this.push(copyOfRecordingModel);
	        copyOfRecordingModel.save();
	    },
	
	    reorder: function(id, newIndex){
	
	        // remove model with given id
	        var modelToMove = this.remove(id, {silent: true});
	
	        // re-insert it in the new position
	        this.add(modelToMove, {
	            at: newIndex
	        });
	
	        modelToMove.save();
	    }
	
	});

/***/ },
/* 66 */
/*!***********************************************************!*\
  !*** ../~/backbone.localstorage/backbone.localStorage.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Backbone localStorage Adapter
	 * Version 1.1.16
	 *
	 * https://github.com/jeromegn/Backbone.localStorage
	 */
	(function (root, factory) {
	  if (true) {
	    module.exports = factory(__webpack_require__(/*! backbone */ 30));
	  } else if (typeof define === "function" && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(["backbone"], function(Backbone) {
	      // Use global variables if the locals are undefined.
	      return factory(Backbone || root.Backbone);
	    });
	  } else {
	    factory(Backbone);
	  }
	}(this, function(Backbone) {
	// A simple module to replace `Backbone.sync` with *localStorage*-based
	// persistence. Models are given GUIDS, and saved into a JSON object. Simple
	// as that.
	
	// Generate four random hex digits.
	function S4() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	
	// Generate a pseudo-GUID by concatenating random hexadecimal.
	function guid() {
	   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};
	
	function isObject(item) {
	  return item === Object(item);
	}
	
	function contains(array, item) {
	  var i = array.length;
	  while (i--) if (array[i] === item) return true;
	  return false;
	}
	
	function extend(obj, props) {
	  for (var key in props) obj[key] = props[key]
	  return obj;
	}
	
	function result(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return (typeof value === 'function') ? object[property]() : value;
	}
	
	// Our Store is represented by a single JS object in *localStorage*. Create it
	// with a meaningful name, like the name you'd give a table.
	// window.Store is deprectated, use Backbone.LocalStorage instead
	Backbone.LocalStorage = window.Store = function(name, serializer) {
	  if( !this.localStorage ) {
	    throw "Backbone.localStorage: Environment does not support localStorage."
	  }
	  this.name = name;
	  this.serializer = serializer || {
	    serialize: function(item) {
	      return isObject(item) ? JSON.stringify(item) : item;
	    },
	    // fix for "illegal access" error on Android when JSON.parse is passed null
	    deserialize: function (data) {
	      return data && JSON.parse(data);
	    }
	  };
	  var store = this.localStorage().getItem(this.name);
	  this.records = (store && store.split(",")) || [];
	};
	
	extend(Backbone.LocalStorage.prototype, {
	
	  // Save the current state of the **Store** to *localStorage*.
	  save: function() {
	    this.localStorage().setItem(this.name, this.records.join(","));
	  },
	
	  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
	  // have an id of it's own.
	  create: function(model) {
	    if (!model.id && model.id !== 0) {
	      model.id = guid();
	      model.set(model.idAttribute, model.id);
	    }
	    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
	    this.records.push(model.id.toString());
	    this.save();
	    return this.find(model);
	  },
	
	  // Update a model by replacing its copy in `this.data`.
	  update: function(model) {
	    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
	    var modelId = model.id.toString();
	    if (!contains(this.records, modelId)) {
	      this.records.push(modelId);
	      this.save();
	    }
	    return this.find(model);
	  },
	
	  // Retrieve a model from `this.data` by id.
	  find: function(model) {
	    return this.serializer.deserialize(this.localStorage().getItem(this._itemName(model.id)));
	  },
	
	  // Return the array of all models currently in storage.
	  findAll: function() {
	    var result = [];
	    for (var i = 0, id, data; i < this.records.length; i++) {
	      id = this.records[i];
	      data = this.serializer.deserialize(this.localStorage().getItem(this._itemName(id)));
	      if (data != null) result.push(data);
	    }
	    return result;
	  },
	
	  // Delete a model from `this.data`, returning it.
	  destroy: function(model) {
	    this.localStorage().removeItem(this._itemName(model.id));
	    var modelId = model.id.toString();
	    for (var i = 0, id; i < this.records.length; i++) {
	      if (this.records[i] === modelId) {
	        this.records.splice(i, 1);
	      }
	    }
	    this.save();
	    return model;
	  },
	
	  localStorage: function() {
	    return localStorage;
	  },
	
	  // Clear localStorage for specific collection.
	  _clear: function() {
	    var local = this.localStorage(),
	      itemRe = new RegExp("^" + this.name + "-");
	
	    // Remove id-tracking item (e.g., "foo").
	    local.removeItem(this.name);
	
	    // Match all data items (e.g., "foo-ID") and remove.
	    for (var k in local) {
	      if (itemRe.test(k)) {
	        local.removeItem(k);
	      }
	    }
	
	    this.records.length = 0;
	  },
	
	  // Size of localStorage.
	  _storageSize: function() {
	    return this.localStorage().length;
	  },
	
	  _itemName: function(id) {
	    return this.name+"-"+id;
	  }
	
	});
	
	// localSync delegate to the model or collection's
	// *localStorage* property, which should be an instance of `Store`.
	// window.Store.sync and Backbone.localSync is deprecated, use Backbone.LocalStorage.sync instead
	Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {
	  var store = result(model, 'localStorage') || result(model.collection, 'localStorage');
	
	  var resp, errorMessage;
	  //If $ is having Deferred - use it.
	  var syncDfd = Backbone.$ ?
	    (Backbone.$.Deferred && Backbone.$.Deferred()) :
	    (Backbone.Deferred && Backbone.Deferred());
	
	  try {
	
	    switch (method) {
	      case "read":
	        resp = model.id != undefined ? store.find(model) : store.findAll();
	        break;
	      case "create":
	        resp = store.create(model);
	        break;
	      case "update":
	        resp = store.update(model);
	        break;
	      case "delete":
	        resp = store.destroy(model);
	        break;
	    }
	
	  } catch(error) {
	    if (error.code === 22 && store._storageSize() === 0)
	      errorMessage = "Private browsing is unsupported";
	    else
	      errorMessage = error.message;
	  }
	
	  if (resp) {
	    if (options && options.success) {
	      if (Backbone.VERSION === "0.9.10") {
	        options.success(model, resp, options);
	      } else {
	        options.success(resp);
	      }
	    }
	    if (syncDfd) {
	      syncDfd.resolve(resp);
	    }
	
	  } else {
	    errorMessage = errorMessage ? errorMessage
	                                : "Record Not Found";
	
	    if (options && options.error)
	      if (Backbone.VERSION === "0.9.10") {
	        options.error(model, errorMessage, options);
	      } else {
	        options.error(errorMessage);
	      }
	
	    if (syncDfd)
	      syncDfd.reject(errorMessage);
	  }
	
	  // add compatibility with $.ajax
	  // always execute callback for success and error
	  if (options && options.complete) options.complete(resp);
	
	  return syncDfd && syncDfd.promise();
	};
	
	Backbone.ajaxSync = Backbone.sync;
	
	Backbone.getSyncMethod = function(model, options) {
	  var forceAjaxSync = options && options.ajaxSync;
	
	  if(!forceAjaxSync && (result(model, 'localStorage') || result(model.collection, 'localStorage'))) {
	    return Backbone.localSync;
	  }
	
	  return Backbone.ajaxSync;
	};
	
	// Override 'Backbone.sync' to default to localSync,
	// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
	Backbone.sync = function(method, model, options) {
	  return Backbone.getSyncMethod(model, options).apply(this, [method, model, options]);
	};
	
	return Backbone.LocalStorage;
	}));


/***/ },
/* 67 */
/*!******************************!*\
  !*** ./views/admin/queue.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var QueueBaseView = __webpack_require__(/*! ./queueBaseView.js */ 92);
	
	module.exports = QueueBaseView.extend({
	
	    id: "queueContent"
	
	});

/***/ },
/* 68 */
/*!**********************************!*\
  !*** ../~/jquery-ui/sortable.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var jQuery = __webpack_require__(/*! jquery */ 29);
	__webpack_require__(/*! ./core */ 39);
	__webpack_require__(/*! ./mouse */ 69);
	__webpack_require__(/*! ./widget */ 56);
	
	/*!
	 * jQuery UI Sortable 1.10.4
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/sortable/
	 *
	 * Depends:
	 *	jquery.ui.core.js
	 *	jquery.ui.mouse.js
	 *	jquery.ui.widget.js
	 */
	(function( $, undefined ) {
	
	function isOverAxis( x, reference, size ) {
		return ( x > reference ) && ( x < ( reference + size ) );
	}
	
	function isFloating(item) {
		return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
	}
	
	$.widget("ui.sortable", $.ui.mouse, {
		version: "1.10.4",
		widgetEventPrefix: "sort",
		ready: false,
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000,
	
			// callbacks
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_create: function() {
	
			var o = this.options;
			this.containerCache = {};
			this.element.addClass("ui-sortable");
	
			//Get the items
			this.refresh();
	
			//Let's determine if the items are being displayed horizontally
			this.floating = this.items.length ? o.axis === "x" || isFloating(this.items[0].item) : false;
	
			//Let's determine the parent's offset
			this.offset = this.element.offset();
	
			//Initialize mouse events for interaction
			this._mouseInit();
	
			//We're ready to go
			this.ready = true;
	
		},
	
		_destroy: function() {
			this.element
				.removeClass("ui-sortable ui-sortable-disabled");
			this._mouseDestroy();
	
			for ( var i = this.items.length - 1; i >= 0; i-- ) {
				this.items[i].item.removeData(this.widgetName + "-item");
			}
	
			return this;
		},
	
		_setOption: function(key, value){
			if ( key === "disabled" ) {
				this.options[ key ] = value;
	
				this.widget().toggleClass( "ui-sortable-disabled", !!value );
			} else {
				// Don't call widget base _setOption for disable as it adds ui-state-disabled class
				$.Widget.prototype._setOption.apply(this, arguments);
			}
		},
	
		_mouseCapture: function(event, overrideHandle) {
			var currentItem = null,
				validHandle = false,
				that = this;
	
			if (this.reverting) {
				return false;
			}
	
			if(this.options.disabled || this.options.type === "static") {
				return false;
			}
	
			//We have to refresh the items data once first
			this._refreshItems(event);
	
			//Find out if the clicked node (or one of its parents) is a actual item in this.items
			$(event.target).parents().each(function() {
				if($.data(this, that.widgetName + "-item") === that) {
					currentItem = $(this);
					return false;
				}
			});
			if($.data(event.target, that.widgetName + "-item") === that) {
				currentItem = $(event.target);
			}
	
			if(!currentItem) {
				return false;
			}
			if(this.options.handle && !overrideHandle) {
				$(this.options.handle, currentItem).find("*").addBack().each(function() {
					if(this === event.target) {
						validHandle = true;
					}
				});
				if(!validHandle) {
					return false;
				}
			}
	
			this.currentItem = currentItem;
			this._removeCurrentsFromItems();
			return true;
	
		},
	
		_mouseStart: function(event, overrideHandle, noActivation) {
	
			var i, body,
				o = this.options;
	
			this.currentContainer = this;
	
			//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
			this.refreshPositions();
	
			//Create and append the visible helper
			this.helper = this._createHelper(event);
	
			//Cache the helper size
			this._cacheHelperProportions();
	
			/*
			 * - Position generation -
			 * This block generates everything position related - it's the core of draggables.
			 */
	
			//Cache the margins of the original element
			this._cacheMargins();
	
			//Get the next scrolling parent
			this.scrollParent = this.helper.scrollParent();
	
			//The element's absolute position on the page minus margins
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
	
			$.extend(this.offset, {
				click: { //Where the click happened, relative to the element
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
			});
	
			// Only after we got the offset, we can change the helper's position to absolute
			// TODO: Still need to figure out a way to make relative sorting possible
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");
	
			//Generate the original position
			this.originalPosition = this._generatePosition(event);
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;
	
			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
	
			//Cache the former DOM position
			this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };
	
			//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
			if(this.helper[0] !== this.currentItem[0]) {
				this.currentItem.hide();
			}
	
			//Create the placeholder
			this._createPlaceholder();
	
			//Set a containment if given in the options
			if(o.containment) {
				this._setContainment();
			}
	
			if( o.cursor && o.cursor !== "auto" ) { // cursor option
				body = this.document.find( "body" );
	
				// support: IE
				this.storedCursor = body.css( "cursor" );
				body.css( "cursor", o.cursor );
	
				this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );
			}
	
			if(o.opacity) { // opacity option
				if (this.helper.css("opacity")) {
					this._storedOpacity = this.helper.css("opacity");
				}
				this.helper.css("opacity", o.opacity);
			}
	
			if(o.zIndex) { // zIndex option
				if (this.helper.css("zIndex")) {
					this._storedZIndex = this.helper.css("zIndex");
				}
				this.helper.css("zIndex", o.zIndex);
			}
	
			//Prepare scrolling
			if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
				this.overflowOffset = this.scrollParent.offset();
			}
	
			//Call callbacks
			this._trigger("start", event, this._uiHash());
	
			//Recache the helper size
			if(!this._preserveHelperProportions) {
				this._cacheHelperProportions();
			}
	
	
			//Post "activate" events to possible containers
			if( !noActivation ) {
				for ( i = this.containers.length - 1; i >= 0; i-- ) {
					this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
				}
			}
	
			//Prepare possible droppables
			if($.ui.ddmanager) {
				$.ui.ddmanager.current = this;
			}
	
			if ($.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
	
			this.dragging = true;
	
			this.helper.addClass("ui-sortable-helper");
			this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
			return true;
	
		},
	
		_mouseDrag: function(event) {
			var i, item, itemElement, intersection,
				o = this.options,
				scrolled = false;
	
			//Compute the helpers position
			this.position = this._generatePosition(event);
			this.positionAbs = this._convertPositionTo("absolute");
	
			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs;
			}
	
			//Do scrolling
			if(this.options.scroll) {
				if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
	
					if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
					} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
					}
	
					if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
					} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
					}
	
				} else {
	
					if(event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
						scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
					} else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
						scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
					}
	
					if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
						scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
					} else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
						scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
					}
	
				}
	
				if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
					$.ui.ddmanager.prepareOffsets(this, event);
				}
			}
	
			//Regenerate the absolute position used for position checks
			this.positionAbs = this._convertPositionTo("absolute");
	
			//Set the helper position
			if(!this.options.axis || this.options.axis !== "y") {
				this.helper[0].style.left = this.position.left+"px";
			}
			if(!this.options.axis || this.options.axis !== "x") {
				this.helper[0].style.top = this.position.top+"px";
			}
	
			//Rearrange
			for (i = this.items.length - 1; i >= 0; i--) {
	
				//Cache variables and intersection, continue if no intersection
				item = this.items[i];
				itemElement = item.item[0];
				intersection = this._intersectsWithPointer(item);
				if (!intersection) {
					continue;
				}
	
				// Only put the placeholder inside the current Container, skip all
				// items from other containers. This works because when moving
				// an item from one container to another the
				// currentContainer is switched before the placeholder is moved.
				//
				// Without this, moving items in "sub-sortables" can cause
				// the placeholder to jitter beetween the outer and inner container.
				if (item.instance !== this.currentContainer) {
					continue;
				}
	
				// cannot intersect with itself
				// no useless actions that have been done before
				// no action if the item moved is the parent of the item checked
				if (itemElement !== this.currentItem[0] &&
					this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
					!$.contains(this.placeholder[0], itemElement) &&
					(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
				) {
	
					this.direction = intersection === 1 ? "down" : "up";
	
					if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
						this._rearrange(event, item);
					} else {
						break;
					}
	
					this._trigger("change", event, this._uiHash());
					break;
				}
			}
	
			//Post events to containers
			this._contactContainers(event);
	
			//Interconnect with droppables
			if($.ui.ddmanager) {
				$.ui.ddmanager.drag(this, event);
			}
	
			//Call callbacks
			this._trigger("sort", event, this._uiHash());
	
			this.lastPositionAbs = this.positionAbs;
			return false;
	
		},
	
		_mouseStop: function(event, noPropagation) {
	
			if(!event) {
				return;
			}
	
			//If we are using droppables, inform the manager about the drop
			if ($.ui.ddmanager && !this.options.dropBehaviour) {
				$.ui.ddmanager.drop(this, event);
			}
	
			if(this.options.revert) {
				var that = this,
					cur = this.placeholder.offset(),
					axis = this.options.axis,
					animation = {};
	
				if ( !axis || axis === "x" ) {
					animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);
				}
				if ( !axis || axis === "y" ) {
					animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
				}
				this.reverting = true;
				$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {
					that._clear(event);
				});
			} else {
				this._clear(event, noPropagation);
			}
	
			return false;
	
		},
	
		cancel: function() {
	
			if(this.dragging) {
	
				this._mouseUp({ target: null });
	
				if(this.options.helper === "original") {
					this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
				} else {
					this.currentItem.show();
				}
	
				//Post deactivating events to containers
				for (var i = this.containers.length - 1; i >= 0; i--){
					this.containers[i]._trigger("deactivate", null, this._uiHash(this));
					if(this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", null, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
	
			}
	
			if (this.placeholder) {
				//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
				if(this.placeholder[0].parentNode) {
					this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
				}
				if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
					this.helper.remove();
				}
	
				$.extend(this, {
					helper: null,
					dragging: false,
					reverting: false,
					_noFinalSort: null
				});
	
				if(this.domPosition.prev) {
					$(this.domPosition.prev).after(this.currentItem);
				} else {
					$(this.domPosition.parent).prepend(this.currentItem);
				}
			}
	
			return this;
	
		},
	
		serialize: function(o) {
	
			var items = this._getItemsAsjQuery(o && o.connected),
				str = [];
			o = o || {};
	
			$(items).each(function() {
				var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
				if (res) {
					str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));
				}
			});
	
			if(!str.length && o.key) {
				str.push(o.key + "=");
			}
	
			return str.join("&");
	
		},
	
		toArray: function(o) {
	
			var items = this._getItemsAsjQuery(o && o.connected),
				ret = [];
	
			o = o || {};
	
			items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });
			return ret;
	
		},
	
		/* Be careful with the following core functions */
		_intersectsWith: function(item) {
	
			var x1 = this.positionAbs.left,
				x2 = x1 + this.helperProportions.width,
				y1 = this.positionAbs.top,
				y2 = y1 + this.helperProportions.height,
				l = item.left,
				r = l + item.width,
				t = item.top,
				b = t + item.height,
				dyClick = this.offset.click.top,
				dxClick = this.offset.click.left,
				isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),
				isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),
				isOverElement = isOverElementHeight && isOverElementWidth;
	
			if ( this.options.tolerance === "pointer" ||
				this.options.forcePointerForContainers ||
				(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
			) {
				return isOverElement;
			} else {
	
				return (l < x1 + (this.helperProportions.width / 2) && // Right Half
					x2 - (this.helperProportions.width / 2) < r && // Left Half
					t < y1 + (this.helperProportions.height / 2) && // Bottom Half
					y2 - (this.helperProportions.height / 2) < b ); // Top Half
	
			}
		},
	
		_intersectsWithPointer: function(item) {
	
			var isOverElementHeight = (this.options.axis === "x") || isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
				isOverElementWidth = (this.options.axis === "y") || isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
				isOverElement = isOverElementHeight && isOverElementWidth,
				verticalDirection = this._getDragVerticalDirection(),
				horizontalDirection = this._getDragHorizontalDirection();
	
			if (!isOverElement) {
				return false;
			}
	
			return this.floating ?
				( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )
				: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );
	
		},
	
		_intersectsWithSides: function(item) {
	
			var isOverBottomHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
				isOverRightHalf = isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
				verticalDirection = this._getDragVerticalDirection(),
				horizontalDirection = this._getDragHorizontalDirection();
	
			if (this.floating && horizontalDirection) {
				return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
			} else {
				return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
			}
	
		},
	
		_getDragVerticalDirection: function() {
			var delta = this.positionAbs.top - this.lastPositionAbs.top;
			return delta !== 0 && (delta > 0 ? "down" : "up");
		},
	
		_getDragHorizontalDirection: function() {
			var delta = this.positionAbs.left - this.lastPositionAbs.left;
			return delta !== 0 && (delta > 0 ? "right" : "left");
		},
	
		refresh: function(event) {
			this._refreshItems(event);
			this.refreshPositions();
			return this;
		},
	
		_connectWith: function() {
			var options = this.options;
			return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
		},
	
		_getItemsAsjQuery: function(connected) {
	
			var i, j, cur, inst,
				items = [],
				queries = [],
				connectWith = this._connectWith();
	
			if(connectWith && connected) {
				for (i = connectWith.length - 1; i >= 0; i--){
					cur = $(connectWith[i]);
					for ( j = cur.length - 1; j >= 0; j--){
						inst = $.data(cur[j], this.widgetFullName);
						if(inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
						}
					}
				}
			}
	
			queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
	
			function addItems() {
				items.push( this );
			}
			for (i = queries.length - 1; i >= 0; i--){
				queries[i][0].each( addItems );
			}
	
			return $(items);
	
		},
	
		_removeCurrentsFromItems: function() {
	
			var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
	
			this.items = $.grep(this.items, function (item) {
				for (var j=0; j < list.length; j++) {
					if(list[j] === item.item[0]) {
						return false;
					}
				}
				return true;
			});
	
		},
	
		_refreshItems: function(event) {
	
			this.items = [];
			this.containers = [this];
	
			var i, j, cur, inst, targetData, _queries, item, queriesLength,
				items = this.items,
				queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
				connectWith = this._connectWith();
	
			if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
				for (i = connectWith.length - 1; i >= 0; i--){
					cur = $(connectWith[i]);
					for (j = cur.length - 1; j >= 0; j--){
						inst = $.data(cur[j], this.widgetFullName);
						if(inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
							this.containers.push(inst);
						}
					}
				}
			}
	
			for (i = queries.length - 1; i >= 0; i--) {
				targetData = queries[i][1];
				_queries = queries[i][0];
	
				for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {
					item = $(_queries[j]);
	
					item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)
	
					items.push({
						item: item,
						instance: targetData,
						width: 0, height: 0,
						left: 0, top: 0
					});
				}
			}
	
		},
	
		refreshPositions: function(fast) {
	
			//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
			if(this.offsetParent && this.helper) {
				this.offset.parent = this._getParentOffset();
			}
	
			var i, item, t, p;
	
			for (i = this.items.length - 1; i >= 0; i--){
				item = this.items[i];
	
				//We ignore calculating positions of all connected containers when we're not over them
				if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
					continue;
				}
	
				t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
	
				if (!fast) {
					item.width = t.outerWidth();
					item.height = t.outerHeight();
				}
	
				p = t.offset();
				item.left = p.left;
				item.top = p.top;
			}
	
			if(this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this);
			} else {
				for (i = this.containers.length - 1; i >= 0; i--){
					p = this.containers[i].element.offset();
					this.containers[i].containerCache.left = p.left;
					this.containers[i].containerCache.top = p.top;
					this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
					this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
				}
			}
	
			return this;
		},
	
		_createPlaceholder: function(that) {
			that = that || this;
			var className,
				o = that.options;
	
			if(!o.placeholder || o.placeholder.constructor === String) {
				className = o.placeholder;
				o.placeholder = {
					element: function() {
	
						var nodeName = that.currentItem[0].nodeName.toLowerCase(),
							element = $( "<" + nodeName + ">", that.document[0] )
								.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
								.removeClass("ui-sortable-helper");
	
						if ( nodeName === "tr" ) {
							that.currentItem.children().each(function() {
								$( "<td>&#160;</td>", that.document[0] )
									.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
									.appendTo( element );
							});
						} else if ( nodeName === "img" ) {
							element.attr( "src", that.currentItem.attr( "src" ) );
						}
	
						if ( !className ) {
							element.css( "visibility", "hidden" );
						}
	
						return element;
					},
					update: function(container, p) {
	
						// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
						// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
						if(className && !o.forcePlaceholderSize) {
							return;
						}
	
						//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
						if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
						if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
					}
				};
			}
	
			//Create the placeholder
			that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));
	
			//Append it after the actual current item
			that.currentItem.after(that.placeholder);
	
			//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
			o.placeholder.update(that, that.placeholder);
	
		},
	
		_contactContainers: function(event) {
			var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, base, cur, nearBottom, floating,
				innermostContainer = null,
				innermostIndex = null;
	
			// get innermost container that intersects with item
			for (i = this.containers.length - 1; i >= 0; i--) {
	
				// never consider a container that's located within the item itself
				if($.contains(this.currentItem[0], this.containers[i].element[0])) {
					continue;
				}
	
				if(this._intersectsWith(this.containers[i].containerCache)) {
	
					// if we've already found a container and it's more "inner" than this, then continue
					if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
						continue;
					}
	
					innermostContainer = this.containers[i];
					innermostIndex = i;
	
				} else {
					// container doesn't intersect. trigger "out" event if necessary
					if(this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", event, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
	
			}
	
			// if no intersecting containers found, return
			if(!innermostContainer) {
				return;
			}
	
			// move the item into the container if it's not there already
			if(this.containers.length === 1) {
				if (!this.containers[innermostIndex].containerCache.over) {
					this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
					this.containers[innermostIndex].containerCache.over = 1;
				}
			} else {
	
				//When entering a new container, we will find the item with the least distance and append our item near it
				dist = 10000;
				itemWithLeastDistance = null;
				floating = innermostContainer.floating || isFloating(this.currentItem);
				posProperty = floating ? "left" : "top";
				sizeProperty = floating ? "width" : "height";
				base = this.positionAbs[posProperty] + this.offset.click[posProperty];
				for (j = this.items.length - 1; j >= 0; j--) {
					if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
						continue;
					}
					if(this.items[j].item[0] === this.currentItem[0]) {
						continue;
					}
					if (floating && !isOverAxis(this.positionAbs.top + this.offset.click.top, this.items[j].top, this.items[j].height)) {
						continue;
					}
					cur = this.items[j].item.offset()[posProperty];
					nearBottom = false;
					if(Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)){
						nearBottom = true;
						cur += this.items[j][sizeProperty];
					}
	
					if(Math.abs(cur - base) < dist) {
						dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
						this.direction = nearBottom ? "up": "down";
					}
				}
	
				//Check if dropOnEmpty is enabled
				if(!itemWithLeastDistance && !this.options.dropOnEmpty) {
					return;
				}
	
				if(this.currentContainer === this.containers[innermostIndex]) {
					return;
				}
	
				itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
				this._trigger("change", event, this._uiHash());
				this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
				this.currentContainer = this.containers[innermostIndex];
	
				//Update the placeholder
				this.options.placeholder.update(this.currentContainer, this.placeholder);
	
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
	
	
		},
	
		_createHelper: function(event) {
	
			var o = this.options,
				helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);
	
			//Add the helper to the DOM if that didn't happen already
			if(!helper.parents("body").length) {
				$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
			}
	
			if(helper[0] === this.currentItem[0]) {
				this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
			}
	
			if(!helper[0].style.width || o.forceHelperSize) {
				helper.width(this.currentItem.width());
			}
			if(!helper[0].style.height || o.forceHelperSize) {
				helper.height(this.currentItem.height());
			}
	
			return helper;
	
		},
	
		_adjustOffsetFromHelper: function(obj) {
			if (typeof obj === "string") {
				obj = obj.split(" ");
			}
			if ($.isArray(obj)) {
				obj = {left: +obj[0], top: +obj[1] || 0};
			}
			if ("left" in obj) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ("right" in obj) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ("top" in obj) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ("bottom" in obj) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},
	
		_getParentOffset: function() {
	
	
			//Get the offsetParent and cache its position
			this.offsetParent = this.helper.offsetParent();
			var po = this.offsetParent.offset();
	
			// This is a special case where we need to modify a offset calculated on start, since the following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
			//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
			if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}
	
			// This needs to be actually done for all browsers, since pageX/pageY includes this information
			// with an ugly IE fix
			if( this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
				po = { top: 0, left: 0 };
			}
	
			return {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
			};
	
		},
	
		_getRelativeOffset: function() {
	
			if(this.cssPosition === "relative") {
				var p = this.currentItem.position();
				return {
					top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
					left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
				};
			} else {
				return { top: 0, left: 0 };
			}
	
		},
	
		_cacheMargins: function() {
			this.margins = {
				left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
				top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
			};
		},
	
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},
	
		_setContainment: function() {
	
			var ce, co, over,
				o = this.options;
			if(o.containment === "parent") {
				o.containment = this.helper[0].parentNode;
			}
			if(o.containment === "document" || o.containment === "window") {
				this.containment = [
					0 - this.offset.relative.left - this.offset.parent.left,
					0 - this.offset.relative.top - this.offset.parent.top,
					$(o.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left,
					($(o.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
				];
			}
	
			if(!(/^(document|window|parent)$/).test(o.containment)) {
				ce = $(o.containment)[0];
				co = $(o.containment).offset();
				over = ($(ce).css("overflow") !== "hidden");
	
				this.containment = [
					co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
					co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
					co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
					co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
				];
			}
	
		},
	
		_convertPositionTo: function(d, pos) {
	
			if(!pos) {
				pos = this.position;
			}
			var mod = d === "absolute" ? 1 : -1,
				scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
	
			return {
				top: (
					pos.top	+																// The absolute mouse position
					this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
				),
				left: (
					pos.left +																// The absolute mouse position
					this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
				)
			};
	
		},
	
		_generatePosition: function(event) {
	
			var top, left,
				o = this.options,
				pageX = event.pageX,
				pageY = event.pageY,
				scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
	
			// This is another very weird special case that only happens for relative elements:
			// 1. If the css position is relative
			// 2. and the scroll parent is the document or similar to the offset parent
			// we have to refresh the relative offset during the scroll so there are no jumps
			if(this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
				this.offset.relative = this._getRelativeOffset();
			}
	
			/*
			 * - Position constraining -
			 * Constrain the position to a mix of grid, containment.
			 */
	
			if(this.originalPosition) { //If we are not dragging yet, we won't check for options
	
				if(this.containment) {
					if(event.pageX - this.offset.click.left < this.containment[0]) {
						pageX = this.containment[0] + this.offset.click.left;
					}
					if(event.pageY - this.offset.click.top < this.containment[1]) {
						pageY = this.containment[1] + this.offset.click.top;
					}
					if(event.pageX - this.offset.click.left > this.containment[2]) {
						pageX = this.containment[2] + this.offset.click.left;
					}
					if(event.pageY - this.offset.click.top > this.containment[3]) {
						pageY = this.containment[3] + this.offset.click.top;
					}
				}
	
				if(o.grid) {
					top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
					pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
	
					left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
					pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
				}
	
			}
	
			return {
				top: (
					pageY -																// The absolute mouse position
					this.offset.click.top -													// Click offset (relative to the element)
					this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
				),
				left: (
					pageX -																// The absolute mouse position
					this.offset.click.left -												// Click offset (relative to the element)
					this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
					( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
				)
			};
	
		},
	
		_rearrange: function(event, i, a, hardRefresh) {
	
			a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));
	
			//Various things done here to improve the performance:
			// 1. we create a setTimeout, that calls refreshPositions
			// 2. on the instance, we have a counter variable, that get's higher after every append
			// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
			// 4. this lets only the last addition to the timeout stack through
			this.counter = this.counter ? ++this.counter : 1;
			var counter = this.counter;
	
			this._delay(function() {
				if(counter === this.counter) {
					this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
				}
			});
	
		},
	
		_clear: function(event, noPropagation) {
	
			this.reverting = false;
			// We delay all events that have to be triggered to after the point where the placeholder has been removed and
			// everything else normalized again
			var i,
				delayedTriggers = [];
	
			// We first have to update the dom position of the actual currentItem
			// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
			if(!this._noFinalSort && this.currentItem.parent().length) {
				this.placeholder.before(this.currentItem);
			}
			this._noFinalSort = null;
	
			if(this.helper[0] === this.currentItem[0]) {
				for(i in this._storedCSS) {
					if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
						this._storedCSS[i] = "";
					}
				}
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}
	
			if(this.fromOutside && !noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
			}
			if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
			}
	
			// Check if the items Container has Changed and trigger appropriate
			// events.
			if (this !== this.currentContainer) {
				if(!noPropagation) {
					delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
					delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
					delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
				}
			}
	
	
			//Post events to containers
			function delayEvent( type, instance, container ) {
				return function( event ) {
					container._trigger( type, event, instance._uiHash( instance ) );
				};
			}
			for (i = this.containers.length - 1; i >= 0; i--){
				if (!noPropagation) {
					delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
				}
				if(this.containers[i].containerCache.over) {
					delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
					this.containers[i].containerCache.over = 0;
				}
			}
	
			//Do what was originally in plugins
			if ( this.storedCursor ) {
				this.document.find( "body" ).css( "cursor", this.storedCursor );
				this.storedStylesheet.remove();
			}
			if(this._storedOpacity) {
				this.helper.css("opacity", this._storedOpacity);
			}
			if(this._storedZIndex) {
				this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
			}
	
			this.dragging = false;
			if(this.cancelHelperRemoval) {
				if(!noPropagation) {
					this._trigger("beforeStop", event, this._uiHash());
					for (i=0; i < delayedTriggers.length; i++) {
						delayedTriggers[i].call(this, event);
					} //Trigger all delayed events
					this._trigger("stop", event, this._uiHash());
				}
	
				this.fromOutside = false;
				return false;
			}
	
			if(!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
			}
	
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
	
			if(this.helper[0] !== this.currentItem[0]) {
				this.helper.remove();
			}
			this.helper = null;
	
			if(!noPropagation) {
				for (i=0; i < delayedTriggers.length; i++) {
					delayedTriggers[i].call(this, event);
				} //Trigger all delayed events
				this._trigger("stop", event, this._uiHash());
			}
	
			this.fromOutside = false;
			return true;
	
		},
	
		_trigger: function() {
			if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
				this.cancel();
			}
		},
	
		_uiHash: function(_inst) {
			var inst = _inst || this;
			return {
				helper: inst.helper,
				placeholder: inst.placeholder || $([]),
				position: inst.position,
				originalPosition: inst.originalPosition,
				offset: inst.positionAbs,
				item: inst.currentItem,
				sender: _inst ? _inst.element : null
			};
		}
	
	});
	
	})(jQuery);


/***/ },
/* 69 */
/*!*******************************!*\
  !*** ../~/jquery-ui/mouse.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var jQuery = __webpack_require__(/*! jquery */ 29);
	__webpack_require__(/*! ./widget */ 56);
	
	/*!
	 * jQuery UI Mouse 1.10.4
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/mouse/
	 *
	 * Depends:
	 *	jquery.ui.widget.js
	 */
	(function( $, undefined ) {
	
	var mouseHandled = false;
	$( document ).mouseup( function() {
		mouseHandled = false;
	});
	
	$.widget("ui.mouse", {
		version: "1.10.4",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var that = this;
	
			this.element
				.bind("mousedown."+this.widgetName, function(event) {
					return that._mouseDown(event);
				})
				.bind("click."+this.widgetName, function(event) {
					if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
						$.removeData(event.target, that.widgetName + ".preventClickEvent");
						event.stopImmediatePropagation();
						return false;
					}
				});
	
			this.started = false;
		},
	
		// TODO: make sure destroying one instance of mouse doesn't mess with
		// other instances of mouse
		_mouseDestroy: function() {
			this.element.unbind("."+this.widgetName);
			if ( this._mouseMoveDelegate ) {
				$(document)
					.unbind("mousemove."+this.widgetName, this._mouseMoveDelegate)
					.unbind("mouseup."+this.widgetName, this._mouseUpDelegate);
			}
		},
	
		_mouseDown: function(event) {
			// don't let more than one widget handle mouseStart
			if( mouseHandled ) { return; }
	
			// we may have missed mouseup (out of window)
			(this._mouseStarted && this._mouseUp(event));
	
			this._mouseDownEvent = event;
	
			var that = this,
				btnIsLeft = (event.which === 1),
				// event.target.nodeName works around a bug in IE 8 with
				// disabled inputs (#7620)
				elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
			if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
				return true;
			}
	
			this.mouseDelayMet = !this.options.delay;
			if (!this.mouseDelayMet) {
				this._mouseDelayTimer = setTimeout(function() {
					that.mouseDelayMet = true;
				}, this.options.delay);
			}
	
			if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
				this._mouseStarted = (this._mouseStart(event) !== false);
				if (!this._mouseStarted) {
					event.preventDefault();
					return true;
				}
			}
	
			// Click event may never have fired (Gecko & Opera)
			if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
				$.removeData(event.target, this.widgetName + ".preventClickEvent");
			}
	
			// these delegates are required to keep context
			this._mouseMoveDelegate = function(event) {
				return that._mouseMove(event);
			};
			this._mouseUpDelegate = function(event) {
				return that._mouseUp(event);
			};
			$(document)
				.bind("mousemove."+this.widgetName, this._mouseMoveDelegate)
				.bind("mouseup."+this.widgetName, this._mouseUpDelegate);
	
			event.preventDefault();
	
			mouseHandled = true;
			return true;
		},
	
		_mouseMove: function(event) {
			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
				return this._mouseUp(event);
			}
	
			if (this._mouseStarted) {
				this._mouseDrag(event);
				return event.preventDefault();
			}
	
			if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
				this._mouseStarted =
					(this._mouseStart(this._mouseDownEvent, event) !== false);
				(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
			}
	
			return !this._mouseStarted;
		},
	
		_mouseUp: function(event) {
			$(document)
				.unbind("mousemove."+this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup."+this.widgetName, this._mouseUpDelegate);
	
			if (this._mouseStarted) {
				this._mouseStarted = false;
	
				if (event.target === this._mouseDownEvent.target) {
					$.data(event.target, this.widgetName + ".preventClickEvent", true);
				}
	
				this._mouseStop(event);
			}
	
			return false;
		},
	
		_mouseDistanceMet: function(event) {
			return (Math.max(
					Math.abs(this._mouseDownEvent.pageX - event.pageX),
					Math.abs(this._mouseDownEvent.pageY - event.pageY)
				) >= this.options.distance
			);
		},
	
		_mouseDelayMet: function(/* event */) {
			return this.mouseDelayMet;
		},
	
		// These are placeholder methods, to be overriden by extending plugin
		_mouseStart: function(/* event */) {},
		_mouseDrag: function(/* event */) {},
		_mouseStop: function(/* event */) {},
		_mouseCapture: function(/* event */) { return true; }
	});
	
	})(jQuery);


/***/ },
/* 70 */
/*!***********************************************************!*\
  !*** ../~/jquery-ui-touch-punch/jquery.ui.touch-punch.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	/*!
	 * jQuery UI Touch Punch 0.2.3
	 *
	 * Copyright 2011–2014, Dave Furfero
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 *
	 * Depends:
	 *  jquery.ui.widget.js
	 *  jquery.ui.mouse.js
	 */
	(function ($) {
	
	  // Detect touch support
	  $.support.touch = 'ontouchend' in document;
	
	  // Ignore browsers without touch support
	  if (!$.support.touch) {
	    return;
	  }
	
	  var mouseProto = $.ui.mouse.prototype,
	      _mouseInit = mouseProto._mouseInit,
	      _mouseDestroy = mouseProto._mouseDestroy,
	      touchHandled;
	
	  /**
	   * Simulate a mouse event based on a corresponding touch event
	   * @param {Object} event A touch event
	   * @param {String} simulatedType The corresponding mouse event
	   */
	  function simulateMouseEvent (event, simulatedType) {
	
	    // Ignore multi-touch events
	    if (event.originalEvent.touches.length > 1) {
	      return;
	    }
	
	    event.preventDefault();
	
	    var touch = event.originalEvent.changedTouches[0],
	        simulatedEvent = document.createEvent('MouseEvents');
	    
	    // Initialize the simulated mouse event using the touch event's coordinates
	    simulatedEvent.initMouseEvent(
	      simulatedType,    // type
	      true,             // bubbles                    
	      true,             // cancelable                 
	      window,           // view                       
	      1,                // detail                     
	      touch.screenX,    // screenX                    
	      touch.screenY,    // screenY                    
	      touch.clientX,    // clientX                    
	      touch.clientY,    // clientY                    
	      false,            // ctrlKey                    
	      false,            // altKey                     
	      false,            // shiftKey                   
	      false,            // metaKey                    
	      0,                // button                     
	      null              // relatedTarget              
	    );
	
	    // Dispatch the simulated event to the target element
	    event.target.dispatchEvent(simulatedEvent);
	  }
	
	  /**
	   * Handle the jQuery UI widget's touchstart events
	   * @param {Object} event The widget element's touchstart event
	   */
	  mouseProto._touchStart = function (event) {
	
	    var self = this;
	
	    // Ignore the event if another widget is already being handled
	    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
	      return;
	    }
	
	    // Set the flag to prevent other widgets from inheriting the touch event
	    touchHandled = true;
	
	    // Track movement to determine if interaction was a click
	    self._touchMoved = false;
	
	    // Simulate the mouseover event
	    simulateMouseEvent(event, 'mouseover');
	
	    // Simulate the mousemove event
	    simulateMouseEvent(event, 'mousemove');
	
	    // Simulate the mousedown event
	    simulateMouseEvent(event, 'mousedown');
	  };
	
	  /**
	   * Handle the jQuery UI widget's touchmove events
	   * @param {Object} event The document's touchmove event
	   */
	  mouseProto._touchMove = function (event) {
	
	    // Ignore event if not handled
	    if (!touchHandled) {
	      return;
	    }
	
	    // Interaction was not a click
	    this._touchMoved = true;
	
	    // Simulate the mousemove event
	    simulateMouseEvent(event, 'mousemove');
	  };
	
	  /**
	   * Handle the jQuery UI widget's touchend events
	   * @param {Object} event The document's touchend event
	   */
	  mouseProto._touchEnd = function (event) {
	
	    // Ignore event if not handled
	    if (!touchHandled) {
	      return;
	    }
	
	    // Simulate the mouseup event
	    simulateMouseEvent(event, 'mouseup');
	
	    // Simulate the mouseout event
	    simulateMouseEvent(event, 'mouseout');
	
	    // If the touch interaction did not move, it should trigger a click
	    if (!this._touchMoved) {
	
	      // Simulate the click event
	      simulateMouseEvent(event, 'click');
	    }
	
	    // Unset the flag to allow other widgets to inherit the touch event
	    touchHandled = false;
	  };
	
	  /**
	   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
	   * This method extends the widget with bound touch event handlers that
	   * translate touch events to mouse events and pass them to the widget's
	   * original mouse event handling methods.
	   */
	  mouseProto._mouseInit = function () {
	    
	    var self = this;
	
	    // Delegate the touch handlers to the widget's element
	    self.element.bind({
	      touchstart: $.proxy(self, '_touchStart'),
	      touchmove: $.proxy(self, '_touchMove'),
	      touchend: $.proxy(self, '_touchEnd')
	    });
	
	    // Call the original $.ui.mouse init method
	    _mouseInit.call(self);
	  };
	
	  /**
	   * Remove the touch event handlers
	   */
	  mouseProto._mouseDestroy = function () {
	    
	    var self = this;
	
	    // Delegate the touch handlers to the widget's element
	    self.element.unbind({
	      touchstart: $.proxy(self, '_touchStart'),
	      touchmove: $.proxy(self, '_touchMove'),
	      touchend: $.proxy(self, '_touchEnd')
	    });
	
	    // Call the original $.ui.mouse destroy method
	    _mouseDestroy.call(self);
	  };
	
	})(jQuery);

/***/ },
/* 71 */
/*!****************************!*\
  !*** ./views/admin/nav.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	
	var $ = __webpack_require__(/*! jquery */ 29);
	var _ = __webpack_require__(/*! underscore */ 31);
	var Backbone = __webpack_require__(/*! backbone */ 30);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    el: "#navContainer",
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	    },
	
	    events: {
	        "click .goBack": "goBack",
	        "click .goForward": "goForward"
	    },
	
	    goBack: function(){
	        Backbone.history.history.back();
	    },
	
	    goForward: function(){
	        Backbone.history.history.forward();
	    },
	
	    styleButtons: function(){
	        this.$el.find(".goForward").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-arrowthick-1-e"
	            }
	        });
	        this.$el.find(".goBack").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-arrowthick-1-w"
	            }
	        });
	    },
	
	    render: function () {
	        var compiledTemplate = Mustache.to_html(this.template, {});
	        this.$el.html(compiledTemplate);
	        this.styleButtons();
	        return this;
	    }
	});

/***/ },
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/*!*************************************!*\
  !*** ./collections/queueHistory.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	Backbone.LocalStorage = __webpack_require__(/*! backbone.localstorage */ 66);
	var $ = __webpack_require__(/*! jquery */ 29);
	var RecordingModel = __webpack_require__(/*! ../models/recording.js */ 48);
	
	var localStorageKey = "x7-queue-history";
	
	module.exports = Backbone.Collection.extend({
	
	    model: RecordingModel,
	    localStorage: new Backbone.LocalStorage(localStorageKey),
	
	    initialize: function(){
	
	    },
	
	    add: function(oldRecording){
	
	        this.unshift(oldRecording);
	        oldRecording.save();
	    }
	
	
	});

/***/ },
/* 91 */
/*!*************************************!*\
  !*** ./views/admin/queueHistory.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var QueueBaseView = __webpack_require__(/*! ./queueBaseView.js */ 92);
	
	module.exports = QueueBaseView.extend({
	
	    id: "queueHistoryContent"
	
	});

/***/ },
/* 92 */
/*!**************************************!*\
  !*** ./views/admin/queueBaseView.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = jQuery = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	__webpack_require__(/*! jquery-ui/sortable */ 68);
	__webpack_require__(/*! jquery-ui-touch-punch */ 70);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.collection, 'update', this.render);
	        this.collection.fetch();
	    },
	
	    events: {
	        "click .removeTrackFromQueueButton": "remove"
	    },
	
	    remove: function(e){
	        var id = $(e.currentTarget).attr("data-recid");
	        this.collection.remove(id);
	    },
	
	    styleButtons: function() {
	        this.$el.find(".removeTrackFromQueueButton").button({
	            text: false,
	            icons: {
	                primary: "ui-icon-close"
	            }
	        });
	    },
	
	    sortablize: function(){
	
	        var that = this;
	
	        this.$el.find("tbody").sortable({
	            axis: "y",
	            placeholder: "ui-state-highlight",
	            stop: function(e, ui){
	                var id = $(ui.item).attr("data-id");
	                var newIndex = ui.item.index();
	                that.collection.reorder(id, newIndex);
	            }
	        });
	        this.$el.find("tbody").disableSelection();
	    },
	
	    render: function() {
	
	        var compiledTemplate = Mustache.to_html(this.template, { queue: this.collection.toJSON()});
	        this.$el.html(compiledTemplate);
	        this.styleButtons();
	        this.sortablize();
	
	        // sub-views need this
	        this.delegateEvents();
	
	        return this;
	    }
	
	});

/***/ },
/* 93 */
/*!*******************************!*\
  !*** ./models/queuePlayer.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	Backbone.LocalStorage = __webpack_require__(/*! backbone.localstorage */ 66);
	var $ = __webpack_require__(/*! jquery */ 29);
	//var RecordingModel = require('../models/recording.js');
	
	var localStorageKey = "x7-player";
	
	module.exports = Backbone.Model.extend({
	
	    localStorage: new Backbone.LocalStorage(localStorageKey),
	
	    initialize: function(){
	
	        var that = this;
	
	        this.fetch();
	
	        // no track found in local storage
	        if (!this.get("audioFile")) {
	
	            // queue empty
	            if (!adminApp.collections.queue.length) {
	
	                // when something gets added to the queue..
	                this.listenTo(adminApp.collections.queue, 'add', function () {
	
	                    // load it straight away
	                    that.loadNextTrackFromQueue();
	
	                    // and stop waiting for something to be added to the queue
	                    that.stopListening(adminApp.collections.queue, 'add');
	                });
	
	            } else {
	                that.loadNextTrackFromQueue();
	            }
	        }
	    },
	
	    loadNextTrackFromQueue: function(){
	        if (this.get("audioFile")) {
	            this.saveCurrentTrackToHistory();
	        }
	        var recording = adminApp.collections.queue.at(0);
	        this.load(recording.clone());
	        recording.destroy();
	    },
	
	    saveCurrentTrackToHistory: function(){
	        var oldRecording = this.clone();
	        oldRecording.set("id", oldRecording.get("originalId"));
	        adminApp.collections.queueHistory.add(oldRecording);
	    },
	
	    load: function(recording){
	
	        // save the recordings id as 'originalId'
	        recording.set("originalId", recording.get("id"));
	
	        // set the recording's id to 1
	        recording.set("id", 1);
	
	        // load the modified recording
	        this.set(recording.attributes);
	
	        // save it in local storage
	        this.save();
	    }
	
	
	});

/***/ },
/* 94 */
/*!************************************!*\
  !*** ./views/admin/queuePlayer.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "queuePlayer",
	
	    initialize: function (options) {
	        _.extend(this, _.pick(options, "template"));
	        this.listenTo(this.model, 'change', this.render);
	        this.render();
	    },
	
	    render: function(){
	
	        var that = this;
	        var compiledTemplate = Mustache.to_html(this.template, this.model.attributes);
	        this.$el.html(compiledTemplate);
	
	        // sub-views need this
	        this.delegateEvents();
	
	        this.$el.find("audio").bind('ended', function(){
	            console.log("playback ended");
	            that.model.loadNextTrackFromQueue();
	        });
	
	        return this;
	    }
	});


/***/ },
/* 95 */
/*!**********************************!*\
  !*** ./views/admin/queuePage.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! underscore */ 31);
	var $ = __webpack_require__(/*! jquery */ 29);
	var Mustache = __webpack_require__(/*! mustache */ 36);
	
	module.exports = Backbone.View.extend({
	
	    tagName: "div",
	    id: "queuePage",
	
	    initialize: function (options) {
	
	        _.extend(this, _.pick(options, "template"));
	
	    },
	
	    render: function(){
	        this.$el.html(this.template);
	
	        // render the three subviews
	        this.$el.find("#queueHistoryContainer").html(adminApp.views.queueHistory.render().el);
	        this.$el.find("#queuePlayerContainer").html(adminApp.views.queuePlayer.render().el);
	        this.$el.find("#queueContainer").html(adminApp.views.queue.render().el);
	
	        return this;
	    }
	});
	


/***/ }
]);
//# sourceMappingURL=backend.js.map