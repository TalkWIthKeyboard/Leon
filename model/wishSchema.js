/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let WishSchema = new mongoose.Schema({
  // 愿望贡献
  list: [{
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    contribution: Number,
    time: Date
  }],
  // 愿望内容
  content: String,
  // 愿望目标
  final: Number
});

conf.addFn(WishSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = WishSchema;
