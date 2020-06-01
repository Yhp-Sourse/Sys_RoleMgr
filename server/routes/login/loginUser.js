const express = require("express");
const router = express.Router();
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json();
const md5 = require('md5-node');
const jwt = require('jsonwebtoken');  //用来生成token
// //引用配置文件 db.js 连接数据库
var db = require('../../config/db.js');

// 用户登录 jsonParser:中间件
router.post('/userLogin', jsonParser,function (req, res) {
    console.log("-----userLogin start-----");
    //获取用户登录信息
    let sqlstr="SELECT * FROM sys_usr where Name='admin' and 1=1 ";//定义了mssql 语句 查询用户表信息
    const qs = require('qs');
    if(req.body){
      sqlstr="SELECT * FROM sys_usr with(nolock) where Name='"+req.body.username+"' and Password='"+md5(req.body.password)+"'  ";
    }
    console.log(sqlstr);
    db.Query(sqlstr, function (result) {
      let msg="登录成功！";
      if(result.rowsAffected[0]<=0){
         msg="用户名或密码有误！";
      }
      let content ={name:req.body.name}; // 要生成token的主题信息
       let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
       let token = jwt.sign(content, secretOrPrivateKey, {
           expiresIn: 60*60*1 , // 1小时过期
  
       });
      res.send({
        Issuccess:result.rowsAffected[0]>0,
        msg,
        token,
        status:10000
      });
    });
    console.log("-----userLogin end-----");
  
});

module.exports = router;