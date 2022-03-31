import imageToBase64 from 'image-to-base64';

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();
  const diff = (now - d) / 1000;
  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

export function imgToBase64(path) {
  if (!path) {
    return new Error('请传图片地址给我~');
  }
  return imageToBase64(path)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    })
}

export function isWebSocket() {
  if (typeof (WebSocket) !== 'undefined') {
    return true;
  } else {
    return false;
  }
}

export function base64ToFile(base64, fileName = '.png', type = 'image/png') {
  let arr = base64.split(',');
  let base64Str = atob(arr[1]);
  let n = base64Str.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = base64Str.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type});
}


export function fileToBase64(file) {
  let reader = new FileReader(); //实例化文件读取对象
  reader.readAsDataURL(file); //将文件读取为 DataURL,也就是base64编码
  reader.onload = function (ev) { //文件读取成功完成时触发
    return ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
  }
}



