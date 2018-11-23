import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'
import invariant from 'invariant'

export default function length(options, customMessage = {}) {
  invariant(isObject(options), '"options" should be an object [validators.length]')
  invariant(!isEmpty(options), '"options" should be not an empty object [validators.length]')

  const { equals, min, max } = options
  invariant([equals, min, max].some(x => !isNil(x)), 'equals, min or max should be provided')

  return (value, name) => {
    if (equals) {
      return String(value).trim().length !== equals
        ? customMessage.equals || `${startCase(name)} should have ${equals} characters`
        : undefined
    }

    if (min) {
      return String(value).trim().length < min
        ? customMessage.min || `${startCase(name)} should have at least ${min} characters`
        : undefined
    }

    if (max) {
      return String(value).trim().length > max
        ? customMessage.max || `${startCase(name)} may have maximum ${max} characters`
        : undefined
    }

    return undefined
  }
}
