import { Slider } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: Number,
    step: Number,
    min: Number,
    max: Number,
    showStops: Boolean,
    showInput: Boolean,

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
      <Slider
        class={this.class}
        name={this.name}
        value={value}
        step={this.step}
        min={this.min}
        max={this.max}
        show-stops={this.showStops}
        show-input={this.showInput}
        on-input={setValue}
        on-focus={this.handleFocus}
        on-blur={this.handleBlur}
        on-change={this.handleChange}
      />
    )
  },
}
