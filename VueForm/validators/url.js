import startCase from 'lodash/startCase'
import isNil from 'lodash/isNil'
import { parse } from 'uri-js'
import { DEFAULT_URL_PROTOCOLS } from '../constants'

export default function isRequired(protocols = DEFAULT_URL_PROTOCOLS, customMessage) {
  return (value, name) => {
    let isError

    if (isNil(value) || value === '') {
      isError = `${startCase(name)} is not defined`
    } else {
      const { scheme: protocol, error } = parse(value)

      if (error) {
        isError = error
      } else if (!protocol) {
        isError = `Please, provide a protocol. Available options: ${protocols.join(', ')}`
      } else if (!protocols.includes(protocol)) {
        isError = 'Selected protocol is not permitted'
      }
    }

    return isError ? customMessage || isError : undefined
  }
}
