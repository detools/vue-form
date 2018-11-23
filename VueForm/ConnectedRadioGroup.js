import { Radio, RadioGroup } from 'element-ui'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'
import FormItem from './ConnectedFormItem'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    value: [String, Number],

    valueKey: {
      type: String,
      default: () => 'id',
    },

    labelKey: {
      type: String,
      default: () => 'name',
    },

    disabledKey: {
      type: String,
      default: () => 'disabled',
    },

    size: String,
    disabled: Boolean,
    border: Boolean,

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
    generateOptions(option) {
      let { [this.valueKey]: optionValue, [this.labelKey]: optionLabel } = option
      const { [this.disabledKey]: optionDisabled } = option

      if (isNil(optionLabel)) {
        optionValue = option
        optionLabel = option
      }

      return (
        <Radio key={optionValue} label={optionValue} disabled={optionDisabled} border={this.border}>
          {optionLabel || optionValue}
        </Radio>
      )
    },

    handleFieldBlur(...args) {
      this.touched = true

      this.handleBlur(...args)
    },

    renderRadioGroup(value, setValue) {
      return (
        <RadioGroup
          class={this.class}
          name={this.name}
          value={value}
          size={this.size}
          disabled={this.disabled}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={setValue}>
          {this.options.map(this.generateOptions)}
        </RadioGroup>
      )
    },
  },

  render() {
    const [value, setValue, error] = this.useState()
    const fieldError = this.touched ? error : undefined

    if (this.formItem) {
      return (
        <FormItem label={this.label || this.name} label-width={this.labelWidth} error={fieldError}>
          {this.renderRadioGroup(value, setValue)}
        </FormItem>
      )
    }

    return this.renderRadioGroup(value, setValue)
  },
}
