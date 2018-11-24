import isNil from 'lodash/isNil'

export default function isValid(errorsArray) {
  return !errorsArray.some(errors => Object.values(errors).some(error => !isNil(error)))
}
