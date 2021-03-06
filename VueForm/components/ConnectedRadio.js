import Radio from 'element-ui/lib/radio'
import noop from 'lodash/noop'
import camelCase from 'lodash/camelCase'
import ConnectedControlMixin from '../mixins/ConnectedControl'

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
    omitFormItemLabel: {
      type: Boolean,
      default: true,
    },
  },

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
      return (
        <Radio
          class={this.class}
          name={camelCase(this.name)}
          value={value}
          label={this.value}
          disabled={this.isFieldDisabled}
          border={this.border}
          size={this.controlSize}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}>
          {this.$slots.default}
        </Radio>
      )
    },
  },
}

export default ConnectedRadio
