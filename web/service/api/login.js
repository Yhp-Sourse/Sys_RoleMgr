var db = require('../db/mssqlDB');
let sqlstr="select * from sys_usr WITH (NOLOCK) where name='' and Password='' " ;

db.Query(sqlstr,function(err,data){
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.length);
});

