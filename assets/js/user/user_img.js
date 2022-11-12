$(function(){
    const image = document.querySelector('.bigtp');
const cropper = new Cropper(image, {
  aspectRatio: 1/1,
  viewMode:1,
  preview:'.xtp',
  toggleDragModeOnDblclick:false,
//   zoomable:false,
background:false,
  minCropBoxWidth:100,
  minCropBoxHeight:100,
});
$('input[type=file]').change(function(e){
    // 上传文件创建地址并更换图片地址
        cropper.replace(URL.createObjectURL(e.target.files[0]),false)
})
// 调接口更新图片
$('.btn-danger').click(function(){
    // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
let img=cropper.getCroppedCanvas({width:100,height:100}).toDataURL()
    $.ajax({
        type:'post',
        url:'/my/update/avatar',
        data:{avatar:img},
        success: function(e) {
            if (e.status !== 0) {
             window.parent.gxcg(e.message)
            }
            window.parent.gxcg('更换头像成功')
            window.parent.getuser()
          }
    })
})
})