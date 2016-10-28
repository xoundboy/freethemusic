var template = require('./html/home.html');

module.exports = Backbone.View.extend({

    render: function(){
        var viewModel = {data:this.model.attributes};
        this.$el.html(template(viewModel)).show();
        return this;
    }
});
