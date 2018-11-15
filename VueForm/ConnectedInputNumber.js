import { InputNumber } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'

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
        on-blur={this.handleBlur}
        on-change={this.handleChange}
      />
    )
  },
}
