import Vue from 'vue';
import ElementUI from 'element-ui';
import {Loading} from 'element-ui';
import App from './App';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$loading = function (options = {text: '上传中~'}) {
  return Loading.service(options);
};

Vue.use(ElementUI, {size: 'small'});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
});
