import { InputNumber } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      default: () => 0,
    },

    label: String,
    min: Number,
    max: Number,
    step: Number,
    precision: Number,
    size: String,
    disabled: Boolean,
    controls: Boolean,
    controlsPosition: String,

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

    renderInput(value, setValue) {
      return (
        <InputNumber
          class={this.class}
          name={this.name}
          value={value}
          min={this.min}
          max={this.max}
          step={this.step}
          precision={this.precision}
          size={this.size}
          disabled={this.disabled}
          controls={this.controls}
          controls-position={this.controlsPosition}
          label={this.label}
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
          {this.renderInput(value, setValue)}
        </FormItem>
      )
    }

    return this.renderInput(value, setValue)
  },
}
