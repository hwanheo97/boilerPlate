//server side 정보처리

const express = require('express')
//다운받은 모듈 가져오기
const app = express()
const port = 5000     //back 서버
const bodyParser = require('body-parser');  //client에서 요청하는 body를 분석하여 req.body출력 라이브러리
const config=require('./config/key');
const {User} = require('./models/User');

//옵션주기 application/x-www-form-urlencoded , 이런 형태  request 받아 분석하여 넘겨주기
app.use(bodyParser.urlencoded({extended:true}))
//application/json json 형태 받아 뷴석하여 넘겨주기
app.use(bodyParser.json())

const mongoose =require('mongoose')
mongoose.connect(config.mongoURI,{  //첫번째 인자 config.mongoURI 
      //useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
  })
.then(()=>console.log('MongDB Connected...화이팅 with project/boilerPlate!'))
.catch(err => console.log(err))
//.connect() 두번째 인자 {} error방지용


//root directory에 출력
app.get('/', (req, res) => { res.send('Hello World! "npm run dev nodemon index.js') })


//회원가입위한 route만들기
app.post('/register', (req,res)=>{
  //회원 가입할때 필요한 정보들을 client에서 가져오면  //그것들을 데이터 베이스에 넣어준다
 const user = new User(req.body)   // 회원가입정보 db에 넣기위한 준비  json형태 body <= bodyParser 모듈이 있기때문에 가능
 user.save((err,userInfo)=>{       //save() mongdb 메소드 user 모델에 req.body 저장, userInfo에는 json형태 client 회원가입 정보
  if(err) return res.json({success:false,err})
  return res.status(200).json({
    success:true
  })
 })                      
})


//5000번 포트에서 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})