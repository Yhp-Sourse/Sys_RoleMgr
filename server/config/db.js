let sql = require('mssql');

//连接方式："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
const constr1="mssql://yhp:310013@localhost:1433/AirMaintainceDB";
const constr="mssql://yhp:310013@localhost:1433/EMCHNVideoMonitor";

var connect=sql.connect("mssql://yhp:310013@127.0.0.1:1433/EMCHNVideoMonitor").then(function() {
    console.log('----------------');
    console.log('-数据库登录成功-');
    console.log('----------------');
}).catch(function(err) {
    console.log(err);
})

var db={};
db.Query=function(sqlstr,callback){
    sql.connect(constr).then(function() {
        // Query
        if(sqlstr==""){
          sqlstr="select * from sys_usr";
        }
        new sql.Request().query(sqlstr).then(function(recordset) {
            //console.log(recordset);
            callback(recordset);
            
        }).catch(function(err) {
           //console.log(err);
        });
        // Stored Procedure
    }).catch(function(err) {
        //console.log(err);
    })
    
}

 db.doMain=function(sqlstr,callBack){
    sql.connect(constr,function () {
        sql.query(sqlstr,function (err,data) {
            if(err){
                callBack(err);
            }
            else{
                callBack(data);
                sql.close()
            }
        })
    })
 }
 
module.exports=db;
