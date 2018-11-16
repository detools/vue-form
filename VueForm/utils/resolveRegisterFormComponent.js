import isNil from 'lodash/isNil'
import CONSTANTS from '../constants'

export default function resolveRegisterFormComponent(formComponent) {
  let parent = formComponent.$parent
  let resolver = null

  while (parent) {
    const func = parent[CONSTANTS.SECRET_VUE_FORM_METHOD]
    if (!isNil(func)) {
      resolver = func
      break
    }

    parent = parent.$parent
  }

  return resolver
}
