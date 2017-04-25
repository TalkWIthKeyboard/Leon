/**
 * Created by CoderSong on 17/4/25.
 */


let fs = require('fs');
let conf = require('./conf');
let _ = require('underscore');
let mongoose = require('mongoose');
let modelList = [];

/**
 * 创建modelList
 */
function createModelList() {
  let fileList = fs.readdirSync(__dirname);
  let regExp = new RegExp('(.+)Schema$', 'g');

  if (fileList.length > 0)
    _.each(fileList, (file) => {
      // 获得这个字符串的模式
      let modelName = regExp.exec(file.split('.')[0]);
      modelName = modelName !== null ? modelName[1] : modelName;
      regExp.lastIndex = 0;
      if (file.split('.')[1] === 'js' && modelName) {
        let _schema = require('./' + file.split('.')[0]);
        // 添加共有属性
        _schema.add(conf.globalAtr);
        // 添加钩子函数
        _schema.pre = conf.hooksOp.pre;
        modelList[modelName] = mongoose.model(modelName, _schema);
      }
    });

}

createModelList();

module.exports = modelList;
