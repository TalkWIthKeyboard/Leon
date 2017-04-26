/**
 * Created by CoderSong on 17/4/25.
 */

let pub = {};
let _ = require('underscore');
let response = require('./../builder/responseBuilder');

/**
 * 错误处理中间件
 * @returns {function(*=, *, *=, *)}
 */
pub.errorHandler = () => {
  return (err, req, res, next) => {
    let _err = new Error(err.msg);
    _err.status = err.status;
    response.resErrorBuilder(res, _err);
    next();
  };
};


/**
 * token检查的中间件
 * @returns {function(*, *, *)}
 */
pub.tokenHandler = () => {
  let whiteList = [{
    url: '/api/login',
    type: 'POST'
  }, {
    url: '/api/user',
    type: 'POST'
  }, {
    url: '/api/healthy',
    type: 'POST'
  }];

  let checkList = (req) => {
    let flag = false;
    _.each(whiteList, (each) => {
      if (each.url === req.originalUrl && each.type === req.method) flag = true;
    });
    return flag;
  };

  return (req, res, next) => {
    let token = req.query['token'] || false;
    token || checkList(req)
      ? next()
      : next({status: 400, msg: 'No token!'});
  };
};

module.exports = pub;
