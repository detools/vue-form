import Vue from 'vue'

export default {
  install(vue, opts = {}) {
    vue.prototype.$vueForm = new Vue({ data: opts })
  },
}
