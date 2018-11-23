import { Checkbox, CheckboxGroup } from 'element-ui'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import castArray from 'lodash/castArray'
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

    value: {
      type: Array,
      default: () => [],
    },

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
    min: Number, // minimum number of checkbox checked
    max: Number, // maximum number of checkbox checked
    border: Boolean,

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
    label: String,
    formItem: Boolean,
    labelWidth: String,
  },

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
        <Checkbox
          key={optionValue}
          label={optionValue}
          disabled={optionDisabled}
          border={this.border}>
          {optionLabel || optionValue}
        </Checkbox>
      )
    },

    handleFieldBlur(...args) {
      this.touched = true

      this.handleBlur(...args)
    },

    renderCheckboxGroup(value, setValue) {
      return (
        <CheckboxGroup
          class={this.class}
          name={this.name}
          value={value}
          size={this.size}
          disabled={this.disabled}
          min={this.min}
          max={this.max}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={setValue}>
          {this.options.map(this.generateOptions)}
        </CheckboxGroup>
      )
    },
  },

  render() {
    const [value, setValue, error] = this.useState()
    const fieldError = this.touched ? error : undefined

    if (this.formItem) {
      return (
        <FormItem label={this.label || this.name} label-width={this.labelWidth} error={fieldError}>
          {this.renderCheckboxGroup(value, setValue)}
        </FormItem>
      )
    }

    return this.renderCheckboxGroup(value, setValue)
  },
}
