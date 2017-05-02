/**
 * Created by CoderSong on 17/4/26.
 */

let router = require('express').Router();
let apiServer = require('./../server/apiServer');
let promise = require('./../model/promise');
let conf = require('./../model/conf');

// 个人的健康页面
router.get('/healthy/my/chart', (req, res, next) => {
  let token = req.query.token || false;
  if (token)
    res.render('healthyChart', {
      token: req.query.token,
      layout: false,
      title: '个人健康'
    });
  else
    next({status: 400, msg: 'No token !'});
});


// 家庭的健康页面
router.get('/healthy/home/chart', (req, res, next) => {
  let token = req.query.token || false;
  if (token)
    res.render('homeChart', {
      token: req.query.token,
      layout: false,
      title: '家庭健康'
    });
  else
    next({status: 400, msg: 'No token !'});
});


// 测试页面
router.get('/test', (req, res, next) => {
  res.render('upload');
});


module.exports = router;
