/**
 * Created by CoderSong on 17/4/25.
 */

let router = require('express').Router();
let apiServer = require('./../server/apiServer');
let conf = require('./../model/conf');
let util = require('./../server/utilServer');
let promise = require('./../model/promise');
let response = require('./../builder/responseBuilder');
let model = require('./../model/create');
let _ = require('underscore');
let moment = require(moment);

// 登录
router.post('/login', (req, res, next) => {
  apiServer.login(req, res, conf.populateObj.User, next);
});

// 创建用户
router.post('/user', (req, res, next) => {
  apiServer.create(req, res, model['user'], ['username', 'account', 'password', 'role'], 'account', null, next);
});

// 创建健康
router.post('/healthy', (req, res, next) => {
  apiServer.receiveHealthy(req, res, next);
});

// 创建家庭
router.post('/home', (req, res, next) => {
  util.getUserByTokenPromise(req)
    .then((data) => {
      req.body.family = [data._id];
      apiServer.create(req, res, model['home'], ['family'], 'name', (home) => {
        data.home = home._id;
        data.save((err) => {
          if (err) next(err);
          else response.resSuccessBuilder(res, home);
        });
      }, next);
    });
});

// 获取家庭健康数据
router.get('/healthy', (req, res, next) => {
  util.getUserByTokenPromise(req)
    .then((data) => {
      let home = data.home || false;
      if (home)
        promise.findByConditionPromise(model['home'], '_id', home, conf.populateObj.Home)
          .then((_home) => {
            let homeHealthy = [];
            _.each(_home.family, people => {
              homeHealthy.push({
                username:people.username,
                role: people.role,
                healthy:people.healthy
              });
            });
            homeHealthy.sort((a, b) => {
              return a.date === b.date ? 0 : a.num > b.num ? - 1 : 1;
            });
            console.log(homeHealthy);
            response.resSuccessBuilder(res, homeHealthy);
          });
      else
        next({status: 400, msg: 'You have no home!'});

    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
