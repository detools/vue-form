import { Checkbox } from 'element-ui'
import noop from 'lodash/noop'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedCheckbox = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Boolean,
      default: () => false,
    },

    label: [String, Boolean],
    trueLabel: String,
    falseLabel: String,
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
    formItem: Boolean,
    labelWidth: String,
  },

  created() {
    this.omitFormItemLabel = true
  },

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
      return (
        <Checkbox
          class={this.class}
          name={this.name}
          value={value}
          true-label={this.trueLabel}
          false-label={this.falseLabel}
          disabled={this.disabled}
          border={this.border}
          size={this.size}
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
