/**
 * Created by xoundboy on 30/03/16.
 */
module.exports = {
    style: function($el, icon, showText, disabled){
        showText = !!showText;
        disabled = !!disabled;
        $el.button({
            text: showText,
            disabled: disabled,
            icons: {
                primary: icon
            }
        });
    }
};
