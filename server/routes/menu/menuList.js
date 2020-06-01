const express = require("express");
const router = express.Router();
var db = require('../../config/db.js');
const Token=require('../checkToken');

// //获取所有菜单，每次请求重新生成token。
// app.post('/api/getAllMenu', function (req, res) {
//   console.log("-----getAllMenu start-----");
//   let sqlstr="SELECT * FROM [Menu] where 1=1 ";//定义了mssql 语句 查询用户表信息
//   const qs = require('qs');
//   db.Query(sqlstr, function (result) {
//     //consoleconsole.log(result);
//     res.send({
//       result,
//       status:10000
//     });
//   });
router.get("/getAllMenu",function (req,res) {
    console.log("-----getAllMenu start-----");
        //校验token是否失效
        // Token.check(req.headers.authorization, function (msg) {
        //     if(!msg){//校验失败，返回
        //         res.send({
        //             Issuccess:msg,
        //             status:10010
        //         })
        //     }
        // });
        let sqlstr="SELECT * FROM [sys_Menu] where 1=1 ";//定义了mssql 语句 查询用户表信息
        const qs = require('qs');
        db.Query(sqlstr, function (result) {
            res.send({
            result,
            status:10000
        });
    });
    console.log("-----getAllMenu end-----");
});

module.exports = router;