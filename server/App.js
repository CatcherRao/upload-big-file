const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//允许跨域
app.use(cors());


//日志
app.use(morgan('short'));


//表单解析
app.use(bodyParser.urlencoded({extended: true}));


//json解析
app.use(bodyParser.json({
  limit: '2mb'
}));


//文件压缩
app.use(compression());


//静态文件1小时失效
app.use(express.static(path.join(__dirname, '../staticFile'), {
  maxAge: 3600,
}));


// 加载接口
const common = require('./controler/common');
app.use('/common', common);


const port = 6868;

app.listen(port, function () {
  console.log(`HTTP Server is running on: http://localhost:${port}`);
});
