import { TimeSelect } from 'element-ui'
import { get, noop } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'
import { withHooks } from '../hooks'

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

  return (
    <TimeSelect
      class={props.class}
      name={props.name}
      value={value}
      readonly={props.readonly}
      disabled={props.disabled}
      editable={props.editable}
      clearable={props.clearable}
      size={props.size}
      placeholder={props.placeholder}
      start-placeholder={props.startPlaceholder}
      end-placeholder={props.endPlaceholder}
      is-range={props.isRange}
      arrow-control={props.arrowControl}
      align={props.align}
      popper-class={props.popperClass}
      picker-options={props.pickerOptions}
      range-separator={props.rangeSeparator}
      default-value={props.defaultValue}
      value-format={props.valueFormat}
      prefix-icon={props.prefixPanels}
      clear-icon={props.clearPanels}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}
    />
  )
})
