import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 flexible 用于设置 rem 基准值
import 'lib-flexible/flexible.js'
import { Tab, Tabs } from 'vant';
import { PullRefresh, List, Dialog } from 'vant'

Vue.use(PullRefresh).use(List).use(Dialog)
Vue.use(Tab);
Vue.use(Tabs);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
