/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let EventSchema = new mongoose.Schema({
  setter: {
    type: mongoose.Schema.ObjectId,
    rel: 'User'
  },
  getter: {
    type: mongoose.Schema.ObjectId,
    rel: 'User'
  },
  content: String,
  remindTime: Date,
  urgent: String
});

conf.addFn(EventSchema, [
  'findAllByPage',
  'findAllCount',
  'checkIsExist',
  'findByCondition',
  'deleteById'
]);

module.exports = EventSchema;
