export default function parsePathToArray(string) {
  const arrayRegex = /[[]/
  const reverseArrayRegex = /\]/
  const isArrayPath = arrayRegex.test(string)

  const dotRegex = /\./
  const isInnerPath = dotRegex.test(string)

  if (!isArrayPath && !isInnerPath) {
    return string
  }

  if (!isArrayPath && isInnerPath) {
    return string.split(dotRegex)
  }

  if (isArrayPath && isInnerPath) {
    return string.split(dotRegex).reduce((memo, item) => memo.concat(parsePathToArray(item)), [])
  }

  return string
    .split(arrayRegex)
    .reduce(
      (memo, item) => (reverseArrayRegex.test(item) ? memo.concat(`[${item}`) : memo.concat(item)),
      []
    )
}
