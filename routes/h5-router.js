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

// 家庭的健康页面
router.get('/healthy/chart', (req, res, next) => {
  let token = req.query.token || false;

  if (token)
    res.render('healthyChart', {
      token: req.query.token,
      layout: false,
      title: '健康'
    });
  else
    next({status: 400, msg: 'No token !'});

});




module.exports = router;
