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
  // 清单
  list: [{
    type : mongoose.Schema.ObjectId,
    ref : 'Event'
  }]
});

conf.addFn(UserSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = UserSchema;
