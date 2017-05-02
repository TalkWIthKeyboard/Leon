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
let echart = require('./../builder/echartBuilder');
let file = require('./../server/fileServer');

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
              people.healthy.heartbeat.sort((a, b) => a.date - b.date);
              homeHealthy.push({
                role: people.role,
                healthy: people.healthy
              });
            });
            response.resSuccessBuilder(res,
              {
                healthy: homeHealthy,
                stepChart: echart.lineChart(
                  ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                  [
                    {'爸爸': [0, 0, 0, 100, 400, 300, 175, 500, 1400, 1000, 600, 100]},
                    {'妈妈': [0, 0, 0, 120, 500, 600, 700, 800, 1000, 1200, 200, 100]},
                    {'儿子': [0, 0, 0, 0, 0, 0, 600, 1000, 2000, 2500, 400, 0]},
                  ],
                  ['爸爸的步数', '妈妈的步数', '儿子的步数'],
                  '步数'
                ),
                heartbeatChart: echart.lineChart(
                  ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
                  [
                    {'爸爸': [60, 81, 89, 75, 66, 80, 82, 71, 72, 88, 91, 97, 80, 68, 67, 78, 98, 68, 100, 90]},
                    {'妈妈': [76, 83, 75, 66, 100, 81, 95, 65, 95, 90, 65, 88, 67, 91, 88, 71, 84, 69, 75, 88]},
                    {'儿子': [80, 77, 62, 80, 81, 73, 65, 88, 67, 98, 68, 82, 95, 96, 68, 68, 84, 89, 90, 94]}
                  ],
                  ['爸爸心跳数', '妈妈心跳数', '儿子心跳数'],
                  '心跳数'
                ),
                wishChart: echart.peiChart(
                  [{value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 274, name: '联盟广告'},
                    {value: 235, name: '视频广告'},
                    {value: 400, name: '搜索引擎'}],
                  'Customized Pie',
                  '访问来源'
                )
              });
          });
      else
        next({status: 400, msg: 'You have no home!'});

    })
    .catch((err) => {
      next(err);
    });
});

/**
 * 上传API测试
 */
router.post('/file', (req, res, next) => {
  file.uploadFile(req, (url) => {
    console.log('上传成功：' + url);
  }, (err) => {
    next(err);
  });
});

module.exports = router;
