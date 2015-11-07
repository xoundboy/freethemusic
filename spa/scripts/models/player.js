x7.PlayerModel = Backbone.Model.extend({

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
});