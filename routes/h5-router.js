/**
 * Created by CoderSong on 17/4/26.
 */

let router = require('express').Router();
let apiServer = require('./../server/apiServer');
let promise = require('./../model/promise');
let response = require('./../builder/responseBuilder');
let _ = require('underscore');
let conf = require('./../model/conf');
let util = require('./../server/utilServer');
let model = require('./../model/create');

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


module.exports = router;
