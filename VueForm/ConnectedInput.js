import { Input } from 'element-ui'
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
    <Input
      class={props.class}
      name={props.name}
      type={props.type}
      value={value}
      maxlength={props.maxlength}
      minLength={props.minLength}
      placeholder={props.placeholder}
      clearable={props.clearable}
      disabled={props.disabled}
      size={props.size}
      prefix-icon={props.prefixIcon}
      suffix-icon={props.suffixIcon}
      rows={props.rows}
      autosize={props.autosize}
      autocomplete={props.autocomplete}
      readonly={props.readonly}
      max={props.max}
      min={props.min}
      step={props.step}
      resize={props.resize}
      autofocus={props.autofocus}
      form={props.form}
      label={props.label}
      tabindex={props.tabindex}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}
    />
  )
})
