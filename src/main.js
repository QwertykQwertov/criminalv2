// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'devextreme/dist/css/dx.light.css';
import store from './store'

import DxButton from "devextreme-vue/button";
Vue.component('DxButton', DxButton)
window['DxButton'] = DxButton


Vue.config.productionTip = false
Vue.prototype.$store = store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
