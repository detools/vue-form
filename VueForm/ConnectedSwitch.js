import { Switch } from 'element-ui'
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

    validators: Array,

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
    label: String,
    formItem: Boolean,
    labelWidth: String,
  },

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    return $registerFormComponent(this.name, this.value, this.validators)
  },

  destroyed() {
    this.cleanFormValue()
  },

  methods: {
    handleFieldBlur(...args) {
      this.touched = true

      this.handleBlur(...args)
    },

    renderSwitch(value, setValue) {
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
          on-blur={this.handleFieldBlur}
          on-change={this.handleChange}
        />
      )
    },
  },

  render() {
    const [value, setValue, error] = this.useState()
    const fieldError = this.touched ? error : undefined

    if (this.formItem) {
      return (
        <FormItem label={this.label || this.name} label-width={this.labelWidth} error={fieldError}>
          {this.renderSwitch(value, setValue)}
        </FormItem>
      )
    }

    return this.renderSwitch(value, setValue)
  },
}
