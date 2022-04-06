import Vue from 'vue';
import {Loading} from 'element-ui';
import App from './App';

import {Upload, Button} from 'element-ui';

Vue.use(Upload);
Vue.use(Button);

import 'element-ui/lib/theme-chalk/upload.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/message.css';

Vue.prototype.$loading = function (options = {text: '上传中~'}) {
  return Loading.service(options);
};

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
});
