import noop from 'lodash/noop'
import invariant from 'invariant'

export default function validate(validators) {
  invariant(Array.isArray(validators), '"validate" accepts an array of validators')

  return (value, name) =>
    validators.reduce((error, validator = noop) => error || validator(value, name), undefined)
}
