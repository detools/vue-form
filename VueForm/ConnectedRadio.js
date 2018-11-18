import { Radio } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'
import FormItem from './ConnectedFormItem'

// XXX: Add RadioGroup
export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: [String, Number, Boolean],
    disabled: Boolean,
    border: Boolean,
    size: String,

    validate: {
      type: Function,
      default: noop,
    },

    handleFocus: {
      type: Function,
      default: noop,
    },

    handleBlur: {
      type: Function,
      default: noop,
    },

    handleChange: {
      type: Function,
      default: noop,
    },

    /* FormItem Props */
    formItem: Boolean,
    labelWidth: String,
  },

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    return $registerFormComponent(this.name, this.value, this.validate)
  },

  destroyed() {
    this.cleanFormValue()
  },

  methods: {
    handleFieldBlur(...args) {
      this.touched = true

      this.handleBlur(...args)
    },

    renderRadio(value, setValue) {
      return (
        <Radio
          class={this.class}
          name={this.name}
          value={value}
          label={this.value}
          disabled={this.disabled}
          border={this.border}
          size={this.size}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleChange}>
          {this.$slots.default}
        </Radio>
      )
    },
  },

  render() {
    const [value, setValue, error] = this.useState()
    const fieldError = this.touched ? error : undefined

    if (this.formItem) {
      return (
        <FormItem label-width={this.labelWidth} error={fieldError}>
          {this.renderRadio(value, setValue)}
        </FormItem>
      )
    }

    return this.renderRadio(value, setValue)
  },
}
