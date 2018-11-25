import { Slider } from 'element-ui'
import noop from 'lodash/noop'
import ConnectedControlMixin from './mixins/ConnectedControl'

const ConnectedSlider = {
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

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
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
}

export default ConnectedSlider
