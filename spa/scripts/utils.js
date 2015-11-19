var _getMonthFormatted = function (dateObj) {
    var month = dateObj.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
};
var _getDayFormatted = function (dateObj) {
    var day = dateObj.getDate() + 1;
    return day < 10 ? '0' + day : '' + day;
};

module.exports = {

    formattedDate: function (date) {
        var dateObj = new Date(date);
        return _getMonthFormatted(dateObj) + "/" + _getDayFormatted(dateObj) + '/' + dateObj.getFullYear();
    },

    mysqlFormatDate: function (unformattedDate){
        var date = new Date(unformattedDate);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    },

    getUniqueAudioFileName: function (fields){
        var strippedTitle = fields.title.replace(/[^a-zA-Z0-9.]+/g,'');
        var strippedArtist = fields.selectedArtistText.replace(/[^a-zA-Z0-9.]+/g,'');
        var random = Math.random()*100000000000000000;
        var longName = strippedTitle + '-' + strippedArtist + '-' + random;
        return longName.substring(0,46);
    }
};