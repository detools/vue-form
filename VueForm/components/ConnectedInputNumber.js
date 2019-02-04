import InputNumber from 'element-ui/lib/input-number'
import noop from 'lodash/noop'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedInputNumber = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: Number,

    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1,
    },
    precision: {
      type: Number,
      default: 0,
    },
    size: String,
    disabled: Boolean,
    controls: Boolean,
    controlsPosition: String,
    placeholder: {
      type: String,
      default: '0',
    },

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
    label: [String, Boolean],
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
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}
          placeholder={this.placeholder}
        />
      )
    },
  },
}

export default ConnectedInputNumber
