var $ = require('jquery');
var template = require('./html/artistsTable.html');


module.exports = Backbone.View.extend({

    tagName: "div",
    selectedId: null,

    initialize: function () {
        this.listenTo(this.collection, 'reset sort change remove', this.render);
    },

    events: {
        "click button.deleteArtistButton"   : "delete",
        "click button.editArtistButton"     : "edit"
    },

    edit: function(e){
        var actID = $(e.currentTarget).closest("tr").attr("data-actid");
        X7.router.navigate('artist/edit/' + actID, {trigger:true});
    },

    delete: function (e){
        var $btn = $(e.currentTarget),
            actID = parseInt($btn.closest("tr").attr("data-actid"));

        var thisArtistsRecordings = X7.collections.recordings.where({actID: actID});
        var recordingList = "";

        thisArtistsRecordings.map(function(recording){
            recordingList += recording.get("title") + "\n";
        });

        if (confirm("WARNING: If you delete this artist then the following recordings will also be deleted:\n" + recordingList)){
            this.collection.remove(this.collection.get(actID));
        }
    },

    styleButtons: function() {
        this.$el.find(".editArtistButton").button({text:false,icons:{primary: "ui-icon-pencil"}});
        this.$el.find(".deleteArtistButton").button({text:false,icons:{primary: "ui-icon-trash"}});
    },

    render: function(){
        var viewModel = {
            adminUser: X7.adminUser,
            artists: this.collection.toJSON()
        };
        this.$el.html(template(viewModel));
        this.styleButtons();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    }
});
