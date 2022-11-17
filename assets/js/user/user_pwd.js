$(function(){
    let validator = $('form.needs-validation').jbvalidator({
        errorMessage: true,//如果为flase则不显示错误信息
        successClass: true,//如果为flase则不显示成功信息
        //可以使用英文与中文如果用英文使用en.json
        
    });
    var valid = validator.validator;
    //新的自定义验证方法
    valid.pwd = function (el, event) {
    if ($(el).is('[type=password]') &&/^[\S]{6,12}$/.test($(el).val())===false) {
            return '密码必须6到12位，且不能出现空格';
        }
    };
    valid.npwd = function (el, event) {
        if ($(el).is('[name=npwd]') &&$(el).val()===$('input[name=pwd]').val()) {
                return '新密码不能和旧密码相同';
            }
        };
    valid.zcpwd = function (el, event) {
        if ($(el).is('[name=zcpwd]') &&$(el).val()!==$('input[name=npwd]').val()) {
                return '两次密码输入不一致';
            }
        };
    $('input').on('input',()=>$('.invalid-feedback').remove())

    $('form.needs-validation').submit(function(e){
        e.preventDefault()
        if($(this).find('input').hasClass('is-invalid'))return ''
        
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:{oldPwd:$('input[name=pwd]').val(),newPwd:$('input[name=npwd]').val()},
            success:function(e){
                if(e.status===1){return window.parent.gxcg(e.message)}
                // iframe调用父页面方法
                window.parent.gxcg('密码更改成功')
                $('form.needs-validation')[0].reset()
            }
        })
            })
            // $('button[type="reset"]').click(function(e){
            //    e.preventDefault()
            //    $('form.needs-validation')[0].reset()
            // })
})