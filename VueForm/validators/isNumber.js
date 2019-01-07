import startCase from 'lodash/startCase'
import isNaN from 'lodash/isNaN'
import toNumber from 'lodash/toNumber'
import isNil from 'lodash/isNil'

export default function isNumber(customMessage) {
  return (rawValue, name) => {
    const value = toNumber(rawValue)
    let isError

    if (isNil(rawValue) || rawValue === '') {
      isError = false
    } else if (isNaN(value)) {
      isError = `${startCase(name)} is not a number`
    }

    return isError ? customMessage || isError : undefined
  }
}
