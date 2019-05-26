import Vue from 'vue'
import isNil from 'lodash/isNil'
import parsePathToArray from './parsePathToArray'

const arrayRegex = /[[]/

export default function set(target, stringPath, value) {
  let targetPart = target
  const path = parsePathToArray(stringPath)
  const lastIndex = path.length - 1

  if (!Array.isArray(path)) {
    return Vue.set(target, path, value)
  }

  return path.forEach((item, index) => {
    const isNextItemArrayPath = arrayRegex.test(path[index + 1])
    const isCurrentPathExists = !!targetPart && !isNil(targetPart[item])
    const isLastPartInPath = index === lastIndex
    const normalizedPart = item.replace('[', '').replace(']', '')

    if (isLastPartInPath) {
      Vue.set(targetPart, normalizedPart, value)

      return
    }

    if (isCurrentPathExists) {
      targetPart = targetPart[normalizedPart]

      return
    }

    /* IF PATH DOES NOT EXIST */
    Vue.set(targetPart, normalizedPart, isNextItemArrayPath ? [] : {})

    targetPart = targetPart[normalizedPart]
  })
}
