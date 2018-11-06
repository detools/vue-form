import { DatePicker } from 'element-ui'
import { get, noop } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'
import { withHooks } from '../hooks'

/**
 * DatePicker Componenet connected to @detools/vue-form
 * @see  http://element.eleme.io/#/en-US/component/date-picker#date-formats
 *
 * @param {Object} props Passed props
 * @param {Boolean} readonly [false] whether DatePicker is read only
 * @param {Boolean} disabled [false] whether DatePicker is disabled
 * @param {Enum} size (large/small/mini) size of input
 * @param {Boolean} editable [true] whether DatePicker is disabled
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
export default withHooks((h, props, instance) => {
  invariant(props.name, 'Prop "name" is required')

  const { normalize = noop, validate = noop } = props

  const $registerFormComponent = resolveRegisterFormComponent(instance)
  const [value, setValue, setError] = $registerFormComponent(
    props.name,
    props.value,
    validate(props.value)
  )

  const input = inputValue => {
    const nextValue = normalize(inputValue) || inputValue
    const isError = validate(nextValue)

    setValue(nextValue)
    setError(isError)
  }

  const focus = get(props, 'handleFocus', noop)
  const blur = get(props, 'handleBlur', noop)
  const change = get(props, 'handleChange', noop)

  const format = 'MM/dd/yyyy'

  return (
    <DatePicker
      class={props.class}
      name={props.name}
      value={value}
      readonly={props.readonly}
      disabled={props.disabled}
      size={props.size}
      editable={props.editable || false}
      clearable={props.clearable}
      placeholder={props.placeholder}
      start-placeholder={props.startPlaceholder}
      end-placeholder={props.endPlaceholder}
      type={props.type}
      format={props.format || format}
      align={props.align}
      picker-options={props.pickerOptions}
      range-separator={props.rangeSeparator}
      defaul-value={props.defaulValue}
      defaul-time={props.defaultTime}
      value-format={props.valueFormat || format}
      name={props.name}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}
    />
  )
})
