const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {spawn} = require('child_process');
const fs =require('fs');
//모델 객체들을 생성
const Task1 =require('../models').Task1;
const Task2 =require('../models').Task2;
const Task3 =require('../models').Task3;
const Task4 =require('../models').Task4;
const Task5 =require('../models').Task5;
const Core1 =require('../models').Core1;
const Core2 =require('../models').Core2;
const Core3 =require('../models').Core3;
const Core4 =require('../models').Core4;
const Core5 =require('../models').Core5;
const task1 = require('../models/task1');
const core1 = require('../models/core1');
//Task 객체들에 각 core별로 값을 넣기 위한 중간 저장소로 배열들을 선언
const arr1 = new Array();
const arr2 = new Array();
const arr3 = new Array();
const arr4 = new Array();
const arr5 = new Array();

const core1_max=new Array();
const core1_min=new Array();
const core1_avg=new Array();
const array=Array(Array(),Array());

//'/'로 get요청이 오면 multipart html을 응답
router.get('/', function(req, res, next) {
      res.render('multipart');
   });

var user_file;


//사용자가 파일을 올리면 그 파일은 upload폴더 안에 생성
const upload = multer({
      storage: multer.diskStorage({ //올릴 부분에 대한 정보
            destination(req, file, done){ // 실제로 파일이 올라갈 부분 명시
                  done(null, 'uploads/');
            },
            filename(req, file, done){ //파일의 이름 명시를 통해 파일이 겹치는걸 방지
                  const ext = path.extname(file.originalname);
                  user_file = path.basename(file.originalname, ext) + Date.now() + ext; 
                  done(null, user_file);
            },
      }),
      limits: {filesize: 5 * 1024 * 1024}, //파일 사이즈
});

// '/'로 post 요청이 오면 실제로 upload
router.post('/', 
      upload.fields([{name: 'txt1'}]),
      (req, res, next)=> {
            console.log(req.files, req.body);
            next();
      },
);

//그 후 사용자가 올린 파일을 이용하여 데이터 가공 및 결과 html 응답
router.post('/', async (req, res) => {
      //데이터 가공을 위한 함수 호출(파이썬을 이용하여 파일 가공)
      await gotopython()
      //가공된 파일을 읽어서 DB에 저장하는 함수 호출
      await readtxtfile(user_file);
      //결과 페이지를 보여줌
      res.render('result');
      }
 );

 //사용자가 누른 버튼이 core1이라면 core1에 맞는 데이터를 json형식으로 보내줌, 나머지도 동일
 router.get('/core1', async(req,res)=>{
      res.status(201).json(await core1data());
 });
 router.get('/core2', async(req,res)=>{
      res.status(201).json(await core2data());
 });
 router.get('/core3', async(req,res)=>{
      res.status(201).json(await core3data());
 });
 router.get('/core4', async(req,res)=>{
      res.status(201).json(await core4data());
 });
 router.get('/core5', async(req,res)=>{
      res.status(201).json(await core5data());
 });
 router.get('/task1', async(req,res)=>{
      res.status(201).json(await task1data());
 });
 router.get('/task2', async(req,res)=>{
      res.status(201).json(await task2data());
 });
 router.get('/task3', async(req,res)=>{
      res.status(201).json(await task3data());
 });
 router.get('/task4', async(req,res)=>{
      res.status(201).json(await task4data());
 });
 router.get('/task5', async(req,res)=>{
      res.status(201).json(await task5data());
 });

 //Task5 모델에 맞는 데이터들의 최댓값 최솟값 평균을 구하는 함수, 나머지도 모델에 맞게 생성
 async function task5data(){
      let core1_max;
      let core1_min;
      let core1_avg;
      let core2_max;
      let core2_min;
      let core2_avg;
      let core3_max;
      let core3_min;
      let core3_avg;
      let core4_max;
      let core4_min;
      let core4_avg;
      let core5_max;
      let core5_min;
      let core5_avg;
      //Task5 모델의 attribute가 core1인 값들 중에서 최댓값을 저장, 나머지도 최대, 최소, 평균에 맞게 저장
      core1_max = await Task5.max('core1').then(max => {
            return max;
      });
      core1_min= await Task5.min('core1').then(min => {
            return min;
      });
      core1_avg= await Task5.sum('core1').then(sum => {
            return sum / 10;
      });
      core2_max = await Task5.max('core2').then(max => {
            return max;
      });
      core2_min= await Task5.min('core2').then(min => {
            return min;
      });
      core2_avg= await Task5.sum('core2').then(sum => {
            return sum / 10;
      });
      core3_max = await Task5.max('core3').then(max => {
            return max;
      });
      core3_min= await Task5.min('core3').then(min => {
            return min;
      });
      core3_avg=await Task5.sum('core3').then(sum => {
            return sum / 10;
      });
      core4_max = await Task5.max('core4').then(max => {
            return max;
      });
      core4_min= await Task5.min('core4').then(min => {
            return min;
      });
      core4_avg= await Task5.sum('core4').then(sum => {
            return sum / 10;
      });
      core5_max = await Task5.max('core5').then(max => {
            return max;
      });
      core5_min= await Task5.min('core5').then(min => {
            return min;
      });
      core5_avg= await Task5.sum('core5').then(sum => {
            return sum / 10;
      });

      //추출한 값들을 json형식으로 전송하기 위하여 json배열을 생성하고 값 저장
      task5_value = {
            max_core1 : core1_max,
            min_core1 : core1_min,
            avg_core1 : core1_avg,
            max_core2 : core2_max,
            min_core2 : core2_min,
            avg_core2 : core2_avg,
            max_core3 : core3_max,
            min_core3 : core3_min,
            avg_core3 : core3_avg,
            max_core4 : core4_max,
            min_core4 : core4_min,
            avg_core4 : core4_avg,
            max_core5 : core5_max,
            min_core5 : core5_min,
            avg_core5 : core5_avg

      };
return task5_value;
}
 async function task4data(){
      let core1_max;
      let core1_min;
      let core1_avg;
      let core2_max;
      let core2_min;
      let core2_avg;
      let core3_max;
      let core3_min;
      let core3_avg;
      let core4_max;
      let core4_min;
      let core4_avg;
      let core5_max;
      let core5_min;
      let core5_avg;
      core1_max = await Task4.max('core1').then(max => {
            return max;
      });
      core1_min= await Task4.min('core1').then(min => {
            return min;
      });
      core1_avg= await Task4.sum('core1').then(sum => {
            return sum / 10;
      });
      core2_max = await Task4.max('core2').then(max => {
            return max;
      });
      core2_min= await Task4.min('core2').then(min => {
            return min;
      });
      core2_avg= await Task4.sum('core2').then(sum => {
            return sum / 10;
      });
      core3_max = await Task4.max('core3').then(max => {
            return max;
      });
      core3_min= await Task4.min('core3').then(min => {
            return min;
      });
      core3_avg=await Task4.sum('core3').then(sum => {
            return sum / 10;
      });
      core4_max = await Task4.max('core4').then(max => {
            return max;
      });
      core4_min= await Task4.min('core4').then(min => {
            return min;
      });
      core4_avg= await Task4.sum('core4').then(sum => {
            return sum / 10;
      });
      core5_max = await Task4.max('core5').then(max => {
            return max;
      });
      core5_min= await Task4.min('core5').then(min => {
            return min;
      });
      core5_avg= await Task4.sum('core5').then(sum => {
            return sum / 10;
      });

      task4_value = {
            max_core1 : core1_max,
            min_core1 : core1_min,
            avg_core1 : core1_avg,
            max_core2 : core2_max,
            min_core2 : core2_min,
            avg_core2 : core2_avg,
            max_core3 : core3_max,
            min_core3 : core3_min,
            avg_core3 : core3_avg,
            max_core4 : core4_max,
            min_core4 : core4_min,
            avg_core4 : core4_avg,
            max_core5 : core5_max,
            min_core5 : core5_min,
            avg_core5 : core5_avg

      };
return task4_value;
}
 async function task3data(){
      let core1_max;
      let core1_min;
      let core1_avg;
      let core2_max;
      let core2_min;
      let core2_avg;
      let core3_max;
      let core3_min;
      let core3_avg;
      let core4_max;
      let core4_min;
      let core4_avg;
      let core5_max;
      let core5_min;
      let core5_avg;
      core1_max = await Task3.max('core1').then(max => {
            return max;
      });
      core1_min= await Task3.min('core1').then(min => {
            return min;
      });
      core1_avg= await Task3.sum('core1').then(sum => {
            return sum / 10;
      });
      core2_max = await Task3.max('core2').then(max => {
            return max;
      });
      core2_min= await Task3.min('core2').then(min => {
            return min;
      });
      core2_avg= await Task3.sum('core2').then(sum => {
            return sum / 10;
      });
      core3_max = await Task3.max('core3').then(max => {
            return max;
      });
      core3_min= await Task3.min('core3').then(min => {
            return min;
      });
      core3_avg=await Task3.sum('core3').then(sum => {
            return sum / 10;
      });
      core4_max = await Task3.max('core4').then(max => {
            return max;
      });
      core4_min= await Task3.min('core4').then(min => {
            return min;
      });
      core4_avg= await Task3.sum('core4').then(sum => {
            return sum / 10;
      });
      core5_max = await Task3.max('core5').then(max => {
            return max;
      });
      core5_min= await Task3.min('core5').then(min => {
            return min;
      });
      core5_avg= await Task3.sum('core5').then(sum => {
            return sum / 10;
      });

      task3_value = {
            max_core1 : core1_max,
            min_core1 : core1_min,
            avg_core1 : core1_avg,
            max_core2 : core2_max,
            min_core2 : core2_min,
            avg_core2 : core2_avg,
            max_core3 : core3_max,
            min_core3 : core3_min,
            avg_core3 : core3_avg,
            max_core4 : core4_max,
            min_core4 : core4_min,
            avg_core4 : core4_avg,
            max_core5 : core5_max,
            min_core5 : core5_min,
            avg_core5 : core5_avg

      };
return task3_value;
}
 async function task1data(){
      let core1_max;
      let core1_min;
      let core1_avg;
      let core2_max;
      let core2_min;
      let core2_avg;
      let core3_max;
      let core3_min;
      let core3_avg;
      let core4_max;
      let core4_min;
      let core4_avg;
      let core5_max;
      let core5_min;
      let core5_avg;
      core1_max = await Task1.max('core1').then(max => {
            return max;
      });
      core1_min= await Task1.min('core1').then(min => {
            return min;
      });
      core1_avg= await Task1.sum('core1').then(sum => {
            return sum / 10;
      });
      core2_max = await Task1.max('core2').then(max => {
            return max;
      });
      core2_min= await Task1.min('core2').then(min => {
            return min;
      });
      core2_avg= await Task1.sum('core2').then(sum => {
            return sum / 10;
      });
      core3_max = await Task1.max('core3').then(max => {
            return max;
      });
      core3_min= await Task1.min('core3').then(min => {
            return min;
      });
      core3_avg=await Task1.sum('core3').then(sum => {
            return sum / 10;
      });
      core4_max = await Task1.max('core4').then(max => {
            return max;
      });
      core4_min= await Task1.min('core4').then(min => {
            return min;
      });
      core4_avg= await Task1.sum('core4').then(sum => {
            return sum / 10;
      });
      core5_max = await Task1.max('core5').then(max => {
            return max;
      });
      core5_min= await Task1.min('core5').then(min => {
            return min;
      });
      core5_avg= await Task1.sum('core5').then(sum => {
            return sum / 10;
      });

      task1_value = {
            max_core1 : core1_max,
            min_core1 : core1_min,
            avg_core1 : core1_avg,
            max_core2 : core2_max,
            min_core2 : core2_min,
            avg_core2 : core2_avg,
            max_core3 : core3_max,
            min_core3 : core3_min,
            avg_core3 : core3_avg,
            max_core4 : core4_max,
            min_core4 : core4_min,
            avg_core4 : core4_avg,
            max_core5 : core5_max,
            min_core5 : core5_min,
            avg_core5 : core5_avg

      };
return task1_value;
}
async function task2data(){
      let core1_max;
      let core1_min;
      let core1_avg;
      let core2_max;
      let core2_min;
      let core2_avg;
      let core3_max;
      let core3_min;
      let core3_avg;
      let core4_max;
      let core4_min;
      let core4_avg;
      let core5_max;
      let core5_min;
      let core5_avg;
      core1_max = await Task2.max('core1').then(max => {
            return max;
      });
      core1_min= await Task2.min('core1').then(min => {
            return min;
      });
      core1_avg= await Task2.sum('core1').then(sum => {
            return sum / 10;
      });
      core2_max = await Task2.max('core2').then(max => {
            return max;
      });
      core2_min= await Task2.min('core2').then(min => {
            return min;
      });
      core2_avg= await Task2.sum('core2').then(sum => {
            return sum / 10;
      });
      core3_max = await Task2.max('core3').then(max => {
            return max;
      });
      core3_min= await Task2.min('core3').then(min => {
            return min;
      });
      core3_avg=await Task2.sum('core3').then(sum => {
            return sum / 10;
      });
      core4_max = await Task2.max('core4').then(max => {
            return max;
      });
      core4_min= await Task2.min('core4').then(min => {
            return min;
      });
      core4_avg= await Task2.sum('core4').then(sum => {
            return sum / 10;
      });
      core5_max = await Task2.max('core5').then(max => {
            return max;
      });
      core5_min= await Task2.min('core5').then(min => {
            return min;
      });
      core5_avg= await Task2.sum('core5').then(sum => {
            return sum / 10;
      });

      task2_value = {
            max_core1 : core1_max,
            min_core1 : core1_min,
            avg_core1 : core1_avg,
            max_core2 : core2_max,
            min_core2 : core2_min,
            avg_core2 : core2_avg,
            max_core3 : core3_max,
            min_core3 : core3_min,
            avg_core3 : core3_avg,
            max_core4 : core4_max,
            min_core4 : core4_min,
            avg_core4 : core4_avg,
            max_core5 : core5_max,
            min_core5 : core5_min,
            avg_core5 : core5_avg

      };
return task2_value;
}
 async function core5data(){
      let task1_max;
      let task1_min;
      let task1_avg;
      let task2_max;
      let task2_min;
      let task2_avg;
      let task3_max;
      let task3_min;
      let task3_avg;
      let task4_max;
      let task4_min;
      let task4_avg;
      let task5_max;
      let task5_min;
      let task5_avg;
      task1_max = await Core5.max('task1').then(max => {
            return max;
      });
      task1_min= await Core5.min('task1').then(min => {
            return min;
      });
      task1_avg= await Core5.sum('task1').then(sum => {
            return sum / 10;
      });
      task2_max = await Core5.max('task2').then(max => {
            return max;
      });
      task2_min= await Core5.min('task2').then(min => {
            return min;
      });
      task2_avg= await Core5.sum('task2').then(sum => {
            return sum / 10;
      });
      task3_max = await Core5.max('task3').then(max => {
            return max;
      });
      task3_min= await Core5.min('task3').then(min => {
            return min;
      });
      task3_avg=await Core5.sum('task3').then(sum => {
            return sum / 10;
      });
      task4_max = await Core5.max('task4').then(max => {
            return max;
      });
      task4_min= await Core5.min('task4').then(min => {
            return min;
      });
      task4_avg= await Core5.sum('task4').then(sum => {
            return sum / 10;
      });
      task5_max = await Core5.max('task5').then(max => {
            return max;
      });
      task5_min= await Core5.min('task5').then(min => {
            return min;
      });
      task5_avg= await Core5.sum('task5').then(sum => {
            return sum / 10;
      });

      core5_value = {
            max_task1 : task1_max,
            min_task1 : task1_min,
            avg_task1 : task1_avg,
            max_task2 : task2_max,
            min_task2 : task2_min,
            avg_task2 : task2_avg,
            max_task3 : task3_max,
            min_task3 : task3_min,
            avg_task3 : task3_avg,
            max_task4 : task4_max,
            min_task4 : task4_min,
            avg_task4 : task4_avg,
            max_task5 : task5_max,
            min_task5 : task5_min,
            avg_task5 : task5_avg

      };
return core5_value;
}

 async function core4data(){
      let task1_max;
      let task1_min;
      let task1_avg;
      let task2_max;
      let task2_min;
      let task2_avg;
      let task3_max;
      let task3_min;
      let task3_avg;
      let task4_max;
      let task4_min;
      let task4_avg;
      let task5_max;
      let task5_min;
      let task5_avg;
      task1_max = await Core4.max('task1').then(max => {
            return max;
      });
      task1_min= await Core4.min('task1').then(min => {
            return min;
      });
      task1_avg= await Core4.sum('task1').then(sum => {
            return sum / 10;
      });
      task2_max = await Core4.max('task2').then(max => {
            return max;
      });
      task2_min= await Core4.min('task2').then(min => {
            return min;
      });
      task2_avg= await Core4.sum('task2').then(sum => {
            return sum / 10;
      });
      task3_max = await Core4.max('task3').then(max => {
            return max;
      });
      task3_min= await Core4.min('task3').then(min => {
            return min;
      });
      task3_avg=await Core4.sum('task3').then(sum => {
            return sum / 10;
      });
      task4_max = await Core4.max('task4').then(max => {
            return max;
      });
      task4_min= await Core4.min('task4').then(min => {
            return min;
      });
      task4_avg= await Core4.sum('task4').then(sum => {
            return sum / 10;
      });
      task5_max = await Core4.max('task5').then(max => {
            return max;
      });
      task5_min= await Core4.min('task5').then(min => {
            return min;
      });
      task5_avg= await Core4.sum('task5').then(sum => {
            return sum / 10;
      });

      core4_value = {
            max_task1 : task1_max,
            min_task1 : task1_min,
            avg_task1 : task1_avg,
            max_task2 : task2_max,
            min_task2 : task2_min,
            avg_task2 : task2_avg,
            max_task3 : task3_max,
            min_task3 : task3_min,
            avg_task3 : task3_avg,
            max_task4 : task4_max,
            min_task4 : task4_min,
            avg_task4 : task4_avg,
            max_task5 : task5_max,
            min_task5 : task5_min,
            avg_task5 : task5_avg

      };
return core4_value;
}

 async function core3data(){
      let task1_max;
      let task1_min;
      let task1_avg;
      let task2_max;
      let task2_min;
      let task2_avg;
      let task3_max;
      let task3_min;
      let task3_avg;
      let task4_max;
      let task4_min;
      let task4_avg;
      let task5_max;
      let task5_min;
      let task5_avg;
      task1_max = await Core3.max('task1').then(max => {
            return max;
      });
      task1_min= await Core3.min('task1').then(min => {
            return min;
      });
      task1_avg= await Core3.sum('task1').then(sum => {
            return sum / 10;
      });
      task2_max = await Core3.max('task2').then(max => {
            return max;
      });
      task2_min= await Core3.min('task2').then(min => {
            return min;
      });
      task2_avg= await Core3.sum('task2').then(sum => {
            return sum / 10;
      });
      task3_max = await Core3.max('task3').then(max => {
            return max;
      });
      task3_min= await Core3.min('task3').then(min => {
            return min;
      });
      task3_avg=await Core3.sum('task3').then(sum => {
            return sum / 10;
      });
      task4_max = await Core3.max('task4').then(max => {
            return max;
      });
      task4_min= await Core3.min('task4').then(min => {
            return min;
      });
      task4_avg= await Core3.sum('task4').then(sum => {
            return sum / 10;
      });
      task5_max = await Core3.max('task5').then(max => {
            return max;
      });
      task5_min= await Core3.min('task5').then(min => {
            return min;
      });
      task5_avg= await Core3.sum('task5').then(sum => {
            return sum / 10;
      });

      core3_value = {
            max_task1 : task1_max,
            min_task1 : task1_min,
            avg_task1 : task1_avg,
            max_task2 : task2_max,
            min_task2 : task2_min,
            avg_task2 : task2_avg,
            max_task3 : task3_max,
            min_task3 : task3_min,
            avg_task3 : task3_avg,
            max_task4 : task4_max,
            min_task4 : task4_min,
            avg_task4 : task4_avg,
            max_task5 : task5_max,
            min_task5 : task5_min,
            avg_task5 : task5_avg

      };
return core3_value;
}

async function core1data(){
            let task1_max;
            let task1_min;
            let task1_avg;
            let task2_max;
            let task2_min;
            let task2_avg;
            let task3_max;
            let task3_min;
            let task3_avg;
            let task4_max;
            let task4_min;
            let task4_avg;
            let task5_max;
            let task5_min;
            let task5_avg;
            task1_max = await Core1.max('task1').then(max => {
                  return max;
            });
            task1_min= await Core1.min('task1').then(min => {
                  return min;
            });
            task1_avg= await Core1.sum('task1').then(sum => {
                  return sum / 10;
            });
            task2_max = await Core1.max('task2').then(max => {
                  return max;
            });
            task2_min= await Core1.min('task2').then(min => {
                  return min;
            });
            task2_avg= await Core1.sum('task2').then(sum => {
                  return sum / 10;
            });
            task3_max = await Core1.max('task3').then(max => {
                  return max;
            });
            task3_min= await Core1.min('task3').then(min => {
                  return min;
            });
            task3_avg=await Core1.sum('task3').then(sum => {
                  return sum / 10;
            });
            task4_max = await Core1.max('task4').then(max => {
                  return max;
            });
            task4_min= await Core1.min('task4').then(min => {
                  return min;
            });
            task4_avg= await Core1.sum('task4').then(sum => {
                  return sum / 10;
            });
            task5_max = await Core1.max('task5').then(max => {
                  return max;
            });
            task5_min= await Core1.min('task5').then(min => {
                  return min;
            });
            task5_avg= await Core1.sum('task5').then(sum => {
                  return sum / 10;
            });

            core1_value = {
                  max_task1 : task1_max,
                  min_task1 : task1_min,
                  avg_task1 : task1_avg,
                  max_task2 : task2_max,
                  min_task2 : task2_min,
                  avg_task2 : task2_avg,
                  max_task3 : task3_max,
                  min_task3 : task3_min,
                  avg_task3 : task3_avg,
                  max_task4 : task4_max,
                  min_task4 : task4_min,
                  avg_task4 : task4_avg,
                  max_task5 : task5_max,
                  min_task5 : task5_min,
                  avg_task5 : task5_avg

            };
      return core1_value;
}
async function core2data(){
      let task1_max;
      let task1_min;
      let task1_avg;
      let task2_max;
      let task2_min;
      let task2_avg;
      let task3_max;
      let task3_min;
      let task3_avg;
      let task4_max;
      let task4_min;
      let task4_avg;
      let task5_max;
      let task5_min;
      let task5_avg;
      task1_max = await Core2.max('task1').then(max => {
            return max;
      });
      task1_min= await Core2.min('task1').then(min => {
            return min;
      });
      task1_avg= await Core2.sum('task1').then(sum => {
            return sum / 10;
      });
      task2_max = await Core2.max('task2').then(max => {
            return max;
      });
      task2_min= await Core2.min('task2').then(min => {
            return min;
      });
      task2_avg= await Core2.sum('task2').then(sum => {
            return sum / 10;
      });
      task3_max = await Core2.max('task3').then(max => {
            return max;
      });
      task3_min= await Core2.min('task3').then(min => {
            return min;
      });
      task3_avg=await Core2.sum('task3').then(sum => {
            return sum / 10;
      });
      task4_max = await Core2.max('task4').then(max => {
            return max;
      });
      task4_min= await Core2.min('task4').then(min => {
            return min;
      });
      task4_avg= await Core2.sum('task4').then(sum => {
            return sum / 10;
      });
      task5_max = await Core2.max('task5').then(max => {
            return max;
      });
      task5_min= await Core2.min('task5').then(min => {
            return min;
      });
      task5_avg= await Core2.sum('task5').then(sum => {
            return sum / 10;
      });

      core2_value = {
            max_task1 : task1_max,
            min_task1 : task1_min,
            avg_task1 : task1_avg,
            max_task2 : task2_max,
            min_task2 : task2_min,
            avg_task2 : task2_avg,
            max_task3 : task3_max,
            min_task3 : task3_min,
            avg_task3 : task3_avg,
            max_task4 : task4_max,
            min_task4 : task4_min,
            avg_task4 : task4_avg,
            max_task5 : task5_max,
            min_task5 : task5_min,
            avg_task5 : task5_avg

      };
return core2_value;
}

//파이썬을 이용한 데이터 가공
async function gotopython(){
      let dataToSend;
      let python_loc = path.join(__dirname, '../python_module/remake_file.py');
      console.log(python_loc);
      const python = spawn('python3', [python_loc, user_file]);
      python.stdout.on('data', (data) => {
            dataToSend = data.toString();
            console.log(dataToSend);
      })
      python.on('close', (code) => {
            console.log('exit pythonModule');    
      })
      //파이썬을 이용하여 데이터 가공이 완료된 후 완료된 파일을 읽어야 하므로 파이썬 모듈이 실행 완료될 때까지 대기
      for await(const data of python.stdout){
      } 
}


function readtxtfile(filename){
      let fileloc=path.join(__dirname,'../remake/'+filename);
      console.log(fileloc);
      //가공된 파일 읽기
     arr = fs.readFileSync(fileloc).toString().split("\n");

     for(i=0; i<arr.length;i++){
           line = arr[i].split("\t");  
           //읽어온 라인에서 5만큼의 주기로 Core 값들을 읽기 때문에 5로나눈 나머지 별로 값들을 저장
           //만약 13번째로 읽어온 라인이라면 Core3에 맞는 값들이기 때문에 Core3에 저장
           insertcore(i%5,line); 
     }
     inserttask(arr1,arr2,arr3,arr4,arr5);   
}

function insertcore(datanum, line){
      if(datanum==0){
            Core1.create({
                  task1:line[1],
                  task2:line[2],
                  task3:line[3],
                  task4:line[4],
                  task5:line[5]
            });
            //Task의 값들은 Core처럼 line을 읽어올 때 한번에 삽입할 수 없으므로 Task의 각 core값 별로 모아서 저장해야함
            //그래서 중간 저장소로 배열에 저장
            arr1.push(line[1]);
            arr2.push(line[2]);
            arr3.push(line[3]);
            arr4.push(line[4]);
            arr5.push(line[5]);


      }
      else if(datanum==1){
            Core2.create({
                  task1:line[1],
                  task2:line[2],
                  task3:line[3],
                  task4:line[4],
                  task5:line[5]
            });
            arr1.push(line[1]);
            arr2.push(line[2]);
            arr3.push(line[3]);
            arr4.push(line[4]);
            arr5.push(line[5]);
      }
      else if(datanum==2){
            Core3.create({
                  task1:line[1],
                  task2:line[2],
                  task3:line[3],
                  task4:line[4],
                  task5:line[5]
            });
            arr1.push(line[1]);
            arr2.push(line[2]);
            arr3.push(line[3]);
            arr4.push(line[4]);
            arr5.push(line[5]);
      }
      else if(datanum==3){
            Core4.create({
                  task1:line[1],
                  task2:line[2],
                  task3:line[3],
                  task4:line[4],
                  task5:line[5]
            });
            arr1.push(line[1]);
            arr2.push(line[2]);
            arr3.push(line[3]);
            arr4.push(line[4]);
            arr5.push(line[5]);
      }
      else if(datanum==4){
            Core5.create({
                  task1:line[1],
                  task2:line[2],
                  task3:line[3],
                  task4:line[4],
                  task5:line[5]
            });
            arr1.push(line[1]);
            arr2.push(line[2]);
            arr3.push(line[3]);
            arr4.push(line[4]);
            arr5.push(line[5]);
      }
      else{
      }
}


function inserttask(arr1,arr2,arr3,arr4,arr5){
      for(i=0;i<arr1.length;i+=5){
            Task1.create({
                  core1:arr1[i],
                  core2:arr1[i+1],
                  core3:arr1[i+2],
                  core4:arr1[i+3],
                  core5:arr1[i+4]
            })
            Task2.create({
                  core1:arr2[i],
                  core2:arr2[i+1],
                  core3:arr2[i+2],
                  core4:arr2[i+3],
                  core5:arr2[i+4]
            })
            Task3.create({
                  core1:arr3[i],
                  core2:arr3[i+1],
                  core3:arr3[i+2],
                  core4:arr3[i+3],
                  core5:arr3[i+4]
            })
            Task4.create({
                  core1:arr4[i],
                  core2:arr4[i+1],
                  core3:arr4[i+2],
                  core4:arr4[i+3],
                  core5:arr4[i+4]
            })
            Task5.create({
                  core1:arr5[i],
                  core2:arr5[i+1],
                  core3:arr5[i+2],
                  core4:arr5[i+3],
                  core5:arr5[i+4]
            })
      }
}






module.exports = router;