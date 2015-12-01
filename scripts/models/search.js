module.exports = Backbone.Model.extend({
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
});