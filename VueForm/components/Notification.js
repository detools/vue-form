import Vue from 'vue'
import startCase from 'lodash/startCase'
import { Notification } from 'element-ui'

export default new Vue({
  methods: {
    renderMessage(message) {
      return <div style="text-align: left">{message}</div>
    },

    getHandler(type, message) {
      if (message) {
        Notification[type]({ title: startCase(type), message: this.renderMessage(message) })
      }
    },

    success(message) {
      return this.getHandler('success', message)
    },

    warning(message) {
      return this.getHandler('warning', message)
    },

    info(message) {
      return this.getHandler('info', message)
    },

    error(message) {
      return this.getHandler('error', message)
    },
  },
})
