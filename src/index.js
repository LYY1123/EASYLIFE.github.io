import 'less/common.less';

import Vue from 'vue';
import App from './app.vue';
import {addInterceptors} from 'js/request.js';

export default new Vue({
  components: {
    App
  },
  data: {

  },
}).$mount('#app');
