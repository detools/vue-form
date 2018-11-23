import noop from 'lodash/noop'
import invariant from 'invariant'

export default function validate(validators, value, name) {
  invariant(Array.isArray(validators), '"validate" accepts an array of validators')

  return validators.reduce((error, validator = noop) => error || validator(value, name), undefined)
}
