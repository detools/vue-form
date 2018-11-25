import { Checkbox, CheckboxGroup } from 'element-ui'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import { ConnectedCheckboxGroupMixin } from './mixins/ConnectedControl'

const ConnectedCheckboxGroup = {
  props: {
    name: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    value: {
      type: Array,
      default: () => [],
    },

    valueKey: {
      type: String,
      default: () => 'id',
    },

    labelKey: {
      type: String,
      default: () => 'name',
    },

    disabledKey: {
      type: String,
      default: () => 'disabled',
    },

    size: String,
    disabled: Boolean,
    min: Number, // minimum number of checkbox checked
    max: Number, // maximum number of checkbox checked
    border: Boolean,

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

  mixins: [ConnectedCheckboxGroupMixin],

  methods: {
    generateOptions(option) {
      let { [this.valueKey]: optionValue, [this.labelKey]: optionLabel } = option
      const { [this.disabledKey]: optionDisabled } = option

      if (isNil(optionLabel)) {
        optionValue = option
        optionLabel = option
      }

      return (
        <Checkbox
          key={optionValue}
          label={optionValue}
          disabled={optionDisabled}
          border={this.border}>
          {optionLabel || optionValue}
        </Checkbox>
      )
    },

    renderComponent(value, setValue) {
      return (
        <CheckboxGroup
          class={this.class}
          name={this.name}
          value={value}
          size={this.size}
          disabled={this.disabled}
          min={this.min}
          max={this.max}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={setValue}>
          {this.options.map(this.generateOptions)}
        </CheckboxGroup>
      )
    },
  },
}

export default ConnectedCheckboxGroup
