import isEmpty from 'lodash/isEmpty'

export default function isRequired(value, name, customMessage) {
  return () => (isEmpty(value) ? customMessage || `${name} is required` : undefined)
}
