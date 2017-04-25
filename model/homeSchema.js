/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let HomeSchema = new mongoose.Schema({
  // 家庭成员
  family: [{
    type : mongoose.Schema.ObjectId,
    ref : 'User'
  }],
  // 家庭愿望单
  familyWish: [{
    type : mongoose.Schema.ObjectId,
    ref : 'Wish'
  }],
  // 家庭健康表
  familyHealthy: [{
    type : mongoose.Schema.ObjectId,
    ref : 'Healthy'
  }]
});

conf.addFn(HomeSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = HomeSchema;
