import { isEmpty, isString, isPlainObject, mergeWith, omit, isNil } from 'lodash'
import Notification from '../Notification'

function defaultMergeCustomizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue
  }

  // Mostly handle undefined values that merge do not use
  if (isNil(srcValue)) {
    return null
  }

  return undefined
}

export default function createSubmitHandler(options) {
  const {
    handleSave,
    handleSubmit,
    disabled,
    validate,
    handleFocusToInvalidField,
    handleFormDisabled,
    initialValues,
    mergeCustomizer = defaultMergeCustomizer,
    confirmMessage,
    confirmHandler,
    confirmPopoverRef,
    isSubmitButtonDisabled,
    messages,
    store,
  } = options

  return async function nativeOnSubmit(event, isConfirmSubmit) {
    event.preventDefault()

    // Just don't do anything — some form process in progress
    if (store.isDisabled) {
      return false
    }

    const isSubmitButtonClick = event.type === 'click'
    const submitHandler = !isSubmitButtonClick && handleSave ? handleSave : handleSubmit

    if (isSubmitButtonClick && !isNil(disabled)) {
      if (isString(disabled)) {
        return Notification.error(disabled)
      }

      if (isPlainObject(disabled)) {
        Notification.error(disabled.message)

        return handleFocusToInvalidField(disabled.id)
      }
    }

    if (isSubmitButtonClick) {
      store.manageTouchedFieldsState()
    }

    // Form Level Sync Validate
    if (isSubmitButtonClick && validate) {
      const syncErrors = validate(store.state)

      if (!isEmpty(syncErrors)) {
        store.addFormSyncErrors(syncErrors)

        return handleFormDisabled(syncErrors)
      }
    }

    if (!store.isValid && isSubmitButtonClick) {
      handleFocusToInvalidField()

      return handleFormDisabled()
    }

    const formValues = mergeWith(
      {},
      omit(initialValues, store.removedFields),
      store.state,
      mergeCustomizer
    )

    if (!isConfirmSubmit && isSubmitButtonClick && confirmMessage) {
      if (!confirmHandler || (await confirmHandler(formValues))) {
        return confirmPopoverRef.show()
      }
    }

    // Last case — pristine
    if (isSubmitButtonClick && isSubmitButtonDisabled) {
      return false
    }

    const off = store.manageSubmittingState()
    const submitForm = () => Promise.resolve(submitHandler(formValues))

    const formMessages = messages || {}
    const submitPromise = store.form.validating
      ? Promise.all(Object.values(store.asyncValidations)).then(submitForm)
      : submitForm()

    // Just subscribe to promise, do not catch errors
    submitPromise
      .then(
        () => Notification.success(formMessages.success),
        error => {
          if (error && error.error) {
            Notification.error(error.error)
          } else {
            Notification.error(formMessages.error)
          }

          handleFormDisabled()
        }
      )
      .then(off)

    return submitPromise
  }
}
