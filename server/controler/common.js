const express = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const router = express.Router();

//上传切片
router.post('/uploadChuck', async (req, res) => {
  const form = formidable({multiples: true});
  form.parse(req, (err, params, file) => {
    let url = '/~files/' + params.uuid;
    let stream = fs.readFileSync(file.file.path); //读取文件
    let filePath = path.resolve(__dirname, '../../staticFile' + url);//写入的地址
    fs.writeFileSync(filePath, stream);
    res.status(200);
    res.json({code: 1, msg: 'ok~'});
  });
});

//合并切片
router.post('/mergeChuck', async (req, res) => {
  try {
    const body = req.body;
    const fileAddress = '/files/';
    const url = fileAddress + body.name + body.fileType;
    // 文件流写入的地址
    const savePath = path.resolve(__dirname, '../../staticFile' + url);
    // 临时文件存储位置
    const chunkDir = path.resolve(__dirname, '../../staticFile' + '/~files/' + body.name);
    for (let i = 0; i < body.count; i++) {
      // 追加写入到文件中
      fs.appendFileSync(savePath, fs.readFileSync(chunkDir + '_' + i));
      // 删除本次使用的chunk
      fs.unlinkSync(chunkDir + '_' + i);
    }
    //绝对路径
    const URL = req.protocol + '://' + req.headers.host + url;
    res.status(200);
    res.json({code: 1, msg: 'ok~', url: URL});
  } catch (e) {
    console.log(e);
    res.status(200);
    res.json({code: 0, msg: '失败~'});
  }
});

module.exports = router;
