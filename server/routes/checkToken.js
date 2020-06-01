const jwt = require('jsonwebtoken');  //用来生成token
//每次切换都去调用此接口 用来判断token是否失效 或者过期
var Token={};
Token.check=function(token,callback){
    let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
    jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
        if (err) {  //  时间失效的时候 || 伪造的token
            callback(false);
        } else {
            callback(true);
        }
    })
}
module.exports = Token;
