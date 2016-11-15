/**
 * Created by xoundboy on 15/11/16.
 */
module.exports = {
    collectionRow: function(id, collection, delay){
        if (id){
            var model = collection.get(id);
            if (model){
                model.set("highlighted", true);
                setTimeout(function(){
                    model.set("highlighted", null);
                }, delay);
            }
        }
    }
};