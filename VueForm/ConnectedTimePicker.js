import { TimeSelect } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: [Date, String, Number],

    readonly: Boolean,
    disabled: Boolean,
    editable: Boolean,
    clearable: Boolean,
    size: String,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    isRange: Boolean,
    arrowControl: Boolean,
    align: String,
    popperClass: String,
    pickerOptions: Array,
    rangeSeparator: String,
    defaultValue: [Date, String, Number],
    valueFormat: String,
    prefixIcon: String,
    clearIcon: String,

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
      <TimeSelect
        class={this.class}
        name={this.name}
        value={value}
        readonly={this.readonly}
        disabled={this.disabled}
        editable={this.editable}
        clearable={this.clearable}
        size={this.size}
        placeholder={this.placeholder}
        start-placeholder={this.startPlaceholder}
        end-placeholder={this.endPlaceholder}
        is-range={this.isRange}
        arrow-control={this.arrowControl}
        align={this.align}
        popper-class={this.popperClass}
        picker-options={this.pickerOptions}
        range-separator={this.rangeSeparator}
        default-value={this.defaultValue}
        value-format={this.valueFormat}
        prefix-icon={this.prefixIcon}
        clear-icon={this.clearIcon}
        on-input={setValue}
        on-focus={this.handleFocus}
        on-blur={this.handleBlur}
        on-change={this.handleChange}
      />
    )
  },
}
