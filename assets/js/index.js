$(function(){
  let a=true
$('#wzgl').click(function(){
  if(a){
    $('#wzglz').show()
    a=false
  }else{
    $('#wzglz').hide()
    a=true
  }})})

$(function(){
  let a=true
$('#grzx').click(function(){
  if(a){
    $('#grzxz').show()
    a=false
  }else{
    $('#grzxz').hide()
    a=true
  }})})
  
// 更新头像和个人名称
  $(function(){
// 退出
$('.close').click(function(){
$('.closez').addClass('show')
$('.btn.btn-success').click(function(){
  localStorage.removeItem('token')
  location.href='./login.html'
})
})
  })
function gxcg(data){
  $('.gxcg').show().delay(2000).hide(0)
  $('.gxcg').children('strong').text(data)
}
getuser()
function getuser(){
  $.get('/my/userinfo',function(e){
    if(e.status===1) location.href='./login.html'
  if(e.data.user_pic){
    $('img.img-fluid').attr('src',e.data.user_pic)
    $('img.img-fluid').show()
    $('span.tx').hide()
  }else{
    $('img.img-fluid').hide()
    $('span.tx').text(e.data.nickname[0]||e.data.username[0])
    $('span.tx').show()
  }
  if(e.data.nickname){
    $('span.ms-2').text(e.data.nickname)
  }else{
    $('span.ms-2').text(e.data.username)
  }
  })
}