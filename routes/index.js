const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {spawn} = require('child_process');
const fs =require('fs');
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

const arr1 = new Array();
const arr2 = new Array();
const arr3 = new Array();
const arr4 = new Array();
const arr5 = new Array();

const core1_max=new Array();
const core1_min=new Array();
const core1_avg=new Array();
const array=Array(Array(),Array());


router.get('/', function(req, res, next) {
      res.render('multipart');
   });

var user_file;



const upload = multer({
      storage: multer.diskStorage({ 
            destination(req, file, done){ 
                  done(null, 'uploads/');
            },
            filename(req, file, done){ 
                  const ext = path.extname(file.originalname);
                  user_file = path.basename(file.originalname, ext) + Date.now() + ext; 
                  done(null, user_file);
            },
      }),
      limits: {filesize: 5 * 1024 * 1024}, 
});


router.post('/', 
      upload.fields([{name: 'txt1'}]),
      (req, res, next)=> {
            console.log(req.files, req.body);
            next();
      },
);


router.post('/', async (req, res) => {

      await gotopython()

      await readtxtfile(user_file);

      res.render('result');
      }
 );


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

async function gotopython(){
      let dataToSend;
      let python_loc = path.join(__dirname, '../python_module/fileRemake.py');
      console.log(python_loc);
      const python = spawn('python3', [python_loc, user_file]);
      python.stdout.on('data', (data) => {
            dataToSend = data.toString();
            console.log(dataToSend);
      })
      python.on('close', (code) => {
            console.log('exit pythonModule');    
      })

      for await(const data of python.stdout){
      } 
}


function readtxtfile(filename){
      let fileloc=path.join(__dirname,'../remake/'+filename);
      console.log(fileloc);

     arr = fs.readFileSync(fileloc).toString().split("\n");

     for(i=0; i<arr.length;i++){
           line = arr[i].split("\t");  

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