const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const models=require("./models");
const indexrouter=require("./routes/index");
const nunjucks = require('nunjucks');
//const models = require("./models/index.js");


dotenv.config(); //dotenv에서 process.env로 만드는 과정 수행
const app = express(); // Server 실행. Express <== http를 다 포함하고 있다.
app.use(session({ secret: 'somevalue' }));
app.set('port', process.env.PORT || 3000); //포트 설정
app.set('view engine', 'html');
nunjucks.configure('views', {
      express:app,
      while: true,
});
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
      resave:false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie:{
            httpOnly:true,
            secure:false,
      },
      name:'sesion-cookie'
}));
app.listen(app.get('port'),()=>{
      console.log(app.get('port'),'번포트에서 대기 중');
})


//사용자가 올린 파일을 저장할 폴더 생성
try{
      fs.readdirSync('uploads');
}catch(error){
      console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('uploads');
}

//로컬 DB 연결
models.sequelize.sync().then( () => {
      console.log(" DB 연결 성공");
    }).catch(err => {
      console.log("연결 실패");
      console.log(err);
    });

//rotes 폴더 안에 있는 index.js 사용
app.use('/',indexrouter);

app.get('/', (req, res, next) => {
      console.log('GET / 요청에서만 실행됩니다.');
      next();
}, (req, res) => {
      throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send(err.message);
});