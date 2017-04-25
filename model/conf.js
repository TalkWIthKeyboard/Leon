/**
 * Created by CoderSong on 17/4/25.
 */

let pub = {};
let _ = require('underscore');

// 通用属性
pub.globalAtr = {
  // 时间参数
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
};


// 通用静态方法
let staticsOp = {
  findAllByPage: function (thisPage, pageSize, cb) {
    return this
      .find({})
      .skip((thisPage - 1) * pageSize)
      .limit(pageSize)
      .sort('meta.createAt')
      .exec(cb);
  },

  findAllCount: function (cb) {
    return this
      .find({})
      .count()
      .exec(cb);
  },

  /**
   * 重复检查
   * @param key 键名
   * @param value 值
   * @param cb
   * @returns {Promise}
   */
  checkIsExist: function (key, value, cb) {
    let obj = {};
    obj[key] = value;
    return this
      .findOne(obj)
      .exec(cb);
  },

  findByCondition: function (key, value, cb) {
    let obj = {};
    obj[key] = value;
    return this
      .findOne(obj)
      .exec(cb);
  },

  deleteById: function (id, cb) {
    return this
      .remove({_id: id})
      .exec(cb);
  },
};

// 通用钩子方法（分pre与post）
pub.hooksOp = {
  pre: {
    updateDate: (next) => {
      this.isNew
        ? this.meta.createAt = this.meta.updateAt = Date.now()
        : this.meta.updateAt = Date.now();
      next();
    }
  },
  post: {

  }
};

// 自动添加方法
pub.addFn = (model, list) => {
  if (! model.static) return;
  _.each(list, (each) => {
    _.indexOf(_.keys(staticsOp), each)
      ? model.statics[each] = staticsOp[each]
      : null;
  });
};

module.exports = pub;
