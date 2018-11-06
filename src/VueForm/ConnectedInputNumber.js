import { InputNumber } from 'element-ui'
import { withHooks } from 'vue-hooks'
import { get, noop } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'

export default withHooks((h, props, instance) => {
  const { normalize = noop, validate = noop } = props

  invariant(props.name, 'Prop "name" is required')

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
    <InputNumber
      class={props.class}
      name={props.name}
      disabled={props.disabled}
      value={value}
      min={props.min}
      max={props.max}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}
    />
  )
})
