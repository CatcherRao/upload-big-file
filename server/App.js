const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/index');
const app = express();

//允许跨域
app.use(cors());

//日志
app.use(morgan('short'));


//表单解析
app.use(bodyParser.urlencoded({extended: true}));


//json解析
app.use(bodyParser.json());


//文件压缩
app.use(compression());


//静态文件1小时失效
app.use(express.static(path.join(__dirname, '../staticFile'), {
  maxAge: 3600,
}));


//设置json文件最大5m
app.use(express.json(
  {
    limit: '5m'
  }
));


// 加载接口
const common = require('./controler/common');
app.use('/common', common);


const platform = config.platform;
const port = platform === 'linux' ? 80 : 6868;


if (platform === 'linux') {
  app.listen(port, function () {
    console.log(`HTTP Server is running on: http://localhost:${port}`);
  });
} else {
  app.listen(port, function () {
    console.log(`HTTP Server is running on: http://localhost:${port}`);
  });
}
