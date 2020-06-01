var mssql = require('mssql');  
var db = {};  
var config = {  
    user: 'yhp',  
    password: '310013',  
    server: '127.0.0.1',  
    port:1433,  
    //driver: 'msnodesql',  
    database: 'AirMaintainceDB',  
    connectionString: "Driver={SQL Server Native Client 11.0};Server=.\\sql;Database=AirMaintainceDB;Uid=yhp;Pwd=310013;",  
    // options: { 
    //     encrypt: true // Use this if you're on Windows Azure 
    // }, 
    pool: {  
        min: 0,  
        max: 10,  
        idleTimeoutMillis: 3000  
    }  
}; 
 
db.sql = function (sql, callBack) {  
    var connection = new mssql.ConpmnnectionPool(config, function (err) {  
        if (err) {  
            console.log(err);  
            return;  
        }  
        var ps = new mssql.PreparedStatement(connection);  
        ps.prepare(sql, function (err) {  
            if (err){  
                console.log(err);  
                return;  
            }  
            ps.execute('', function (err, result) {  
                if (err){  
                    console.log(err);  
                    return;  
                }  
  
                ps.unprepare(function (err) {  
                    if (err){  
                        console.log(err);  
                        callback(err,null);  
                        return;  
                    }  
                    callBack(err, result);  
                });  
            });  
        });  
    });  
};  
  
module.exports = db;


//另一种请求方法
// var sql = require('mssql');
// //连接方式："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
// sql.connect("mssql://yhp:310013@localhost:1433/AirMaintainceDB").then(function() {
//     // Query
//     new sql.Request().query('select * from sys_menu').then(function(recordset) {
//         console.log(recordset);
//     }).catch(function(err) {
//        console.log(err);
//     });
//     // Stored Procedure
// }).catch(function(err) {
//     console.log(err);
// })