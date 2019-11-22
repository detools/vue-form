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

    getHandler(type, message, title) {
      if (message) {
        Notification[type]({
          title: startCase(isUndefined(title) ? type : title),
          message: this.renderMessage(message),
        })
      }
    },

    success(message, title) {
      return this.getHandler('success', message, title)
    },

    warning(message, title) {
      return this.getHandler('warning', message, title)
    },

    info(message, title) {
      return this.getHandler('info', message, title)
    },

    error(message, title) {
      return this.getHandler('error', message, title)
    },
  },
})
