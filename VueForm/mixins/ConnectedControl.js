import isNil from 'lodash/isNil'
import castArray from 'lodash/castArray'
import isBoolean from 'lodash/isBoolean'
import isNull from 'lodash/isNull'
import startCase from 'lodash/startCase'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import resolveRegisterFormComponent from '../utils/resolveRegisterFormComponent'
import isComponentPartOfArrayField from '../utils/isComponentPartOfArrayField'
import VueFormItem from '../components/VueFormItem'
import VueFormItemLite from '../components/VueFormItemLite'

const ConnectedControlMixin = {
  props: {
    /* FormItem Props */
    formItem: Boolean,
    label: [String, Boolean],
    labelWidth: String,
    labelPosition: String,
    showErrorUnderLabel: Boolean,
    required: Boolean,

    /* FormItem Lite Props */
    formItemLite: Boolean,
  },

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    return $registerFormComponent(
      this.name,
      this.value,
      this.validators,
      isComponentPartOfArrayField(this)
    )
  },

  mounted() {
    this.isComponentPartOfArrayField = isComponentPartOfArrayField(this)
    this.reinitializeCallback = this.validateOnReinitialize(state => {
      const value = get(state, this.name)

      this.setError(this.validators)(value)
    })
  },

  watch: {
    validators(validators, prevValidators) {
      if (!isEqual(validators, prevValidators)) {
        this.setError(validators)()
      }
    },
  },

  destroyed() {
    this.cleanFormValue()

    if (this.reinitializeCallback) {
      this.reinitializeCallback()
    }
  },

  computed: {
    state() {
      return this.useState(this.validators)
    },

    plugin() {
      return get(this, '$vueForm', {})
    },

    controlSize() {
      return this.size || this.plugin.size
    },

    isFieldDisabled() {
      return this.disabled || !!this.asyncValidations[this.name]
    },
  },

  methods: {
    handleFieldBlur(...args) {
      this.setTouched()
      this.handleBlur(...args)

      return this.setAsyncError(this.asyncValidators)()
    },

    handleFieldChange(...args) {
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

    let required = false
    const { validators } = this

    if (!isNull(this.required) && validators && validators.length) {
      required = validators.some(validator => validator.IS_REQUIRED_VALIDATOR)
    }

    if (this.formItem) {
      return (
        <VueFormItem
          label={label}
          labelWidth={this.labelWidth}
          labelPosition={this.labelPosition}
          showErrorUnderLabel={this.showErrorUnderLabel}
          error={error}
          validateStatus={error ? 'error' : 'success'}
          required={required}>
          {this.renderComponent(value, setValue, createElement, initialValue, required)}
        </VueFormItem>
      )
    }

    if (this.formItemLite) {
      return (
        <VueFormItemLite
          label={label}
          label-width={this.labelWidth}
          error={error}
          required={required}>
          {this.renderComponent(value, setValue, createElement, initialValue, required)}
        </VueFormItemLite>
      )
    }

    return this.renderComponent(value, setValue, createElement, initialValue, required)
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

    return $registerFormComponent(
      this.name,
      initialValue,
      this.validators,
      isComponentPartOfArrayField(this)
    )
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

    return $registerFormComponent(
      this.name,
      initialValue,
      this.validators,
      isComponentPartOfArrayField(this)
    )
  },
}

export default ConnectedControlMixin
