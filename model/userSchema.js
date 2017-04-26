/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let UserSchema = new mongoose.Schema({
  // 用户名
  username: String,
  // 账号
  account: String,
  // 密码
  password: String,
  // 角色
  role: String,
  // 健康
  healthy: {
    // 步数
    step: [{
      number: Number,
      date: Date
    }],
    // 心跳
    heartbeat: [{
      number: Number,
      date: Date
    }]
  },
  // 清单
  list: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'event'
  }],
  // 所属家庭
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'home'
  }
});

conf.addFn(UserSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = UserSchema;
