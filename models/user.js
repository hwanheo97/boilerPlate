//user모델만들기 -mongoose model : CRUD를 위한 database연결, schema : 모델의 크기,type 등 정의

const mongoose = require('mongoose');

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
        maxlength:20
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
 const User = mongoose.model('user',userSchema)    //위 Schema를 모델로 감싼다
 module.exports ={User}