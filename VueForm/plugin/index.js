import Vue from 'vue'

export default {
  install(vue, opts = {}) {
    const $vueForm = new Vue({
      data: opts,
    })

    vue.prototype.$vueForm = $vueForm
  }
}
