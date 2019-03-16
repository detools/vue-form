import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'
import startCase from 'lodash/startCase'

export default function createIsRequiredValidator(customMessage) {
  return function isRequired(value, name) {
    let isError

    if (isNil(value) || value === '') {
      isError = true
    } else if (Array.isArray(value)) {
      isError = value.length === 0
    } else if (isPlainObject(value)) {
      isError = isEmpty(value)
    }

    return isError ? customMessage || `${startCase(name)} is required` : undefined
  }
}
