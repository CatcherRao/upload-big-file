export const uploadImg = 'http://localhost:6868/common/uploadImg';
export const uploadChuck = 'http://localhost:6868/common/uploadChuck';
export const mergeChuck = 'http://localhost:6868/common/mergeChuck';

export const ajax = (url = '', method = 'post',) => {
  const requestList = [];
  return (data) => {
    if (url) {
      const promiseXhr = new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(data);
        xhr.onload = e => {
          if (requestList.length) {
            const isFind = requestList.findIndex(item => item === xhr);
            requestList.splice(isFind, 1);
          }
          resolve(true);
        };
        requestList.push(xhr);
      });
      return {promiseXhr, requestList}
    }
  }
}


