import isNil from 'lodash/isNil'
import castArray from 'lodash/castArray'
import isBoolean from 'lodash/isBoolean'
import startCase from 'lodash/startCase'
import resolveRegisterFormComponent from '../utils/resolveRegisterFormComponent'
import FormItem from '../components/ConnectedFormItem'

const ConnectedControlMixin = {
  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    return $registerFormComponent(this.name, this.value, this.validators, this.asyncValidators)
  },

  destroyed() {
    this.cleanFormValue()
  },

  computed: {
    state() {
      return this.useState()
    },
  },

  methods: {
    handleFieldBlur(...args) {
      this.setTouched()
      this.handleBlur(...args)

      return this.setAsyncError()
    },

    handleFieldChange(...args) {
      this.setTouched()
      this.handleChange(...args)
    },
  },

  render(createElement) {
    const [value, setValue, error, , initialValue] = this.state
    let { label } = this

    if (isBoolean(this.label)) {
      label = this.label ? startCase(this.name) : undefined
    }

    if (this.omitFormItemLabel) {
      label = undefined
    }

    if (this.formItem) {
      return (
        <FormItem label={label} label-width={this.labelWidth} error={error}>
          {this.renderComponent(value, setValue, createElement, initialValue)}
        </FormItem>
      )
    }

    return this.renderComponent(value, setValue, createElement, initialValue)
  },
}

export const ConnectedArrayFieldMixin = {
  ...ConnectedControlMixin,

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    let initialValue = this.value

    // If there is no defined "value" inside props — use an empty array
    if (isNil(initialValue)) {
      initialValue = []
    } else if (!Array.isArray(initialValue)) {
      // If there is a non-null value, but it is not an array — cast it to an array
      initialValue = castArray(initialValue)
    }

    return $registerFormComponent(this.name, initialValue, this.validators, this.asyncValidators)
  },
}

export const ConnectedSelectMixin = {
  ...ConnectedControlMixin,

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    let initialValue = this.value
    if (this.multiple) {
      // If there is no defined "value" inside props — use an empty array
      if (isNil(initialValue)) {
        initialValue = []
      } else if (!Array.isArray(initialValue)) {
        // If there is a non-null value, but it is not an array — cast it to an array
        initialValue = castArray(initialValue)
      }
    }

    return $registerFormComponent(this.name, initialValue, this.validators, this.asyncValidators)
  },
}

export default ConnectedControlMixin
