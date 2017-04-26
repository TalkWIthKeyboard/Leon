/**
 * Created by CoderSong on 17/4/25.
 */

let mongoose = require('mongoose');
let conf = require('./conf');

let TokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  token: String
});

conf.addFn(TokenSchema, [
  'findByCondition',
  'deleteById'
]);

module.exports = TokenSchema;
