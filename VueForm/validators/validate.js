import noop from 'lodash/noop'
import invariant from 'invariant'

export const validate = function validate(validators, value, name) {
  invariant(Array.isArray(validators), '"validate" accepts an array of validators')

  let error
  let i = 0
  const { length } = validators

  for (i; i < length; i += 1) {
    const validator = validators[i] || noop
    const errorString = validator(value, name)

    if (errorString) {
      error = errorString
      break
    }
  }

  return error
}

export const asyncValidate = function asyncValidate(validators, value, name) {
  invariant(Array.isArray(validators), '"validate" accepts an array of validators')

  return validators.reduce(
    (sequence, validator = noop) => sequence.then(() => validator(value, name)),
    Promise.resolve()
  )
}
