<template>
  <div class="app">

    <el-upload
      drag
      :action="uploadChuck"
      :on-change="beforeUpload"
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <el-button type="primary" @click="startUpload" :disabled="!fileList.length">开始上传</el-button>

    <!--    <el-button type="warning" v-if="isStart" @click="stopUpload">暂停上传</el-button>-->

    <!--    <el-button type="success" v-if="isStop" @click="goUpload">继续上传</el-button>-->

  </div>
</template>

<script>

const uuid = require('uuid');
import axios from 'axios';
import {ajax, uploadChuck, mergeChuck} from '@/api/common';

const SIZE = 5 * 1024 * 1024; // 切片大小 5m

export default {
  name: 'App',
  data() {
    return {
      uploadChuck,
      fileList: [],
      isStart: false,
      xhrList: [],
      requestList: [],
      fileId: '',
      fileType: '',
      isStop: false
    }
  },
  methods: {
    beforeUpload(file) {
      this.fileType = file.name.slice(file.name.lastIndexOf('.'));
      this.fileList = [];
      this.cutFile(file.raw);
    },
    cutFile(file, size = SIZE) {
      const arr = [];
      let cur = 0;
      while (cur < file.size) {
        arr.push({file: file.slice(cur, cur + size)});
        cur += size;
      }
      this.fileList = arr;
      this.fileId = uuid.v4();
    },
    async startUpload() {
      this.isStart = true;
      const xhrList = [];
      const $post = ajax(uploadChuck, 'post',);
      this.fileList.forEach((item, index) => {
        const data = new FormData();
        data.append('file', item.file);
        data.append('fileIndex', index);
        data.append('fileId', this.fileId);

        const request = $post(data);
        xhrList.push(request.promiseXhr);
        this.requestList = request.requestList;
      });
      this.xhrList = xhrList;
      await Promise.all(this.xhrList);
      this.mergeChuck();
    },
    async mergeChuck() {
      const res = await axios({
        method: 'post',
        url: mergeChuck,
        data: {
          fileType: this.fileType,
          fileId: this.fileId,
          count: this.xhrList.length
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res && res.data && res.data.code) {
        this.successUpload();
      }
    },
    // 暂停上传
    stopUpload() {
      for (let i = 0; i < this.requestList.length; i++) {
        const request = this.requestList[i];
        request.abort();
      }
      this.isStop = true;
    },
    // 继续上传
    goUpload() {

    },
    successUpload() {
      this.$message.success('上传成功~');
      this.xhrList = [];
      this.fileList = [];
      this.requestList = [];
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
