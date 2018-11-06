import { Select, Option } from 'element-ui'
import { withHooks } from 'vue-hooks'
import { get, noop, isNil, castArray } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'

export default withHooks((h, props, instance) => {
  invariant(props.name, 'Prop "name" is required')
  invariant(Array.isArray(props.options), 'Prop "options" is required and should be an array')

  const { normalize = noop, validate = noop, multiple = false } = props

  let initialValue = props.value
  if (multiple) {
    // If there is no defined "value" inside props — use an empty array
    if (isNil(initialValue)) {
      initialValue = []
    } else if (!Array.isArray(initialValue)) {
      // If there is a non-null value, but it is not an array — cast it to an array
      initialValue = castArray(initialValue)
    }
  }

  const $registerFormComponent = resolveRegisterFormComponent(instance)
  const [value, setValue, setError] = $registerFormComponent(
    props.name,
    initialValue,
    validate(initialValue)
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

  const generateOptions = option => {
    let { value: optionValue, label: optionLabel } = option

    if (isNil(optionLabel)) {
      optionValue = option
      optionLabel = option
    }

    return <Option key={optionValue} label={optionLabel} value={optionValue} />
  }

  return (
    <Select
      class={props.class}
      name={props.name}
      value={value}
      clearable={props.clearable}
      placeholder={props.placeholder}
      multiple={multiple}
      filterable={props.filterable}
      remote={props.remote}
      loading={props.loading}
      remote-method={props.remoteMethod}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}>
      {props.options.map(generateOptions)}
    </Select>
  )
})
