import isNil from 'lodash/isNil'
import startCase from 'lodash/startCase'

export default function isRequired(customMessage) {
  return (value, name) =>
    isNil(value) ? customMessage || `${startCase(name)} is required` : undefined
}
