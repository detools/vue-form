import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'

export default function isRequired(customMessage) {
  return (value, name) =>
    isEmpty(value) ? customMessage || `${startCase(name)} is required` : undefined
}
