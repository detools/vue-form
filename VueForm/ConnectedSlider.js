import { Slider } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'
import FormItem from './ConnectedFormItem'

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

    /* FormItem Props */
    label: String,
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

    renderSlider(value, setValue) {
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
          {this.renderSlider(value, setValue)}
        </FormItem>
      )
    }

    return this.renderSlider(value, setValue)
  },
}
