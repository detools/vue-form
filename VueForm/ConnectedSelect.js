import { Select, Option } from 'element-ui'
import { get, noop, isNil, castArray } from 'lodash'
import invariant from 'invariant'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'
import defaultNormalizer from './defaultNormalizer'
import { withHooks } from '../hooks'

export default withHooks((h, props, instance) => {
  invariant(props.name, 'Prop "name" is required')
  invariant(Array.isArray(props.options), 'Prop "options" is required and should be an array')

  const {
    normalize = defaultNormalizer,
    validate = noop,
    multiple = false,
    valueKey = 'value',
    labelKey = 'label',
  } = props

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
    const nextValue = normalize(inputValue)
    const isError = validate(nextValue)

    setValue(nextValue)
    setError(isError)
  }

  const focus = get(props, 'handleFocus', noop)
  const blur = get(props, 'handleBlur', noop)
  const change = get(props, 'handleChange', noop)

  const generateOptions = option => {
    let { [valueKey]: optionValue, [labelKey]: optionLabel } = option

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
      multiple={multiple}
      disabled={props.disabled}
      value-key={valueKey}
      size={props.size}
      clearable={props.clearable}
      collapse-tags={props.collapseTags}
      multiple-limit={props.multipleLimit}
      // Autocomplete === 'off' does not work on Chrome
      autocomplete={props.autocomplete || 'nope'}
      placeholder={props.placeholder}
      filterable={props.filterable}
      allow-create={props.allowCreate}
      filter-method={props.filterMethod}
      remote={props.remote}
      remote-method={props.remoteMethod}
      loading={props.loading}
      loading-text={props.loadingText}
      no-match-text={props.noMatchText}
      no-data-text={props.noDataText}
      reserve-keyword={props.reserveKeyword}
      default-first-option={props.defaultFirstOption}
      popper-append-to-body={props.popperAppendToBody}
      automatic-dropdown={props.automaticDropdown}
      on-focus={focus}
      on-input={input}
      on-blur={blur}
      on-change={change}>
      {props.options.map(generateOptions)}
    </Select>
  )
})
