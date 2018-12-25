import startCase from 'lodash/startCase'
import isNaN from 'lodash/isNaN'
import toNumber from 'lodash/toNumber'
import isNil from 'lodash/isNil'

export default function isRequired(customMessage) {
  return (rawValue, name) => {
    const value = toNumber(rawValue)
    let isError

    if (isNil(rawValue) || rawValue === '') {
      isError = true
    } else if (isNaN(value)) {
      isError = true
    }

    return isError ? customMessage || `${startCase(name)} is not a number` : undefined
  }
}
