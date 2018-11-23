import { Checkbox } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'
import FormItem from './ConnectedFormItem'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Boolean,
      default: () => false,
    },

    label: String,
    trueLabel: String,
    falseLabel: String,
    disabled: Boolean,
    border: Boolean,
    size: String,
    checked: String,
    indeterminate: String,

    validators: Array,
    asyncValidators: Array,

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

    return $registerFormComponent(this.name, this.value, this.validators, this.asyncValidators)
  },

  destroyed() {
    this.cleanFormValue()
  },

  methods: {
    handleFieldBlur(...args) {
      this.touched = true

      this.handleBlur(...args)
    },

    renderCheckbox(value, setValue) {
      return (
        <Checkbox
          class={this.class}
          name={this.name}
          value={value}
          label={this.label}
          true-label={this.trueLabel}
          false-label={this.falseLabel}
          disabled={this.disabled}
          border={this.border}
          size={this.size}
          checked={this.checked}
          indeterminate={this.indeterminate}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleChange}>
          {this.$slots.default}
        </Checkbox>
      )
    },
  },

  render() {
    const [value, setValue, error] = this.useState()
    const fieldError = this.touched ? error : undefined

    if (this.formItem) {
      return (
        <FormItem label-width={this.labelWidth} error={fieldError}>
          {this.renderCheckbox(value, setValue)}
        </FormItem>
      )
    }

    return this.renderCheckbox(value, setValue)
  },
}
