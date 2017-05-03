/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let EventSchema = new mongoose.Schema({
  // 发送者
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // 接收者
  getter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // 正文
  content: String,
  // 提醒时间
  remindTime: Date,
  // 紧急程度
  urgent: String,
  // 语音文件
  sound: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file'
  }
});

conf.addFn(EventSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = EventSchema;
