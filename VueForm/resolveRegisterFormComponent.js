import { isNil } from 'lodash'

export default function resolveRegisterFormComponent(formComponent) {
  let parent = formComponent.$parent
  let resolver = null

  while (parent) {
    const func = parent.$registerFormComponent
    if (!isNil(func)) {
      resolver = func
      break
    }

    parent = parent.$parent
  }

  return resolver
}
