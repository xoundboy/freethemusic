var ArtistsCollection = require('../collections/artists.js');
var TypesCollection = require('../collections/types.js');

module.exports = Backbone.Model.extend({

    defaults: {
        size: 0,
        stepCount: 4,
        tags: "",
        recNotes: ""
    },

    saveProps: [
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
    ],

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
        this.saveProps.map(function(prop){
            attrs[prop] = that.get(prop);
        });

        return attrs;
    },

    validate: function(){
        var output = {
            isReadyToSave: true,
            errors: [],
            errorMessage: ""
        };

        // basic check to see if field is set
        var fields = this.saveProps;
        for (var i=0; i<fields.length; i++){
            var field = this.get(fields[i]);
            if (!field && field !== ""){
                output.errors.push({
                    field: fields[i],
                    message: "field not set"
                });
                output.errorMessage += fields[i] + " not set; ";
                output.isReadyToSave = false;
            }
        }

        return output;
    }

});