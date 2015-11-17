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
    }
};