/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let HomeSchema = new mongoose.Schema({
  // 家庭名字
  name: String,
  // 家庭成员
  family: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }],
  // 家庭愿望单
  familyWish: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'wish'
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
