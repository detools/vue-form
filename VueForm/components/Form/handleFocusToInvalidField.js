export default function createHandleFocusToInvalidField({ store, formRef }) {
  return function handleFocusToInvalidField(passedElementId) {
    const [name] = store.allErrorsFields
    const elementId = passedElementId || name

    let elementByName
    let elementById

    if (formRef) {
      elementByName = formRef.$el.querySelector(`[name=${elementId}]`)
      elementById = formRef.$el.querySelector(`#${elementId}`)
    }

    if (!elementByName && !elementById) {
      // eslint-disable-next-line prefer-destructuring
      elementByName = document.getElementsByName(elementId)[0]
      elementById = document.getElementById(elementId)
    }

    if (/WebKit/.test(navigator.userAgent)) {
      if (elementByName) {
        elementByName.focus()
      }

      if (elementById) {
        if (elementById.scrollIntoView) {
          elementById.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        } else {
          window.scroll(0, elementById.offsetParent.offsetTop)
        }
      }
    } else {
      const element = elementByName || elementById

      if (element && element.scrollIntoView) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }
    }
  }
}
