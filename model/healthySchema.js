/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let HealthySchema = new mongoose.Schema({
  // 步数
  step: [Number],
  // 心跳
  heartbeat: [{
    number: Number,
    date: Date
  }]
});

conf.addFn(HealthySchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = HealthySchema;
