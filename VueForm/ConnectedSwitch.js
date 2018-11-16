import { Switch } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'

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

    disabled: Boolean,
    width: String,
    activeIconClass: String,
    inactiveIconClass: String,
    activeText: String,
    inactiveText: String,
    activeValue: [String, Number],
    inactiveValue: [String, Number],
    activeColor: String,
    inactiveColor: String,

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
      <Switch
        class={this.class}
        name={this.name}
        value={value}
        disabled={this.disabled}
        width={this.width}
        active-icon-class={this.activeIconClass}
        inactive-icon-class={this.inactiveIconClass}
        active-text={this.activeText}
        inactive-text={this.inactiveText}
        active-value={this.activeValue}
        inactive-value={this.inactiveValue}
        active-color={this.activeColor}
        inactive-color={this.inactiveColor}
        on-input={setValue}
        on-focus={this.handleFocus}
        on-blur={this.handleBlur}
        on-change={this.handleChange}
      />
    )
  },
}
