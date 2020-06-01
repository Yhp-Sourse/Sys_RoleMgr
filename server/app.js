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
 const md5 = require('md5-node');
 const jwt = require('jsonwebtoken');  //用来生成token
 var cookie = require('cookie-parser');
 var session = require('express-session');
 const router = express.Router();

//  const cors = require('cors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

 var mssql = require('mssql');
// //引用配置文件 db.js 连接数据库
 var db = require('./config/db.js');
 var db2 = require('./config/db2.js');

 var app = express();

// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 

app.use(cookie());
app.use(session({
  secret: '12345',
  name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 10000 },  //设置maxAge是10000ms，即80s后session和相应的cookie失效过期
  resave: false,//强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。 don't save session if unmodified
  saveUninitialized: true,//强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于
  rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}));



//加载admin模块
//app.use(routes); 配置路由：//https://www.jianshu.com/p/ccac60e10d04

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
//路由开始
// app.all("*",function(req,res,next){
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin","*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers","content-type,Authorization");
//   //跨域允许的请求方式 
//   res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//   if (req.method.toLowerCase() == 'options')
//       {res.send(200);}  //让options尝试请求快速结束}
//   else{ next();}
// })
//路由开始
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type,Authorization");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      {res.send(200);}  //让options尝试请求快速结束}
  else {
    next();
  }
})

//每次切换都去调用此接口 用来判断token是否失效 或者过期
app.all("/api/*",function(req,res,next){
  let token = req.headers.authorization; // 从Authorization中获取token
  let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
  jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
      if (err) {  //  时间失效的时候 || 伪造的token
          console.log(1);
          res.send({'status':10010});
          
      } else {
        console.log(2);
        next();//拦截器-》执行下一步
        // res.send({'status':10000});
      }
  })
})


app.get('/', function (req, res) {
  res.send('Hello World');
});

// 查询用户
app.get('/api/userList', function (req, res) {
  //  var db = getDb();
  db.Query('SELECT * FROM sys_usr', function (result) {
    res.send({
      msg:'获取user信息',
      count:result.rowsAffected,
      data:result
    });
  });
});

//获取所有菜单
app.post('/api/getAllMenu', function (req, res) {
  console.log("-----getAllMenu start-----");
  let sqlstr="SELECT * FROM [Menu] WITH (NOLOCK) where 1=1";//定义了mssql 语句 查询用户表信息
  const qs = require('qs');
  db.Query(sqlstr, function (result) {
    // console.log(result);
    res.send({
      result,
      status:10000
    });
  });

  console.log("-----getAllMenu end-----");
});

//获取所有用户
app.post('/api/getUserList',jsonParser, function (req, res) {
  console.log("-----getUserList start-----");
  let sqlstr="SELECT * FROM [Sys_Usr] WITH (NOLOCK) where 1=1 ";//定义了mssql 语句 查询用户表信息
  var keyword=req.body.keyword;
  if(keyword){
    sqlstr+= " AND (Name like '%"+keyword+"%' OR RealName like '%"+keyword+"%')";
  }
  db.Query(sqlstr, function (result) {
    // console.log(result);
    res.send({
      result,
      status:10000
    });
  });

  console.log("-----getUserList end-----");
});

//获取角色select数据源
app.post('/api/getGroupSelectList', function (req, res) {
  console.log("-----getGroupSelectList start-----");
  let sqlstr="SELECT * FROM [Sys_UserGroup] WITH (NOLOCK) where 1=1";//定义了mssql 语句 查询用户表信息
  const qs = require('qs');
  db.Query(sqlstr, function (result) {
    // console.log(result);
    res.send({
      result,
      status:10000
    });
  });

  console.log("-----getGroupSelectList end-----");
});

//获取所有站点树数据源
app.post('/api/getTreeSStationList', function (req, res) {
  console.log("-----getTreeSStationList start-----");
  let sqlstr="SELECT * FROM [t_SStation_Ext] WITH (NOLOCK) where 1=1";//定义了mssql 语句 查询用户表信息
  const qs = require('qs');
  db.Query(sqlstr, function (result) {
    // console.log(result);
    res.send({
      result,
      status:10000
    });
  });

  console.log("-----getTreeSStationList end-----");
});

//根据用户Id获取用户信息 jsonParser:中间件，用于获取请求数据。
app.post('/api/getUsrInfoById',jsonParser, function (req, res) {
  console.log("-----getUsrInfoById start-----");
  let sqlstr="SELECT * FROM [Sys_Usr] WITH (NOLOCK) where 1=1 AND Id ="+req.body.Id;
  const qs = require('qs');
  db.Query(sqlstr, function (result) {
    // console.log(result);
    res.send({
      result,
      status:10000
    });
  });

  console.log("-----getUsrInfoById end-----");
});

//根据用户Id删除用户信息 jsonParser:中间件，用于获取请求数据。
app.post('/api/delUsrInfoById',jsonParser, function (req, res) {
  console.log("-----delUsrInfoById start-----");
  let sqlstr="DELETE [Sys_Usr]  where 1=1 AND Id ="+req.body.Id;
  const qs = require('qs');
  db.Query(sqlstr, function (result) {
    // console.log(result);
    res.send({
      result,
      status:10000
    });
  });

  console.log("-----delUsrInfoById end-----");
});

//提交用户表单信息
app.post('/api/usrSubmit', jsonParser, function (req, res) {
  console.log("-----usrSubmit start-----");
  var usr={
    Id: req.body.Id,
    Name: req.body.Name,
    Password: req.body.Password,
    RealName: req.body.RealName,
    Station: req.body.Station,
    UnitId: req.body.UnitId,
    GroupID: req.body.GroupID,
    Phone: req.body.Phone,
    SortOrder: req.body.SortOrder,
    IsRun: req.body.IsRun,
    IsAdmin: req.body.IsAdmin,
    Description: req.body.Description
  }
  let sqlstr="";
  if(usr.Id>0){
    usr.Password = usr.Password.length <=16? md5(usr.Password) :usr.Password;
    sqlstr="update Sys_Usr set Name='"+usr.Name+"',Password='"+usr.Password+"',RealName='"+usr.RealName+"',Station='"+usr.Station+"',UnitId='"+usr.UnitId+"',GroupID='"+usr.GroupID+"',Phone='"+usr.Phone+"',SortOrder='"+usr.SortOrder+"',IsRun='"+usr.IsRun+"',IsAdmin='"+usr.IsAdmin+"',Description='"+usr.Description+"' where Id ="+req.body.Id;
  }else{
    sqlstr="INSERT INTO Sys_Usr (Name,PassWord,RealName,Station,UnitId,GroupID,Phone,SortOrder,IsRun,IsAdmin,Description) values ('"+usr.Name+"','"+md5(usr.Password)+"','"+usr.RealName+"','"+usr.Station+"','"+usr.UnitId+"','"+usr.GroupID+"','"+usr.Phone+"','"+usr.SortOrder+"','"+usr.IsRun+"','"+usr.IsAdmin+"','"+usr.Description+"')";
  }
  console.log(sqlstr);
  db.doMain(sqlstr,function(result){
    console.log(result);
    res.send({
      result,
      status:10000
    });
  });
  console.log("-----usrSubmit end-----");
});



// 用户登录 jsonParser:中间件
app.post('/userLogin', jsonParser,function (req, res) {
  console.log("登录操作");
  //  var db = getDb();
  console.log("-----userLogin start-----");
  //获取用户登录信息
  
  let sqlstr="SELECT * FROM sys_usr WITH (NOLOCK) where Name='admin' and 1=1 ";//定义了mssql 语句 查询用户表信息
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
    sqlstr="SELECT * FROM sys_usr WITH (NOLOCK) where Name='"+req.body.username+"' and Password='"+md5(req.body.password)+"'  ";
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
         expiresIn: 60*60*24 , // 24小时过期

     });
    //let token="123123123123";
    req.session.login='yhp';
    req.session.username= req.body.username;
    res.send({
      Issuccess:result.rowsAffected[0]>0,
      msg,
      token,
      status:10000
    });
  });
  console.log("-----userLogin end-----");

});
// //引入route模块
// const routers  = require("./routes/Mainrouter");
// //加载admin模块
// app.use('/API',routers);
// //路由结束 

var server = app.listen(3001, function () {
  console.log("run......");
});


module.exports = app;