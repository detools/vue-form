import { isEmpty, isNil } from 'lodash'
import { Form } from 'element-ui'
import { withHooks, useFormState } from '../hooks'

export default withHooks((h, props, instance) => {
  // eslint-disable-next-line
  const { _state: state, _errors: errors } = instance.$data
  const { initialValues = {}, handleSubmit, handleDisabled } = props

  instance.$registerFormComponent = (name, initialValue, error) => {
    const formComponentInitialValue = !isNil(initialValue) ? initialValue : initialValues[name]

    return useFormState(instance, name, formComponentInitialValue, error)
  }

  const nativeOnSubmit = event => {
    event.preventDefault()

    if (handleDisabled) {
      if (Object.values(errors).some(item => !isEmpty(item))) {
        return handleDisabled(errors)
      }
    }

    return handleSubmit({ ...initialValues, ...state })
  }

  const nativeOnReset = event => {
    event.preventDefault()

    Object.entries(state).forEach(([key, value]) => {
      const initialValue = initialValues[key]

      instance.$set(state, key, initialValue || Array.isArray(value) ? [] : '')
      instance.$set(errors, key, null)
    })

    return handleSubmit(initialValues)
  }

  return (
    <Form
      class={props.class}
      label-width={props.labelWidth}
      label-suffix={props.labelSuffix}
      label-position={props.labelPosition}
      nativeOnSubmit={nativeOnSubmit}
      nativeOnReset={nativeOnReset}>
      {instance.$slots.default}
    </Form>
  )
})
