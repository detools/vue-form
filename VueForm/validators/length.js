import isPlainObject from 'lodash/isPlainObject'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'
import invariant from 'invariant'

export default function length(options, customMessage = '') {
  invariant(isPlainObject(options), '"options" should be an object [validators.length]')
  invariant(!isEmpty(options), '"options" should be not an empty object [validators.length]')

  const { equals, min, max } = options
  invariant([equals, min, max].some(x => !isNil(x)), 'equals, min or max should be provided')

  return (rawValue, name) => {
    const cleanValue = isNil(rawValue) ? '' : rawValue
    const value = Array.isArray(cleanValue) ? cleanValue : String(cleanValue).trim()

    if (equals) {
      return value.length !== equals
        ? customMessage.equals ||
            customMessage ||
            `${startCase(name)} should have ${equals} characters`
        : undefined
    }

    if (min) {
      return value.length < min
        ? customMessage.min ||
            customMessage ||
            `${startCase(name)} should have at least ${min} characters`
        : undefined
    }

    if (max) {
      return value.length > max
        ? customMessage.max ||
            customMessage ||
            `${startCase(name)} may have maximum ${max} characters`
        : undefined
    }

    return undefined
  }
}
