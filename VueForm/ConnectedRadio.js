import { Radio } from 'element-ui'
import { get, noop } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'
import defaultNormalizer from './defaultNormalizer'
import { withHooks } from '../hooks'

// XXX: Add RadioGroup
export default withHooks((h, props, instance) => {
  invariant(props.name, 'Prop "name" is required')

  const { normalize = defaultNormalizer, validate = noop } = props

  const $registerFormComponent = resolveRegisterFormComponent(instance)
  const [value, setValue, setError] = $registerFormComponent(
    props.name,
    props.value,
    validate(props.value)
  )

  const input = inputValue => {
    const nextValue = normalize(inputValue)
    const isError = validate(nextValue)

    setValue(nextValue)
    setError(isError)
  }

  const focus = get(props, 'handleFocus', noop)
  const blur = get(props, 'handleBlur', noop)
  const change = get(props, 'handleChange', noop)

  return (
    <Radio
      class={props.class}
      name={props.name}
      value={value}
      label={props.value}
      disabled={props.disabled}
      border={props.border}
      size={props.size}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}>
      {instance.$slots.default}
    </Radio>
  )
})
