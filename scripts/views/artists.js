var $ = require('jquery');
var template = require('./html/artists.html');

module.exports = Backbone.View.extend({

    tagName: "div",
    id: "artistsContent",
    className: "artists",
    selectedId: null,

    initialize: function () {
        this.listenTo(this.collection, 'reset sort change remove', this.render);
        this.collection.fetch({reset:true});
    },

    events: {
        "click button.addArtistButton"      : "add",
        "click button.deleteArtistButton"   : "delete",
        "click button.editArtistButton"     : "edit"
    },

    add: function(){
        X7.router.navigate("artist/add", {trigger: true});
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
        this.$el.html(template({artists:this.collection.toJSON()}));
        this.styleButtons();

        // Sub-views need this or events associated with
        // previous renderings of the view will be lost.
        this.delegateEvents();

        return this;
    }
});