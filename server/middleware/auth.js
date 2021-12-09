
const {User} = require('../models/User');

let auth =(req,res,next) => {
    //안증처리 하는 곳

    //클라이언트 쿠키에서 토큰을가져온다
    let token = req.cookies.x_auth;

    //토큰을 복호화한후 사용자를 찾는다
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true});
           
        //유저가 있으면 okay
        req.token = token;   //req에 token을 넣어 주는 이유는 index.js에서 받아 사용할 수있게 한다
        req.user = user;
        next();  // middleware에서 보내주기      
    })
    //유저가 없으면 인증 No
}
module.exports ={auth};