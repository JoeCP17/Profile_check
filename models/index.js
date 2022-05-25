'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';//환경변수 생성
const config = require(__dirname + '/../config/config.json')[env];//개발환경일 때 sequelize파일불러오기 환경변수가 development이기 때문에 config.json의 development 호출
const db = {};//db객체 생성


// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  const sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//각 모델들을 사용
db.Task1=require('./task1')(sequelize,Sequelize);
db.Task2=require('./task2')(sequelize,Sequelize);
db.Task3=require('./task3')(sequelize,Sequelize);
db.Task4=require('./task4')(sequelize,Sequelize);
db.Task5=require('./task5')(sequelize,Sequelize);
db.Core1=require('./core1')(sequelize,Sequelize);
db.Core2=require('./core2')(sequelize,Sequelize);
db.Core3=require('./core3')(sequelize,Sequelize);
db.Core4=require('./core4')(sequelize,Sequelize);
db.Core5=require('./core5')(sequelize,Sequelize);





module.exports = db;
