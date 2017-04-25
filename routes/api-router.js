/**
 * Created by CoderSong on 17/4/25.
 */

let router = require('express').Router();
let apiServer = require('./../server/apiServer');
let model = require('./../model/create');

// 登录
router.post('/login', (req, res, next) => {
  apiServer.login(req, res, next);
});

// 创建用户
router.post('/user', (req, res, next) => {
  apiServer.create(req, res, model['user'], ['username', 'account', 'password', 'role'], 'account', next);
});

// 创建健康
router.post('/healthy', (req, res, next) => {
  apiServer.create(req, res, model['healthy'], null, null, next);
});

module.exports = router;
