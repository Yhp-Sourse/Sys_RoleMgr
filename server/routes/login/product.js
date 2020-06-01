const express = require("express");
const router = express.Router();
const Token=require('../checkToken');

router.get("/",function (req,res) {
    //校验token是否失效
    Token.check(req.headers.authorization, function (msg) {
        if(msg){
            res.send({
                Issuccess:msg,
                status:10010
              })
        }else{
            res.send({
                Issuccess:msg,
                status:10000
              })
        }
    });
});
router.get("/add",function (req,res) {
    res.send("添加")
});
router.get("/delete",function (req,res) {
    res.send("商品del")
});
module.exports = router;