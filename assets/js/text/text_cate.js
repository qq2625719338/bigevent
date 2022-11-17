$(function(){
    // 获取文章
    gettext()
function gettext(){
    $.get('/my/article/cates',function(e){
        if(e.status===1)return window.parent.gxcg(e.message)
        $('.card.xr').html('')
        $.each(e.data,(i,v)=>{  
    $('.card.xr').append(`
    <div class="card-body p-0 d-flex align-items-center border-bottom" style="font-size: 14px;">
            <input type="hidden" name="id" value='${v.Id}'>
            <span class="col-md-5 col-sm-4 col-2 border-end border-1 p-2 text-muted">${v.name}</span>
            <span class="col-md-5  col-sm-4 col-2 border-end border-1 p-2 text-muted">${v.alias}</span>
            <div class="col-md-2 col-sm-4 col-8 p-2 text-muted">
                <button type="button" class="btn btn-success edit" data-id='${v.Id}'>编辑</button>
                <button type="button" class="btn btn-danger del">删除</button>
            </div>
        </div>
    
    `)
      })
    })
}

$('.btn.add').click(function(){
    $('.card.add').toggle()
    $('.card.add .btn-close').click(()=>$('.card.add').hide())
   
})
// 添加类别
$('.addform').submit(function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function(e){
            if(e.status===1)return window.parent.gxcg(e.message)
            window.parent.gxcg(e.message)
            $('.card.add .btn-close').click()
            gettext()
            $('.addform')[0].reset()
        }
    })
})
// 编辑类别

$('.card.xr').on('click','.btn.edit',function(){
    $('.card.edit').toggle()
    $('.card.edit .btn-close').click(()=>$('.card.edit').hide())
    let id=$(this).attr('data-id')
       $.ajax({
        type:'get',
        url:'/my/article/cates/'+id,
        data:id,
        success:function(e){
            if(e.status===1)return window.parent.gxcg(e.message)
            $('.card.edit [name="Id"]').val(e.data.Id)
            $('.card.edit [name="name"]').val(e.data.name)
            $('.card.edit [name="alias"]').val(e.data.alias)
        }
    })
})
// 修改类别
$('.editform').submit(function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(e){
            if(e.status===1)return window.parent.gxcg(e.message)
            window.parent.gxcg(e.message)
            $('.card.edit .btn-close').click()
            gettext()
            $('.addform')[0].reset()
        }
    })
})

// 删除类别
$('.card.xr').on('click','.btn.del',function(){
    $('.toast.deltext').toggle()
    $('.toast.deltext .btn-close').click(()=>$('.toast.deltext').hide())
    $('.toast.deltext .qx').click(()=>$('.toast.deltext').hide())
    let id=$(this).siblings().attr('data-id')
    $('.toast.deltext .qd').click(function(){
    $.ajax({
        type:'get',
        url:'/my/article/deletecate/'+id,
        data:id,
        success:function(e){
            if(e.status===1)return window.parent.gxcg('不允许删除此项')
            window.parent.gxcg('e.message')
            $('.toast.deltext .btn-close').click()
            gettext()
        }
    })
    })
   
})
})