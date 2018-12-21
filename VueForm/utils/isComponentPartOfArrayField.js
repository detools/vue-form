import isNil from 'lodash/isNil'
import CONSTANTS from '../constants'

export default function isComponentPartOfArrayField(formComponent) {
  let parent = formComponent.$parent
  let flagValue = false

  while (parent) {
    const func = parent[CONSTANTS.SECRET_VUE_FORM_METHOD]
    const flag = parent[CONSTANTS.IS_ARRAY_FIELD]

    if (flag) {
      flagValue = true
      break
    }

    if (!isNil(func)) {
      break
    }

    parent = parent.$parent
  }

  return flagValue
}
