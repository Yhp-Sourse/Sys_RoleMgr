//引入http模块
const http = require('http')
//引入url模块
const url = require('url')

//创建服务对象
let server = http.createServer((req,res) =>{
    if(req.url === "/"){
        //设置头部信息
        res.setHeader("Content-Type","text/html;charset=utf-8")
        //设置要响应的数据
        //获取提交的参数并返回给客户端
        res.write(`<h3>访问路径:${url.parse(req.url,true).pathname}</h3>`)
        res.write(`<h3>name:${url.parse(req.url,true).query.name}</h3>`)
        res.write(`<h3>gender:${url.parse(req.url,true).query.gender}</h3>`)
        //结束此次响应
        res.end()
    }
})

//开启服务
server.listen("8080","127.0.0.1",function(){
    console.log("Server running at http://127.0.0.1:8080/")
})