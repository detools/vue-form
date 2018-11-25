import { InputNumber } from 'element-ui'
import noop from 'lodash/noop'
import ConnectedControlMixin from './mixins/ConnectedControl'

const ConnectedInputNumber = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      default: () => 0,
    },

    min: Number,
    max: Number,
    step: Number,
    precision: Number,
    size: String,
    disabled: Boolean,
    controls: Boolean,
    controlsPosition: String,

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
}

export default ConnectedInputNumber
