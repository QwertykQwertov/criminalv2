// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'devextreme/dist/css/dx.light.css';
import 'materialize-css/dist/js/materialize'

import DxButton from "devextreme-vue/button";
Vue.component('DxButton', DxButton)
window['DxButton'] = DxButton

import DxPopup from "devextreme-vue/popup";
Vue.component('DxPopup', DxPopup)
window['DxPopup'] = DxPopup

import DxTextBox from "devextreme-vue/text-box";
Vue.component('DxTextBox', DxTextBox)
window['DxTextBox'] = DxTextBox

import DxValidationSummary from "devextreme-vue/validation-summary";
Vue.component('DxValidationSummary', DxValidationSummary)
window['DxValidationSummary'] = DxValidationSummary

Vue.config.productionTip = false
// Vue.prototype.$store = store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
