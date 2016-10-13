
var Rxports = {

}	
$.ajaxPrefilter( function(options, originalOptions, jqXHR){
    // options对象 包括accepts、crossDomain、contentType、url、async、type、headers、error、dataType等许多参数选项
    // originalOptions对象 就是你为$.ajax()方法传递的参数对象，也就是 { url: "/index.php" }
    // jqXHR对象 就是经过jQuery封装的XMLHttpRequest对象(保留了其本身的属性和方法)
//  options.url = "http://www.adminv3.com"+options.url;
})
$.ajaxSetup({
    type:'get',
    dataType:'json',
    error: function(res) {
        console.log(res)
    }
})
module.exports = Rxports
















































