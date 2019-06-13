import DatePicker from 'element-ui/lib/date-picker'
import noop from 'lodash/noop'
import ConnectedControlMixin from '../mixins/ConnectedControl'

/**
 * DatePicker Component connected to @detools/vue-form
 * @see  http://element.eleme.io/#/en-US/component/date-picker#date-formats
 *
 * @param {Object} props Passed props
 * @param {Boolean} readonly [false] whether DatePicker is read only
 * @param {Boolean} disabled [false] whether DatePicker is disabled
 * @param {Enum} size (large/small/mini) size of input
 * @param {Boolean} editable [true] whether DatePicker is editable
 * @param {Boolean} clearable whether to show clear button
 * @param {String} placeholder only in non-range mode
 * @param {String} startPlaceholder for the start date in range mode
 * @param {String} endPlaceholder for the end date in range mode
 * @param {Enum} type (year/month/date/dates/datetime/week/datetimerange/daterange) [date] type
 * @param {String} format [yyyy-MM-dd] format of the displayed value in the input box
 * @param {Enum} align (left/center/right) alignment
 * @param {Object} pickerOptions additional options, see — PickerOptions
 * @param {String} rangeSeparator [-] range-separator
 * @param {Date} defaulValue (anything accepted by new Date()) default date of the calendar
 * @param {Array<String>} defaultTime default time of the calendar
 * @param {String} valueFormat [Date] format of binding value
 * @param {String} name same as "native" in native input
 *
 * PickerOptions
 * @param {Array<Object>} shortcuts a { text, onClick } shortcut options, see — Shortcuts
 * @param {Function} disabledDate returns a boolean — disabled date or not
 * @param {Number} firstDayOfWeek first day of week
 * @param {Function} onPick a callback that triggers when the selected date is changed
 *
 * Shortcuts
 * @param {String} text title of the shortcut
 * @param {Function} onClick callback on that click
 */

const ConnectedDatePicker = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: [Date, String, Number],

    readonly: Boolean,
    disabled: Boolean,
    size: String,
    editable: {
      type: Boolean,
      default: true,
    },
    clearable: Boolean,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    type: String,
    format: {
      type: String,
      default: () => 'M/d/yyyy',
    },
    align: String,
    popperClass: String,
    pickerOptions: Object,
    rangeSeparator: String,
    defaultValue: [Date, String, Number],
    defaultTime: String,
    valueFormat: {
      type: String,
      default: () => 'M/d/yyyy',
    },
    unlinkPanels: Boolean,
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
  },

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
      return (
        <DatePicker
          class={this.class}
          name={this.name}
          value={value}
          readonly={this.readonly}
          disabled={this.isFieldDisabled}
          size={this.controlSize}
          editable={this.editable}
          clearable={this.clearable}
          placeholder={this.placeholder}
          start-placeholder={this.startPlaceholder}
          end-placeholder={this.endPlaceholder}
          type={this.type}
          format={this.format}
          align={this.align}
          popper-class={this.popperClass}
          picker-options={this.pickerOptions}
          range-separator={this.rangeSeparator}
          default-value={this.defaultValue}
          default-time={this.defaultTime}
          value-format={this.valueFormat}
          unlink-panels={this.unlinkPanels}
          prefix-icon={this.prefixIcon}
          clear-icon={this.clearIcon}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}
        />
      )
    },
  },
}

export default ConnectedDatePicker
