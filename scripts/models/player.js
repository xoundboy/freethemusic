var $ = require('jquery');

module.exports = Backbone.Model.extend({

    initialize: function(){

        var that = this;

        if (!this.get("audioFile")) {

            // queue empty
            if (!adminApp.collections.queue.length) {

                // when something gets added to the queue..
                this.listenTo(adminApp.collections.queue, 'add', function () {

                    // load it straight away
                    that.loadQueueHead();

                    // and stop waiting for something to be added to the queue
                    that.stopListening(adminApp.collections.queue, 'add');

                    // and start the track playing
                    adminApp.views.player.play();
                });

            } else {
                that.loadQueueHead();
            }
        }
    },

    loadQueueHead: function(){
        var recording = adminApp.collections.queue.at(0);
        this.set(recording.clone().attributes);
        adminApp.views.player.play();
    }


});