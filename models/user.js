//user모델만들기 -mongoose model : CRUD를 위한 database연결, schema : 모델의 크기,type 등 정의

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   
const saltRounds = 10;   //10자리인 salt
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true, // 뛰우기,빈칸 없애기
        unique: 1 // 중복 방지
    },
    password:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{   //권한부여
        type:Number,
        default:0
    },
    image:String,
    
    token:{  //유효성관리
        type:String
    },
    tokenExp:{  //유효기간
        type:Number
    }
 })
 userSchema.pre('save',function(next){  //index.js 의 user.save()하기전에 암호화 처리후 next()로 다시보내기
     var user = this; //userSchema안 전체 가리킴
     if(user.isModified('password')){   //비밀번호 변경시에만 암호화 
        //비번을 암화화 시킨다
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err)      //next하면 index.js의  user.save((err,userInfo)=>{  } 로 들어가게됨

        bcrypt.hash(user.password,salt, function(err,hash){   //두번째인자 hash는 암호하된 것 , user.password = 1234567 입력값
            if(err) return next(err)
            user.password=hash      //hash를 비번으로
            next()
        })
    })
   }else{
       next()  // 비밀번호 변경이 아니면 next()로 보내기
   }
 })   //mongDB에 저장하기전에 

 userSchema.methods.comparePassword = function(plainPassword, cb){   
     //comparePassword는  app.post('/login',(req,res)=>{}의 comparePassword와 같게
    //plainPassword 123456 과 암호화된 비번과 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch); 
        //null은 error없다. isMatch = true  => index.js user.comparePassword()로 감
 
    })
 }
 userSchema.methods.generateToken=function(cb){
     var user = this;
     //jsonwebtoken을 이용하여 token 생성하기
     var token = jwt.sign(user._id.toHexString(), 'secretToken')  
     //user._id + 'secretToken' = token,secretToken는 임의의 이름, 두개를 합쳐 토큰 만들릭 , secretToken -> user._id
     user.token = token
     user.save(function(err,user){
         if(err) return cb(err)
         cb(null, user)     
         // user => index.js 의 user.generateToken((err, user) =>
     })
 }
 userSchema.statics.findByToken = function(token,cb){
     var user =this;

     //token을 가져와 decode 한다.
     jwt.verify(token,'secretToken', function(err, decoded){
         //유저 아이디를 이용해서 유저를 찾은 다음에
         //클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는 지 확인

         user.findOne({"_id": decoded, "token":token}, function(err,user){
             if(err) return cb(err);
             cb(null, user);
         })


     })

 }

 const User = mongoose.model('user',userSchema)    //위 Schema를 모델로 감싼다
 module.exports ={User}