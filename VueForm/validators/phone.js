import startCase from 'lodash/startCase'
import isNaN from 'lodash/isNaN'
import toNumber from 'lodash/toNumber'
import isNull from 'lodash/isNull'
import isString from 'lodash/isString'

const US_PHONE_NUMBER_LENGTH = 10

export default function phone(customMessage, length = US_PHONE_NUMBER_LENGTH) {
  return (rawValue, name) => {
    const value = toNumber(rawValue)
    const isValueExists = isNull(rawValue)

    let isError

    if (isValueExists) {
      isError = false
    } else if (isNaN(value)) {
      isError = true
    } else if (isValueExists && length) {
      isError =
        rawValue.length !== length ? `Phone number should contain only ${length} characters` : false
    }

    return isError
      ? (isString(isError) ? isError : customMessage) ||
          `${startCase(name)} should contain only numbers`
      : undefined
  }
}
