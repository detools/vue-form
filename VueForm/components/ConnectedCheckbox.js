import Checkbox from 'element-ui/lib/checkbox'
import noop from 'lodash/noop'
import camelCase from 'lodash/camelCase'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedCheckbox = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Boolean,
      default: false,
    },

    label: [String, Boolean],
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    disabled: Boolean,
    border: Boolean,
    size: String,
    checked: String,
    indeterminate: String,

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
        <Checkbox
          class={this.class}
          name={camelCase(this.name)}
          value={value}
          true-label={this.trueLabel}
          false-label={this.falseLabel}
          disabled={this.isFieldDisabled}
          border={this.border}
          size={this.controlSize}
          checked={this.checked}
          indeterminate={this.indeterminate}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}>
          {this.$slots.default}
        </Checkbox>
      )
    },
  },
}

export default ConnectedCheckbox
