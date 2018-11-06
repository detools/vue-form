import { Radio } from 'element-ui'
import { withHooks } from 'vue-hooks'
import { get, noop } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'

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
    <Radio
      class={props.class}
      name={props.name}
      label={props.value}
      value={value}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}>
      {instance.$slots.default}
    </Radio>
  )
})
