import isObject from 'lodash/isObject'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

export default function length(value, name, options, customMessage) {
  invariant(isObject(options), '"options" should be an object [validators.length]')
  invariant(!isEmpty(options), '"options" should be not an empty object [validators.length]')
  invariant(name || customMessage, '"name" or "customMessage" should be provided')

  const { equals, min, max } = options

  invariant([equals, min, max].some(x => !isNil(x)), 'equals, min or max should be provided')

  return () => {
    if (equals) {
      return String(value).trim().length !== equals
        ? `${name} should have ${equals} characters`
        : undefined
    }

    if (min) {
      return String(value).trim().length < min
        ? `${name} should have at least ${min} characters`
        : undefined
    }

    if (max) {
      return String(value).trim().length > max
        ? `${name} should have maximum ${max} characters`
        : undefined
    }

    return undefined
  }
}
