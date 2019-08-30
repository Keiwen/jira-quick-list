// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import VueResource from 'vue-resource'
import CxltToastr from 'cxlt-vue2-toastr'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.component('icon', Icon)

const toastrConfig = {
  position: 'top left',
  timeOut: 3000,
  progressBar: true,
  hideDuration: 500,
  closeButton: true,
  showMethod: 'bounceInDown',
  hideMethod: 'zoomOutLeft'
}
Vue.use(CxltToastr, toastrConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  http: {
    headers: {
      // 'Access-Control-Allow-Origin': '*'
    }
  },
  template: '<App/>',
  components: { App }
})
