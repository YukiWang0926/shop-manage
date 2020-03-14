import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters/filter'

import '@/plugins/element';

import './assets/css/global.css'
//导入图标
import "./assets/fonts/iconfont.css"

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
