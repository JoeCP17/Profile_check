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


dotenv.config(); 
const app = express(); 
app.use(session({ secret: 'somevalue' }));
app.set('port', process.env.PORT || 3100);
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



try{
      fs.readdirSync('uploads');
}catch(error){
      console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('uploads');
}

try{
      fs.readdirSync('remake');
}catch(error){
      console.error('remake 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('remake');
}


models.sequelize.sync().then( () => {
      console.log(" DB 연결 성공");
    }).catch(err => {
      console.log("연결 실패");
      console.log(err);
    });

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