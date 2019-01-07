import startCase from 'lodash/startCase'
import isNaN from 'lodash/isNaN'
import toNumber from 'lodash/toNumber'
import isNil from 'lodash/isNil'

const US_PHONE_NUMBER_LENGTH = 10

export default function phone(customMessage, length = US_PHONE_NUMBER_LENGTH) {
  return (rawValue, name) => {
    const value = toNumber(rawValue)

    let isError

    if (isNil(rawValue) || rawValue === '') {
      isError = false
    } else if (isNaN(value)) {
      isError = `${startCase(name)} should contain only numbers`
    } else if (length) {
      isError =
        rawValue.length !== length ? `Phone number should contain only ${length} characters` : false
    }

    return isError ? customMessage || isError : undefined
  }
}
