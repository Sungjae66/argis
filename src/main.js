import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import "./assets/css/iconfont.css";
import VueCookies from 'vue-cookies';

Vue.use(Vant);
Vue.use(VueCookies);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
