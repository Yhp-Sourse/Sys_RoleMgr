// var express = require('express');
// var app = express();
// var mssql = require('mssql');
// //引用配置文件 db.js 连接数据库
// var db = require('./config/db.js');
 
// app.all("*",function(req,res,next){
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin","*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers","content-type");
//   //跨域允许的请求方式 
//   res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//   if (req.method.toLowerCase() == 'options')
//       res.send(200);  //让options尝试请求快速结束
//   else
//       next();
// })
 
// // 查询用户
// app.get('/userList', function (req, res) {
//   //  var db = getDb();
//   db.Query('SELECT * FROM sys_usr', function (err, result) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.send({
//       msg:'获取user信息',
//       code:200,
//       data:result
//     });
//   });
// });
 
// var server = app.listen(3000, function () {
//   console.log("run......");
// });

// var createError = require('http-errors');
var express = require('express');
const bodyParser=require("body-parser");
const util = require('util')
var md5 = require('md5-node');
const jwt = require('jsonwebtoken');  //用来生成token
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var mssql = require('mssql');
// //引用配置文件 db.js 连接数据库
var db = require('./config/db.js');

var app = express();


// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.all("*",function(req,res,next){
 //设置允许跨域的域名，*代表允许任意域名跨域
 res.header("Access-Control-Allow-Origin","*");
 //允许的header类型
 res.header("Access-Control-Allow-Headers","content-type");
 //跨域允许的请求方式 
 res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
 if (req.method.toLowerCase() == 'options')
     res.send(200);  //让options尝试请求快速结束
 else
     next();
})

app.get('/', function (req, res) {
 res.send('Hello World');
});

//每次切换都去调用此接口 用来判断token是否失效 或者过期
// app.post('/checkUser',jsonParser,(req,res)=>{
//   let token = req.get("Authorization"); // 从Authorization中获取token
//   let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
//   jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
//       if (err) {  //  时间失效的时候 || 伪造的token
//           res.send({'status':10010});
//       } else {
//           res.send({'status':10000});
//       }
//   })
// });

// 查询用户
app.get('/userList', function (req, res) {
 //  var db = getDb();
 db.Query('SELECT * FROM sys_usr', function (result) {
   res.send({
     msg:'获取user信息',
     code:result.rowsAffected,
     data:result
   });
 });
});

// 用户登录 jsonParser:中间件
app.post('/userLogin', jsonParser,function (req, res) {
 //  var db = getDb();
 console.log("-----userLogin start-----");
 //获取用户登录信息
 
 let sqlstr="SELECT * FROM sys_usr where Name='admin' and 1=1 ";//定义了mssql 语句 查询用户表信息
 const qs = require('qs');
 // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
 //var post ;     定义了一个post变量，用于暂存请求体的信息
 // req.on('data', function(chunk){ 
 //     post = chunk;
 // });
 // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
 // req.on('end', function(){    
 //   post = post;
 // });

 if(req.body){
   sqlstr="SELECT * FROM sys_usr with(nolock) where Name='"+req.body.username+"' and Password='"+md5(req.body.password)+"'  ";
 }
 console.log(sqlstr);
 db.Query(sqlstr, function (result) {
   let msg="登录成功！";
   let token="123123123123";//
   if(result.rowsAffected[0]<=0){
      msg="用户名或密码有误！";
   }else{
     let content ={name:req.body.name}; // 要生成token的主题信息
     let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
     let token = jwt.sign(content, secretOrPrivateKey, {
         expiresIn: 60*60*1  // 1小时过期
     });
   }
   
   res.send({
     Issuccess:result.rowsAffected[0]>0,
     msg,
     token
   });
 });
 console.log("-----userLogin end-----");

});

var server = app.listen(3001, function () {
 console.log("run......");
});


module.exports = app;