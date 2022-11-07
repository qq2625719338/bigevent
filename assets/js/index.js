$(function(){
    $.ajaxPrefilter(function(options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        // http://api-breakingnews-web.itheima.net
        options.url = 'http://127.0.0.1' + options.url
      })
    $('.log-box a').click(function(){
        $('.log-box').hide()
        $('.reg-box').show()
    })
    $('.reg-box a').click(function(){
        $('.reg-box').hide()
        $('.log-box').show()
    })

    let validator = $('form.needs-validation').jbvalidator({
        errorMessage: true,//如果为flase则不显示错误信息
        successClass: true,//如果为flase则不显示成功信息
        //可以使用英文与中文如果用英文使用en.json
        language: 'https://emretulek.github.io/jbvalidator/dist/lang/en.json'
    });
    var valid = validator.validator;
    //新的自定义验证方法
    valid.password = function (el, event) {
        if ($(el).is('[name=password]') && /^[\S]{6,12}$/.test($(el).val())===false) {
            return '密码必须为6~12位,且不能出现空格';
        }
    }
    valid.UserName = function (el, event) {
        if ($(el).is('[name=username]') &&/^[a-zA-Z0-9_-]{4,16}$/.test($(el).val())===false) {
            return '用户名必须为字母,数字,下划线,减号,且在4~16位之间';
        }
    };

    $('input').on('input',function(){
     $('.invalid-feedback').remove();
     $('.is-invalid').removeClass('is-invalid')
    })
    
    $('.reg-box form').submit(function(e){
e.preventDefault()
if($(this).find('input').hasClass('is-invalid'))return ''
// 注册
       $.post('/api/reguser',{username:$(this).find('[name=username]').val(),password:$(this).find('[name=password]').val()},function(e){
        if(e.status!==0){
            $('.alert.zcsb strong').text('注册失败')
          $('.alert.zcsb').show().delay(1000).hide(0);
        }else{
            $('.alert.zccg strong').text('注册成功')
            $('.alert.zccg').show().delay(1000).hide(0);
            $('.qdl').click()
        }
       })
    })

    $('.log-box form').submit(function(e){
        e.preventDefault()
        if($(this).find('input').hasClass('is-invalid'))return ''
        // 登录
               $.post('/api/login',{username:$(this).find('[name=username]').val(),password:$(this).find('[name=password]').val()},function(e){
                if(e.status!==0){
                    $('.alert.zcsb strong').text('登录失败')
                    //   显示后隐藏
                  $('.alert.zcsb').show().delay(1500).hide(0);
                 
                }else{
  $('.alert.zccg strong').text('登录成功')
//   显示后隐藏
                    $('.alert.zccg').show().delay(1500).hide(0);
                    // 登录成功存储token
                  localStorage.setItem('token',e.token)
                  location.href='./index.html'
                }
               })
            })
});

