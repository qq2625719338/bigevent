$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    // http://api-breakingnews-web.itheima.net
    // 如果接口有权限 设置请求头
if(options.url.substr(0,4)==='/my/'){
    options.headers={Authorization:localStorage.getItem('token')||''}
  
}
// 设置每次请求网站
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 无论失败还是成功 都会调用
options.complete=function(e){
    console.log(e.responseJSON.message);
    if(e.responseJSON.status===1&&e.responseJSON.message==='身份认证失败!'){
        console.log(1);
        localStorage.removeItem('token')
        location.href='./login.html'
    }
}
})