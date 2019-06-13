import Checkbox from 'element-ui/lib/checkbox'
import CheckboxGroup from 'element-ui/lib/checkbox-group'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import { ConnectedArrayFieldMixin } from '../mixins/ConnectedControl'

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
  },

  mixins: [ConnectedArrayFieldMixin],

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
          size={this.controlSize}
          disabled={this.isFieldDisabled}
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
