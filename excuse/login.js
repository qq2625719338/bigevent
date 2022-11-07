const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const {  expressjwt : expressjwt }=require('express-jwt')
const cors=require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
let user=[]
// 注册
app.post('/api/reguser',(req,res)=>{
    // 判断提交用户名是否与数组保存用户名相同
let a=user.some((v,i,a)=> v.username===req.body.username)   
if(a){
    res.send( {
        "status":1,
        "message":"用户名被占用，请更换其他用户名！"})
    }else{
    user.push(req.body)
   res.send({"status":0,"message":"注册成功！"})}
})
// 登录
app.use('/api/login',(req,res)=>{
 let a=user.some((v,i,a)=>v.username===req.body.username&&v.password===req.body.password)
 if(a){
    res.send({
        "status": 0,
        "message": "登录成功！"
    })
    }else{
   res.send({
	"status": 1,
	"message": "登录失败！"
})}

})
app.listen(80,()=>console.log('服务器开启'))