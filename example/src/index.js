import Vue from 'vue'
import { VueFormPlugin } from '@detools/vue-form'
import App from './App'
import router from './forms'

Vue.use(VueFormPlugin, { size: 'mini' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
