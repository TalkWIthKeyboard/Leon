/**
 * Created by CoderSong on 17/5/2.
 */

let pub = {};
let qiniu = require('qiniu');
let path = require('path');

qiniu.conf.ACCESS_KEY = 'PTvRc8G0vxeyXEfUp1ZSEbZOzpKwmewIB_Uvm1BG';
qiniu.conf.SECRET_KEY = 'HmGDEvKbHg1wIAgLePeff48p1vBMKw4kMOxJi75Q';
// 空间名
let bucket = 'together';
// 外链地址
let openUrl = 'opavm058s.bkt.clouddn.com';

/**
 * 七牛云文件上传
 * @param key
 * @param scb
 * @param fcb
 */
pub.qiniuUploadFile = (key, scb, fcb) => {
  // 策略函数
  function uptoken() {
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
  }

  // 文件的token
  let token = uptoken(bucket, key);
  //要上传文件的本地路径
  let filePath = path.join(__dirname, '..', 'public', 'file', key);

  // 上传函数
  function uploadFile(uptoken, _key, localFile) {
    let extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, _key, localFile, extra,
      (err, ret) => !err ? scb(`http://${openUrl}/${key}`) : fcb(err));
  }
  uploadFile(token, key, filePath);
};


/**
 * 七牛云文件下载
 * @param key
 */
pub.qiniuDownloadFile = (key) => {
  //构建私有空间的链接
  url = `http://${openUrl}/${key}?attr=`;
  let policy = new qiniu.rs.GetPolicy();
  //生成下载链接url
  let downloadUrl = policy.makeRequest(url);
  //打印下载的url
  console.log(downloadUrl);
};


/**
 * 七牛云删除
 * @param key
 * @param scb
 * @param fcb
 */
pub.qiniuDeleteFile = (key, scb, fcb) => {
  let client = new qiniu.rs.Client();
  client.remove(bucket, key, function(err, ret) {
    !err ? scb() : fcb(err);
  });
};


pub.qiniuDeleteFile('1.txt');

module.exports = pub;