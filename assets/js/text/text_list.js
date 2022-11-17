$(function(){
    let q={
        // 页码值
        pagenum:1,
        // 每页显示多少条数据
        pagesize:4,
        // 文章分类的 Id
        cate_id:'',
        // 文章的状态，可选值有：已发布、草稿
        state:'',
    }
    getdata()
    // 获取数据
    function getdata(){
        $.ajax({
            type:'get',
            url:'/my/article/list',
            data:q,
            success:function(e){
                if(e.status===1)return window.parent.gxcg(e.message)
                $('span.total').html(`共 ${e.total} 条`)
                $('span.total').attr('data-total',e.total)
                $('tbody').html('')
                $.each(e.data,(i,v)=>{
                    $('tbody').append(`
                    <tr >
                    <td >${v.title}</td>
                    <td>${v.cate_name}</td>
                    <td>${new Date(v.pub_date).toLocaleString()}</td>
                    <td>${v.state}</td>
                    <td>
                    <a href="./text_edit.html" target="sy" class="btn btn-success btn-sm edit " data-edit="${v.Id}">编辑</a>
                <button type="button" class="del btn btn-danger btn-sm"" data-del="${v.Id}">删除</button>
                    </td>
                   </tr>
                    `)
                   
                })
                // 分页
              fy(e.total,q.pagenum)
           
            }
        })
    }
 
// 获取分类
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(e){
            if(e.status===1)return window.parent.gxcg(e.message)
            $.each(e.data,(i,v)=>{
                  $('select.fl').append(`
    <option value="${v.Id}">${v.name}</option>
    `)   
            })
 } })
//  筛选
 $('.sxuan').submit(function(e){
e.preventDefault()
q.pagenum=1
q.cate_id=$('.fl').val()
q.state=$('.ztai').val()
// $('tbody').html('')
getdata()
 })

//  每页出现多少

$('.btn-group .dropdown-item').click(function(){
   q.pagenum=1
   q.pagesize=$(this).attr('data-fy')
   $('.dropdown-toggle ').attr('data-fy',$(this).attr('data-fy'))
   $('.dropdown-toggle').html($(this).html())
//    $('tbody').html('')
   getdata()
})
// 分页
function fy(total,dqian,nm){
   let html=$('.dropdown-toggle ').attr('data-fy')
    $('.pagination').jqPaginator({
        // 页的总条目数
       totalCounts: total,
    //    分页的总页数
       totalPages:Math.ceil(total/html),
    //    最多显示的页码数
       visiblePages: 5,
    //    禁用状态 样式
       disableClass:'disabled',
    //    当前的页码
       currentPage: dqian,
//      回调函数，当换页时触发（包括初始化第一页的时候），会传入两个参数：
// 1、“目标页"的页码，Number类型
// 2、触发类型，可能的值：“init”（初始化），“change”（点击分页）
       onPageChange: function (num, type) {
        q.pagenum=nm||num
         if(type==='change'){
        //    $('tbody').html('')
           getdata()
         }else if(nm){
            // $('tbody').html('')
           getdata()
         }
           
       }
   });
}
// 点击确定跳转
$('.sure').click(()=>fy($('span.total').attr('data-total'),$('.tiaoz').val(),$('.tiaoz').val()) )

// 删除
let del=''
$('table').on('click','button.del',function(){
    $('.deltsk').toggle()
    $('.deltsk .btn-close').click(()=>$('.deltsk').hide())
    $('.deltsk .qx').click(()=>$('.deltsk').hide())
   del=$(this).attr('data-del')
}) 
$('.deltsk .qd').click(function(){
    if($('button.del').length===1){
        q.pagenum=q.pagenum-1
    }
          $.get('/my/article/delete/'+del,function(e){
    if(e.status===1)return window.parent.gxcg(e.message)
   
    window.parent.gxcg('删除成功')
    $('.deltsk .btn-close').click()
    getdata()
   })
    })

    $('table').on('click','a.edit',function(e){
       e.preventDefault()
       localStorage.setItem('edit',$(this).attr('data-edit'))
        location.href='./text_edit.html'
    }) 
})