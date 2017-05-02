/**
 * Created by CoderSong on 17/5/2.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let EventSchema = new mongoose.Schema({
  fileName: String,
  hashName: String
});

conf.addFn(EventSchema, [
  'findByCondition',
  'deleteById'
]);

module.exports = EventSchema;