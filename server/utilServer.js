/**
 * Created by CoderSong on 17/4/26.
 */

let pub = {};
let model = require('./../model/create');
let conf = require('./../model/conf');
let _ = require('underscore');

/**
 * 通过token获取User对象
 * @param req
 */
pub.getUserByTokenPromise = (req) => {
  // 这边可以保证先决条件是有token
  let token = req.query.token;
  return new Promise((resolve, reject) => {
    model['token'].findByCondition('token', token, null, (err, res) => {
      if (err || ! res.user)
        reject(err);
      else
        model['user'].findByCondition('_id', res.user, conf.populateObj.User, (_err, _res) => {
          _err ? reject(_err) : resolve(_res);
        });

    });
  });
};


/**
 * 维护健康队列，始终保持队列内元素个数
 * @param healthyList 上传的健康数据
 * @param healthy 原始健康数据
 */
pub.healthyQueue = (healthyList, healthy = []) => {
  const num = 48;
  let len = healthyList.length + healthy.length;
  healthyList.sort((a, b) => {
    return a.date === b.date ? 0 : a.num > b.num ? - 1 : 1;
  });
  healthyList.push(healthy);
  healthyList = _.flatten(healthyList, true);
  // 保持队列内的元素个数
  if (len > num) healthyList = _.initial(healthyList, len - num);
  return healthyList;
};

module.exports = pub;
