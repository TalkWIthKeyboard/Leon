/**
 * Created by CoderSong on 17/5/2.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let FileSchema = new mongoose.Schema({
  fileName: String,
  hashName: String
});

conf.addFn(FileSchema, [
  'findByCondition',
  'deleteById'
]);

module.exports = FileSchema;