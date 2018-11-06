/*
  Original code from https://github.com/yyx990803/vue-hooks
  All credits for Evan You
 */

let currentInstance = null
let isMounting = false
let callIndex = 0

function ensureCurrentInstance() {
  if (!currentInstance) {
    throw new Error(
      `invalid hooks call: hooks can only be called in a function passed to withHooks.`
    )
  }
}

export function useFormState(formInstance, id, initialValue, intiialError) {
  const { _state: state, _errors: errors } = formInstance.$data

  const updater = newValue => {
    state[id] = newValue
  }

  const validator = error => {
    errors[id] = error
  }

  if (isMounting) {
    formInstance.$set(state, id, initialValue)
    formInstance.$set(errors, id, intiialError)
  }

  return [state[id], updater, validator]
}

export function withHooks(render) {
  return {
    data() {
      return {
        _state: {},
        _errors: {},
      }
    },
    created() {
      this._effectStore = {}
      this._refsStore = {}
      this._computedStore = {}
    },
    render(h) {
      callIndex = 0
      currentInstance = this
      isMounting = !this._vnode
      const ret = render(h, this.$attrs, this)
      currentInstance = null
      return ret
    }
  }
}
