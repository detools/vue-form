import { Radio } from 'element-ui'
import noop from 'lodash/noop'
import ConnectedControlMixin from './mixins/ConnectedControl'

const ConnectedRadio = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: [String, Number, Boolean],
    disabled: Boolean,
    border: Boolean,
    size: String,

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
    formItem: Boolean,
    labelWidth: String,
  },

  mixins: [ConnectedControlMixin],

  created() {
    this.omitFormItemLabel = true
  },

  methods: {
    renderComponent(value, setValue) {
      return (
        <Radio
          class={this.class}
          name={this.name}
          value={value}
          label={this.value}
          disabled={this.disabled}
          border={this.border}
          size={this.size}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleChange}>
          {this.$slots.default}
        </Radio>
      )
    },
  },
}

export default ConnectedRadio
