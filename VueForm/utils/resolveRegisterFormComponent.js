import isNil from 'lodash/isNil'
import CONSTANTS from '../constants'
import store from '../store'

export default function resolveRegisterFormComponent(formComponent) {
  if (formComponent.detached) {
    return store.creatDetached(formComponent.initialValues)
  }

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
