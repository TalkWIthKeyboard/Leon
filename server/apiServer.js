/**
 * Created by CoderSong on 17/4/25.
 */

let pub = {};
let jwt = require('jsonwebtoken');
let promise = require('./../model/promise');
let response = require('./../builder/responseBuilder');
let conf = require('./../model/conf');
let model = require('./../model/create');
let util = require('./../server/utilServer');
let check = require('./../server/requestServer');
let _ = require('underscore');

/**
 * 保存对象
 * @param res
 * @param body 对象数据
 * @param model
 * @param cb
 * @param next
 */
let saveObj = (res, body, model, cb, next) => {

  let data = {};
  let modelObj = model.schema.obj;
  delete modelObj.meta;

  // 过滤掉其它不在类中的属性
  _.each(body, (value, key) => {
    if (_.indexOf(modelObj, key))
      data[key] = value;
  });

  let _model = new model(data);
  _model.save((err) => {
    if (err) return next(err);
    !cb ? response.resSuccessBuilder(res, _model) : cb(_model);
  });
};


/**
 * 制作用户的token
 * @param user
 * @param scb
 * @param fcb
 */
let createToken = (user, scb, fcb) => {
  let content = {
    'account': user.account,
    'password': user.password,
    'date': Date.now().toString()
  };
  let secretOrPrivateKey = 'I don`t want talk with you!';
  let _token = jwt.sign(content, secretOrPrivateKey);
  // 生成token并存取
  promise.findByConditionPromise(model['token'], 'user', user._id)
    .then((token) => {
      // 如果现在有token则覆盖，没有就新建
      if (token)
        token.token = _token;
      else
        token = new model['token']({
          token: _token,
          user: user._id
        });

      token.save((err, obj) => {
        err
          ? fcb({status: 400, msg: 'Database error!'})
          : scb(obj);
      });
    })
    .catch((err) => {
      fcb({status: 400, msg: err});
    });
};


/**
 * 通用的创建API（默认只含有body参数）
 * @param req
 * @param res
 * @param model
 * @param keyList 可以定制检查的
 * @param key
 * @param cb 回调
 * @param next
 */
pub.create = (req, res, model, keyList, key, cb, next) => {
  check.checkBodyPromise(req.body, model, keyList)
    .then((body) => {
      if (key && body[key])
        promise.checkIsExistPromise(model, key, body[key]).then((obj) => {
          obj
            ? next({status: 400, msg: 'The value of key is exist!'})
            : saveObj(res, body, model, cb, next);
        }, (err) => {
          return next({status: 400, msg: err});
        });
      else
        saveObj(res, body, model, cb, next);
    })
    .catch((err) => {
      next({status: 400, msg: err});
    });
};


/**
 * 通用的删除API
 * @param req
 * @param res
 * @param model
 * @param paramsList
 * @param queryList
 * @param next
 */
pub.delete = (req, res, model, paramsList = ['id'], queryList = null, next) => {
  check.checkParams(req.params, req.query, paramsList, queryList, ([params,]) => {
    promise.deleteByIdPromise(model, params.id)
      .then(() => {
        response.resSuccessBuilder(res, {id: params.id});
      })
      .catch((err) => {
        next({status: 400, msg: err});
      });
  }, (err) => {
    next({status: 400, msg: err});
  });
};


/**
 * 通用的获取API
 * @param req
 * @param res
 * @param model
 * @param paramsList
 * @param queryList
 * @param populateKey
 * @param next
 */
pub.get = (req, res, model, paramsList = ['id'], queryList = null, populateKey = null, next) => {
  check.checkParams(req.params, req.query, paramsList, queryList, ([params,]) => {
    promise.findByConditionPromise(model, '_id', params.id, populateKey)
      .then((data) => {
        response.resSuccessBuilder(res, data);
      })
      .catch((err) => {
        next({status: 400, msg: err});
      });
  }, (err) => {
    next({status: 400, msg: err});
  });
};


/**
 * 通用的更新API（默认paramsList是中只包含id）
 * @param req
 * @param res
 * @param model
 * @param paramsList
 * @param queryList
 * @param bodyList
 * @param populateKey
 * @param next
 */
pub.update = (req, res, model, paramsList = ['id'], queryList = null, bodyList, populateKey = null, next) => {
  let promiseList = [
    check.checkParamsPromise(req.params, req.query, paramsList, queryList),
    check.checkBodyPromise(req.body, model, bodyList)
  ];

  Promise.all(promiseList).then((results) => {
    let [params,] = results[0];
    let body = results[1];
    promise.findByConditionPromise(model, '_id', params.id, populateKey).then((data) => {
      _.mapObject(body, (value, key) => {
        data[key] = value;
      });
      data.save((err) => {
        if (err) return next(err);
        response.resSuccessBuilder(res, data);
      });
    });
  }).catch((err) => {
    next({status: 400, msg: err});
  });
};


/**
 * 通用的分页查找API
 * @param req
 * @param res
 * @param model
 * @param paramsList
 * @param queryList
 * @param next
 */
pub.pagination = (req, res, model, paramsList = null, queryList = ['page', 'pageSize'], next) => {
  check.checkParamsPromise(req.params, req.query, paramsList, queryList)
    .then((results) => {
      let params = results[0];
      let query = results[1];
      let promiseList = [
        promise.findAllByPagePromise(model, query.page, query.pageSize),
        promise.findAllCountPromise(model)
      ];
      Promise.all(promiseList).then((results) => {
        let data = results[0];
        let pageCount = Math.floor((results[1] - 1) / query.pageSize) + 1;
        response.resSuccessBuilder(res, {
          page: params.page,
          pageCount: pageCount,
          data: data,
        });
      }).catch((err) => {
        next({status: 400, msg: err});
      });
    })
    .catch((err) => {
      next({status: 400, msg: err});
    });
};

/**
 * 进行登录
 * @param req
 * @param res
 * @param populateKey
 * @param next
 */
pub.login = (req, res, populateKey, next) => {
  check.checkBody(req.body, null, ['account', 'password'], (body) => {
    promise.findByConditionPromise(model['user'], 'account', body.account, populateKey)
      .then((data) => {
        if (data && data.password === body.password)
          createToken(data, (token) => {
            response.resSuccessBuilder(res, {user: data, token: token.token});
          }, (err) => {
            next(err);
          });
        else
          next({status: 400, msg: 'Username or password error!'});

      })
      .catch((err) => {
        next({status: 400, msg: err});
      });
  }, (err) => {
    next({status: 400, msg: err});
  });
};


/**
 * 接收健康数据
 * @param req
 * @param res
 * @param next
 */
pub.receiveHealthy = (req, res, next) => {
  check.checkBody(req.body, model['healthy'], null, (body) => {
    util.getUserByTokenPromise(req)
      .then((data) => {
        data.healthy.step = util.healthyQueue(body.step, data.healthy.step);
        data.healthy.heartbeat = util.healthyQueue(body.heartbeat, data.healthy.heartbeat);
        data.save((err, _data) => {
          if (err) next({status: 400, msg: err});
          else response.resSuccessBuilder(res, _data);
        });
      });
  }, (err) => {
    next({status: 400, msg: err});
  });
};


/**
 * 创建相册卡片
 * @param req
 * @param res
 * @param next
 */
pub.createPhoto = (req, res, next) => {
  check.checkBody(req.body, null, ['photo', 'content'], (body) => {
    util.getUserByTokenPromise(req)
      .then((data) => {
        body.home = data.home;
        saveObj(res, body, model['photo'], null, next);
      })
  }, (err) => {
    next({status: 400, msg: err});
  })
};


/**
 * 创建事件
 * @param req
 * @param res
 * @param next
 */
pub.createEvent = (req, res, next) => {
  check.checkBody(req.body, null, ['getter', 'content', 'remindTime', 'urgent', 'sound'], (body) => {
    let promiseList = [
      util.getUserByTokenPromise(req),
      promise.findByConditionPromise(model['user'], '_id', body.getter, null)
    ];
    Promise.all(promiseList).then((result) => {
      let getter = result[0];
      let sender = result[1];
      if (getter.home !== sender.home) return next({status: 400, msg: 'The sender and getter is not in one home!'});
      body.sender = sender._id;
      saveObj(res, body, model['event'], null, next);
    });
  }, (err) => {
    next({status: 400, msg: err});
  })
};


/**
 * 加入家庭
 * @param req
 * @param res
 * @param next
 */
pub.joinHome = (req, res, next) => {
  check.checkBody(req.body, null, ['family'], (body) => {
    let promiseList = [
      util.getUserByTokenPromise(req),
      promise.findByConditionPromise(model['user'], '_id', body.family, null)
    ];
    Promise.all(promiseList).then((result) => {
      let me = result[0];
      let family = result[1];
      me.home = family.home;
      me.save((err) => {
        if (err) return next({status: 400, msg: err});
        promise.findByConditionPromise(model['home'], '_id', me.home, null)
          .then((data) => {
            data.family.push(me._id);
            data.save((_err) => {
              _err
                ? next({status: 400, msg: err})
                : response.resSuccessBuilder(res, 'success');
            })
          })
      });
    }).catch((err) => {
      next({status: 400, msg: err});
    })
  })
};


module.exports = pub;
