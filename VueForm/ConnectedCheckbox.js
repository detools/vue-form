import { Checkbox } from 'element-ui'
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
    <Checkbox
      class={props.class}
      name={props.name}
      value={value}
      label={props.label}
      true-label={props.trueLabel}
      false-label={props.falseLabel}
      disabled={props.disabled}
      size={props.size}
      border={props.border}
      checked={props.checked}
      indeterminate={props.indeterminate}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}>
      {instance.$slots.default}
    </Checkbox>
  )
})
