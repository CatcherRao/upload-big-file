const fs = require('fs');
const moment = require('moment');
const nodemailer = require("nodemailer");
module.exports = {
  getCode: (length = 6) => {
    let str = '';
    while (str.length < length) {
      str += Math.floor(Math.random() * (9) + 1);
    }
    return str;
  },
  getOrderCode: () => {
    return moment().format('YYYYMMDDHHmmssSSS');
  },
  sendEmil: (obj) => {
    const instance = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secureConnection: true, // use SSL
      // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
      auth: {
        user: '281101212@qq.com',
        pass: 'mpeocnxyofqibihd',
      }
    });
    const sendHtml = `<div>${obj.content}</div>`;
    const mailOptions = {
      // 发送邮件的地址
      from: '281101212@qq.com',
      // 接收邮件的地址
      to: obj.user || '4423761@qq.com',
      // 邮件主题
      subject: obj.subject || '您有一条新邮件、请及时查看~',
      // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
      html: sendHtml
    };
    return instance.sendMail(mailOptions);
  },
  deleteDir: (path) => {
    let files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        const curPath = path.join(path, file);
        //是文件夹 递归删除
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteDir(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    } else {
      console.log('error：文件路径错误~');
    }
  },
  isExistsDir: (path) => {
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  },
  makeDir: function (path) {
    if (!this.isExistsDir(path)) {
      fs.mkdirSync(path);
    }
  }
};
