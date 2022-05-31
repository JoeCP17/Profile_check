'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

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
