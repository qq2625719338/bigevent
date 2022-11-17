$(function(){
  let edit=localStorage.getItem('edit')
    // 获取分类
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(e){
            if(e.status===1)return window.parent.gxcg(e.message)
            $.each(e.data,(i,v)=>{
                  $('select[name="cate_id"]').append(`
    <option value="${v.Id}">${v.name}</option>
    `)   
            })
 } })
//  富文本
$('textarea[name="content"]').tinymce({
  height: 400,
  language:'zh_CN',
  promotion: false,
  resize: false,
  branding: false,
  elementpath: false,
  plugins: [
     'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
     'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
     'insertdatetime', 'media', 'table', 'help', 'wordcount'
   ],
   toolbar: 'undo redo | blocks | ' +
   'bold italic backcolor | alignleft aligncenter ' +
   'alignright alignjustify | bullist numlist outdent indent | ' +
   'removeformat | help',
   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
 });
  //  cropper图片
   const image = document.querySelector('.cover-left>img');
 const cropper = new Cropper(image, {
  aspectRatio: 400 / 280,
   viewMode:1,
   preview:'.xtp ',
   toggleDragModeOnDblclick:false,
 background:false,
   minCropBoxWidth:100,
   minCropBoxHeight:100,
 });
 //  更换图片 上传时创建上传文件地址更换
$('#file').change(function(){
  cropper.replace(URL.createObjectURL($(this)[0].files[0]))
})
//  填充数据
    $.ajax({
        type:'get',
        url:'/my/article/'+edit,
        success: function(e) {
            if (e.status !== 0) {
              return   window.parent.gxcg(e.message)
            }
           
            $('[name="title"]').val(e.data.title)
            $('[name="cate_id"]').val(e.data.cate_id)
            if($('[name="cate_id"]').val()===null)$('[name="cate_id"]').val('')
            // 设置富文本内容
            setTimeout(() => {
              tinymce.activeEditor.setContent(e.data.content)
          }, 500);
            cropper.replace('http://api-breakingnews-web.itheima.net'+e.data.cover_img)
          }
         
    })
    // 提交数据
   // 提交表单
let state=''
$('.cg').click(()=>state='草稿')
$('.fb').click(()=>state='已发布')
$('form').submit(function(e){
    e.preventDefault()
    if($('[name="cate_id"]').val()===''||$('[name="title"]').val()===''||$('textarea').val()==='')return window.parent.gxcg('内容不能为空')
    // 设置formdata格式数据
let form=new FormData($(this)[0])
form.append('state',state)
form.append('Id',edit)

 // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        
  let img=cropper.getCroppedCanvas({width:400,height:280}).toBlob(function(e){
form.append('cover_img',e)
// 提交数据创建文章
$.ajax({
type:'post',
url:'/my/article/edit',
data:form,
// 注意：如果向服务器提交的是 FormData 格式的数据，必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function(e) {
        if (e.status !== 0) {
          return   window.parent.gxcg(e.message)
        }
        window.parent.gxcg('发布文章成功！')
        // 发布文章成功后，跳转到文章列表页面
        localStorage.removeItem('edit')
        location.href = './text_list.html'
      }
})
  })
})
})