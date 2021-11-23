const express = require('express')
//다운받은 모듈 가져오기
const app = express()
const port = 5000
//back 서버
const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://ben:ben3421@cluster0.wpnnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
      //useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
  }
)
.then(()=>console.log('MongDB Connected...화이팅!'))
.catch(err => console.log(err))


// mongoose.connect('mongodb+srv://ben:ben3421@cluster0.wpnnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//     useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
// }).then(()=>console.log('MongDB Connected... 잘 연결 됐는지 확인'))
//.catch(err => console.log(err))
//.connect() 두번째 인자 {} error방지용

//root directory에 출력
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//5000번 포트에서 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})