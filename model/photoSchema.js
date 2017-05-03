/**
 * Created by CoderSong on 17/5/3.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let PhotoSchema = new mongoose.Schema({
  // 图片文件
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file'
  },
  // 正文感想
  content: String,
  // 所属家庭
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'home'
  }
});

conf.addFn(PhotoSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = PhotoSchema;