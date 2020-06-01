let sql = require('mssql');
//连接方式："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
const constr="mssql://yhp:310013@localhost:1433/AirMaintainceDB";

var db={};
db.Query=function(sqlstr,callback){
    sql.connect(constr).then(function() {
        // Query
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

module.exports=db;
