import noop from 'lodash/noop'
import invariant from 'invariant'
import isPromise from '../utils/is-promise'

export default function validate(validators, value, name) {
  invariant(Array.isArray(validators), '"validate" accepts an array of validators')

  return validators.reduce(
    (sequence, validator = noop) =>
      sequence.then(() => {
        const result = validator(value, name)

        if (isPromise(result)) {
          return result
        }

        return result ? Promise.reject(result) : Promise.resolve()
      }),
    Promise.resolve()
  )
}
