//server side 정보처리

const express = require('express')//다운받은 모듈 가져오기
const app = express()
const bodyParser = require('body-parser');  //client에서 요청하는 body를 분석하여 req.body출력 라이브러리
const cookieParser = require('cookie-parser');  //token 저장용 library
const config=require('./config/key');  //db key , id, ps 정보 보호 의한 객체
const {auth} = require('./middleware/auth');
const {User} = require('./models/User');   //DB schema

//옵션주기, application/x-www-form-urlencoded , 이런 형태  request 받아 분석하여 넘겨주기
app.use(bodyParser.urlencoded({extended:true}))
//application/json json 형태 받아 분석하여 넘겨주기
app.use(bodyParser.json());   
app.use(cookieParser());  //사용정의

const mongoose =require('mongoose')
mongoose.connect(config.mongoURI,{  
  //첫번째 인자 config.mongoURI , 배포후 Heroku 사이트내 Config Vars에 value는 MONG_URI 값은 Key값 넣어야함
  //useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false =>.connect() 두번째 인자 {} error방지용
  })
.then(()=>console.log('MongDB Connected...화이팅 with project/boilerPlate!'))
.catch(err => console.log(err))

//root directory에 출력
//app.get('/', (req, res) => { res.send('Hello React!') })

//request를 받는 router
//app.get('/api/hello', (req,res)=>{
//  res.send("hello React using proxy fm 3000 to 5000")
// })

//회원가입위한 route만들기
app.post('/api/users/register', (req,res)=>{
    //회원 가입할때 필요한 정보들을 client에서 가져오면  //그것들을 데이터 베이스에 넣어준다, 저장하기전에 password 암호화 hash
 const user = new User(req.body)   // 회원가입정보 db에 넣기위한 준비  json형태 body <= bodyParser 모듈이 있기때문에 가능
 user.save((err,userInfo)=>{       //save() mongdb 메소드 user 모델에 req.body 저장, userInfo에는 json형태 client 회원가입 정보
  if(err) return res.json({success:false,err});
  return res.status(200).json({
    success:true
  })
 })
})

app.post('/api/users/login',(req,res)=>{
  //요청한 이메일을 데이터베이스에 있는 지 확인 한다.
  User.findOne({email:req.body.email},(err,user)=>{   //user = email,
    if(!user){
      return res.json({
        loginSuccess:false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다."
      })
    }
      //있다면 비밀번호가 맞는 비번인지 확인한다
    user.comparePassword(req.body.password,(err, isMatch) => {
      if(!isMatch) 
      return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})
          
      //비.번이 맞다면 토큰을 생성학기
    user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에 ? cookie, local storage
        res.cookie("x_auth",user.token)
          .status(200)
          .json({loginSuccess:true, userId:user._id});
      })
    })
  })
})

app.get('/api/users/auth',auth,(req,res)=>{

//여기까지 미들웨어를 통과해 왔다는 것은 Authentication이 true라는 의미 => client 에 정보 전달
  res.status(200).json({
    _id:req.user._id,
    isAdmin: req.user.role === 0 ? false : true,  //role 0->  일반유저 , role이 0이 아니면 관리자 
    isAuth:true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role:req.user.role,
    image:req.user.image
  })
})

app.get('/api/users/logout', auth, (req,res) => {

  User.findOneAndUpdate({_id:req.user._id},
    {token:""},
    (err,user) => {
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success:true
      })
     })
})



const port = process.env.PORT || 5000;  
//app.listen(port, () => {
//  console.log(`Example app listening at https://benplate.herokuapp.com:${port}`)
 // console.log(`Example app listening at http://localhost:${port}`)
//})

app.listen(port, function(req,res){
  console.log('server running on port ' + port);

});