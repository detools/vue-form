import TimePicker from 'element-ui/lib/time-picker'
import noop from 'lodash/noop'
import camelCase from 'lodash/camelCase'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedTimePicker = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: [Date, String, Number],

    readonly: Boolean,
    disabled: Boolean,
    editable: Boolean,
    clearable: Boolean,
    size: String,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    isRange: Boolean,
    arrowControl: Boolean,
    align: String,
    popperClass: String,
    pickerOptions: Object,
    rangeSeparator: String,
    defaultValue: [Date, String, Number],
    valueFormat: {
      type: String,
      default: 'HH:mm:ss',
    },
    prefixIcon: String,
    clearIcon: String,

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

    handleClear: {
      type: Function,
      default: noop,
    },
  },

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
      return (
        <TimePicker
          class={this.class}
          name={camelCase(this.name)}
          value={value}
          readonly={this.readonly}
          disabled={this.isFieldDisabled}
          editable={this.editable}
          clearable={this.clearable}
          size={this.controlSize}
          placeholder={this.placeholder}
          start-placeholder={this.startPlaceholder}
          end-placeholder={this.endPlaceholder}
          is-range={this.isRange}
          arrow-control={this.arrowControl}
          align={this.align}
          popper-class={this.popperClass}
          picker-options={this.pickerOptions}
          range-separator={this.rangeSeparator}
          default-value={this.defaultValue}
          value-format={this.valueFormat}
          prefix-icon={this.prefixIcon}
          clear-icon={this.clearIcon}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}
          on-clear={this.handleClear}
        />
      )
    },
  },
}

export default ConnectedTimePicker
