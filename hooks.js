/*
  Original code from https://github.com/yyx990803/vue-hooks
  All credits for Evan You
 */

let currentInstance = null
let isMounting = false

function ensureCurrentInstance() {
  if (!currentInstance) {
    throw new Error(
      'invalid hooks call: hooks can only be called in a function passed to withHooks.'
    )
  }
}

export function useFormState(formInstance, id, initialValue, intiialError) {
  ensureCurrentInstance()

  const { _state: state, _errors: errors } = formInstance.$data
  const { _form: form } = currentInstance.$data

  const updater = newValue => {
    formInstance.$set(state, id, newValue)

    if (!form.form) {
      formInstance.$set(form, 'form', formInstance)
    }
  }

  const validator = error => {
    formInstance.$set(errors, id, error)
  }

  if (isMounting) {
    formInstance.$set(state, id, initialValue)
    formInstance.$set(errors, id, intiialError)
    formInstance.$set(form, 'form', formInstance)
  }

  return [state[id] || initialValue, updater, validator]
}

export function withHooks(render) {
  return {
    data() {
      return {
        _state: {},
        _errors: {},
        _form: {},
      }
    },
    created() {
      /* eslint-disable no-underscore-dangle */
      this._effectStore = {}
      this._refsStore = {}
      this._computedStore = {}
    },
    render(h) {
      currentInstance = this
      isMounting = !this._vnode
      const ret = render(h, this.$attrs, this)
      currentInstance = null
      return ret
    },
    destroyed() {
      const { form } = this.$data._form

      if (form) {
        form.$delete(form.$data._state, this.$attrs.name)
      }
    },
  }
}
