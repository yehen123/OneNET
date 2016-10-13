import $ from 'jquery';
var Rxports = {
    openWin: function(url, name) {
        const $a = $(".itab").find('a[href="'+url+'"]');
        if($a.length>0) {
            $a.click();
            return false;
        }
        const tab = '<li class="active"><a href="' + url + '">'+name+'</a><i class="icon-remove iclose"></i></li>';
        $(".itab .active").removeClass('active');
        $(".itab").append(tab).find('.active a').click();
        let wid = 0;
        $(".itab").find('li').each(function() {
            wid += parseInt($(this).css('width'));
        })
        if(wid > $(".itab").width()) {
            $(".itab .active .iclose").click();
            alert('窗口打开太多了,先关闭一点吧.');
            return false;
        }
    },
}
module.exports = Rxports



































