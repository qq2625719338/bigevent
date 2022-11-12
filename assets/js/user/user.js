$(function(){
    // 请求用户信息
    cz()
   function cz(){
    $.get('/my/userinfo',function(e){
        if(e.status===1) return 'e.message'
        $('input[name=id]').val(e.data.id)
        $('input[name=username]').val(e.data.username)
        $('input[name=nickname]').val(e.data.nickname)
        $('input[name=email]').val(e.data.email)
    })
   }

    let validator = $('form.needs-validation').jbvalidator({
        errorMessage: true,//如果为flase则不显示错误信息
        successClass: true,//如果为flase则不显示成功信息
        //可以使用英文与中文如果用英文使用en.json
        
    });
    var valid = validator.validator;
    //新的自定义验证方法
    valid.email = function (el, event) {
    if ($(el).is('[name=email]') &&/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test($(el).val())===false) {
            return '请输入正确邮箱';
        }
    };
    $('input').on('input',()=>$('.invalid-feedback').remove() )

    $('form.needs-validation').submit(function(e){
e.preventDefault()
if($(this).find('input').hasClass('is-invalid'))return ''

$.ajax({
    type:'post',
    url:'/my/userinfo',
    data:$(this).serialize(),
    success:function(e){
        if(e.status===1){return e.message}
        // iframe调用父页面方法
        window.parent.gxcg() 
        window.parent.getuser()
    }
})
    })
    $('button[type="reset"]').click(function(e){
       e.preventDefault()
       cz()
    })
})
