import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'
import startCase from 'lodash/startCase'

export default function createIsRequiredValidator(customMessage, disallowFalse) {
  function isRequired(value, name) {
    let isError

    if (isNil(value) || String(value).trim() === '') {
      isError = true
    } else if (Array.isArray(value)) {
      isError = value.length === 0
    } else if (isPlainObject(value)) {
      isError = isEmpty(value)
    } else if (disallowFalse && value === false) {
      isError = true
    }

    return isError ? customMessage || `${startCase(name)} is required` : undefined
  }

  isRequired.IS_REQUIRED_VALIDATOR = true

  return isRequired
}
