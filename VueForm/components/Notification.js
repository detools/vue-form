import Vue from 'vue'
import startCase from 'lodash/startCase'
import isUndefined from 'lodash/isUndefined'
import Notification from 'element-ui/lib/notification'

export default new Vue({
  methods: {
    renderMessage(message) {
      return (
        <div style="text-align: left; white-space: pre-line; word-break: break-word;">
          {message}
        </div>
      )
    },

    getHandler(type, message, title, duration = 10000) {
      if (message) {
        Notification[type]({
          title: startCase(isUndefined(title) ? type : title),
          message: this.renderMessage(message),
          duration,
        })
      }
    },

    success(message, title, duration) {
      return this.getHandler('success', message, title, duration)
    },

    warning(message, title, duration) {
      return this.getHandler('warning', message, title, duration)
    },

    info(message, title, duration) {
      return this.getHandler('info', message, title, duration)
    },

    error(message, title, duration) {
      return this.getHandler('error', message, title, duration)
    },
  },
})
