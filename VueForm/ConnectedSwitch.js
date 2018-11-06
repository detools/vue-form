import { Switch } from 'element-ui'
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
    <Switch
      class={props.class}
      name={props.name}
      value={value}
      disabled={props.disabled}
      width={props.width}
      active-icon-class={props.activeIconClass}
      inactive-icon-class={props.inactiveIconClass}
      active-text={props.activeText}
      inactive-text={props.inactiveText}
      active-value={props.activeValue}
      inactive-value={props.inactiveValue}
      active-color={props.activeColor}
      inactive-color={props.inactiveColor}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}
    />
  )
})
