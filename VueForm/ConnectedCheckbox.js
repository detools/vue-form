import { Checkbox } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'

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
  },

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    return $registerFormComponent(this.name, this.value, this.validate)
  },

  destroyed() {
    this.cleanFormValue()
  },

  render() {
    const [value, setValue] = this.useState()

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
        on-blur={this.handleBlur}
        on-change={this.handleChange}>
        {this.$slots.default}
      </Checkbox>
    )
  },
}
