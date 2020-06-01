var db = require('./mssqlDB');
db.Query('select * from sys_usr',function(err,data){
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.length);
});

// db.selectAll("sys_usr",function(err,data){
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data.length);
// });
