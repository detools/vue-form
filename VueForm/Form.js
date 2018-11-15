import { isEmpty, isNil, has } from 'lodash'
import { Form } from 'element-ui'
import CONSTANTS from './constants'

export default {
  props: {
    labelWidth: String,
    labelSuffix: String,
    labelPosition: String,
    initialValues: {
      type: Object,
      default: () => ({}),
    },
    handleModelChange: Function,
    handleSubmit: {
      type: Function,
      required: true,
    },
    handleDisabled: Function,
    handleReset: Function,
  },

  data() {
    return {
      state: {},
      errors: {},
      form: {},
    }
  },

  methods: {
    // Should be called once
    [CONSTANTS.SECRET_VUE_FORM_METHOD](name, fieldLevelInitialValue, validate) {
      const vm = this

      const formLevelInitialValue = vm.initialValues[name]
      const value = !isNil(formLevelInitialValue) ? formLevelInitialValue : fieldLevelInitialValue

      const setError = nextValue => {
        const error = validate(nextValue)

        if (error) {
          vm.$set(this.errors, name, error)
        }
      }

      const setValue = nextValue => {
        vm.$set(this.state, name, nextValue)

        setError(nextValue)
      }

      if (!has(this.state, name)) {
        setValue(value)
      }

      const cleanFormValue = () => {
        vm.$delete(this.state, name)
        vm.$delete(this.errors, name)
      }

      if (this.handleModelChange) {
        this.handleModelChange({ ...this.state, [name]: value })
      }

      return {
        cleanFormValue,
        setError,
        useState: () => [this.state[name], setValue],
      }
    },

    nativeOnSubmit(event) {
      event.preventDefault()

      if (this.handleDisabled) {
        if (Object.values(this.errors).some(item => !isEmpty(item))) {
          return this.handleDisabled(this.errors)
        }
      }

      return this.handleSubmit({ ...this.initialValues, ...this.state })
    },

    nativeOnReset(event) {
      event.preventDefault()

      const vm = this

      Object.entries(this.state).forEach(([key, value]) => {
        const initialValue = this.initialValues[key]

        vm.$set(this.state, key, initialValue || Array.isArray(value) ? [] : '')
        vm.$set(this.errors, key, null)
      })

      if (this.handleReset) {
        this.handleReset(this.initialValues)
      }
    },
  },

  render() {
    return (
      <Form
        class={this.class}
        label-width={this.labelWidth}
        label-suffix={this.labelSuffix}
        label-position={this.labelPosition}
        nativeOnSubmit={this.nativeOnSubmit}
        nativeOnReset={this.nativeOnReset}>
        {this.$slots.default}
      </Form>
    )
  },
}
