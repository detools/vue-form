import test from 'tape-async'
import sinon from 'sinon'
import Vue from 'vue'
import { isFunction, has, noop } from 'lodash'
import { VueFormStoreParams } from '.'

test('Register Form Control', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  const addFormField = sinon.spy(store, 'addFormField')

  // Action
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Expectations
  t.ok(addFormField.calledOnce, '"addFormField" should be called once')
  t.ok(store.formFields.includes(name), '"formFields" should have control name')
  t.ok(!store.removedFields.includes(name), '"removedFields" should not have control name')
})

test('Unregister Form Control', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  const removeFormField = sinon.spy(store, 'removeFormField')
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Action
  store.removeFormField(name)

  // Expectations
  t.ok(removeFormField.calledOnce, '"removeFormField" should be called once')
  t.ok(!store.formFields.includes(name), '"formFields" should not have control name')
  t.ok(store.removedFields.includes(name), '"removedFields" should have control name')
})

test('Handle Model Change', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  const { useState } = store.registerFormControl({ name, fieldLevelInitialValue: value })

  const handleModelChange = sinon.spy(noop)

  // Action
  store.setHandleModelChange(handleModelChange)

  const [, setValue] = useState()
  const nextValue = 43
  setValue(nextValue)

  // Expectations
  t.ok(handleModelChange.calledOnce, '"handleModelChange" should be called once')

  const expectedState = { [name]: nextValue }
  t.ok(handleModelChange.calledWith(expectedState), 'state should be passed to "handleModelChange"')
})

test('Create "setError" callback', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const validators = []

  const store = new Vue(VueFormStoreParams)
  const createSetError = sinon.spy(store, 'createSetError')

  // Action
  const { setError } = store.registerFormControl({
    name,
    fieldLevelInitialValue: value,
    validators,
  })
  setError(validators)(value)

  // Expectations
  t.ok(createSetError.calledOnce, '"createSetError" should be called once')
  t.ok(createSetError.calledWith(name), '"createSetError" should be called with name')
  t.ok(isFunction(setError), '"setError" is function')
  t.ok(!has(store.syncErrors, name), '"syncErrors" should be empty')
})

test('Create "setAsyncError" callback', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  const createSetAsyncError = sinon.spy(store, 'createSetAsyncError')

  // Action
  const { setAsyncError } = store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Expectations
  t.ok(createSetAsyncError.calledOnce, '"createSetAsyncError" should be called once')
  t.ok(createSetAsyncError.calledWith(name), '"createSetAsyncError" should be called with name')
  t.ok(isFunction(setAsyncError), '"setAsyncError" is function')
  t.ok(!has(store.asyncErrors, name), '"asyncErrors" should be empty')
})

test('Create "setValue" callback', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const validators = []

  const store = new Vue(VueFormStoreParams)
  const createSetValue = sinon.spy(store, 'createSetValue')

  // Action
  const { useState } = store.registerFormControl({ name, fieldLevelInitialValue: value })
  const [, setValue] = useState()

  // Expectations
  t.ok(createSetValue.calledOnce, '"createSetValue" should be called once')
  t.ok(createSetValue.calledWith(name), '"createSetValue" should be called with name')
  t.ok(isFunction(setValue), '"setValue" is function')

  // Action
  const [, setValueWithEmptyValidators] = useState(validators)
  setValueWithEmptyValidators(value)

  // Expectations
  t.equal(store.state[name], value, '"setValue" should set value for "username"')
  t.ok(!has(store.syncErrors, name), '"syncErrors" should be empty')

  // Prerequisites
  const errorMessage = `${name} should be equal 43`
  const nextValidators = [controlValue => (controlValue !== 43 ? errorMessage : undefined)]
  const nextValue = 50

  // Action
  const [, setValueWithValidators] = useState(nextValidators)
  setValueWithValidators(nextValue)

  // Expectations
  t.equal(store.state[name], nextValue, '"setValue" should set value for "username"')
  t.ok(has(store.syncErrors, name), '"syncErrors" should have an error message')
  t.equal(store.syncErrors[name], errorMessage, 'sync error message as expected')
  t.equal(store.isValid, false, '"isValid" computed property should be false')
  t.equal(
    store.allErrors[name],
    errorMessage,
    '"allErrors" computed property should have errorMessage'
  )
})

test('Use normalize to get a different value in store', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const normalizedValue = 100
  const normalize = ({ name: fieldName }) => ({ value: normalizedValue, name: fieldName })

  const store = new Vue(VueFormStoreParams)

  // Action
  const { useState } = store.registerFormControl({ name, fieldLevelInitialValue: value, normalize })
  const [, setValue] = useState()

  setValue(value)

  // Expectations
  t.equal(store.state[name], normalizedValue, '"setValue" set normalizedValue for "username"')
})

test('Create "cleanFormValue" callback', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  const createCleanFormValue = sinon.spy(store, 'createCleanFormValue')

  // Action
  const { cleanFormValue } = store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Expectations
  t.ok(createCleanFormValue.calledOnce, '"createCleanFormValue" should be called once')
  t.ok(createCleanFormValue.calledWith(name), '"createCleanFormValue" should be called with name')
  t.ok(isFunction(cleanFormValue), '"cleanFormValue" is function')
  t.ok(!has(store.syncErrors, name), '"syncErrors" should be empty')
  t.ok(!has(store.removedFields, name), '"removedFields" should not contain "username')

  // Action
  cleanFormValue()

  // Expectations
  t.ok(!has(store.state, name), '"state" should not contain "username"')
  t.ok(!has(store.syncErrors, name), '"syncErrors" should not contain "username"')
  t.ok(!has(store.asyncErrors, name), '"asyncErrors" should not contain "username"')
  t.ok(!has(store.touchedFields, name), '"touchedFields" should not contain "username"')
  t.ok(store.removedFields.includes(name), '"removedFields" should contain "username')
})

test('Create "setTouched" callback', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const validators = []

  const store = new Vue(VueFormStoreParams)
  const createSetTouched = sinon.spy(store, 'createSetTouched')

  // Action
  const { setTouched } = store.registerFormControl({
    name,
    fieldLevelInitialValue: value,
    validators,
  })

  // Expectations
  t.ok(createSetTouched.calledOnce, '"createSetTouched" should be called once')
  t.ok(createSetTouched.calledWith(name), '"createSetTouched" should be called with name')
  t.ok(isFunction(setTouched), '"setTouched" is function')
  t.ok(!has(store.syncErrors, name), '"syncErrors" should be empty')

  // Action
  setTouched()

  // Expectations
  t.ok(has(store.touchedFields, name), '"touchedFields" should contain "username"')
  t.equal(store.touchedFields[name], true, '"touchedFields" value for "username" should be "true"')
})

test('Manage validating state', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const promise = Promise.resolve()

  const store = new Vue(VueFormStoreParams)
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Action
  const off = store.manageValidatingState(name, promise)

  // Expectations
  t.equal(store.form.validating, true, '"form" state is "validating" until we call "off" handler')
  t.equal(store.asyncValidations[name], promise, '"asyncValidations" should contain "promise"')
  t.equal(store.isDisabled, true, '"isDisabled" computed property should be "true"')
  t.ok(isFunction(off), '"off" handler is function')

  // Action
  off()

  // Expectations
  t.equal(store.form.validating, false, '"form" state no more "validating"')
  t.equal(
    store.asyncValidations[name],
    undefined,
    '"asyncValidations" should not contain "promise" for "username"'
  )
})

test('Manage submitting state', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Action
  const off = store.manageSubmittingState()

  // Expectations
  t.equal(store.form.submitting, true, '"form" state is "submitting" until we call "off" handler')
  t.equal(store.isDisabled, true, '"isDisabled" computed property should be "true"')
  t.ok(isFunction(off), '"off" handler is function')

  // Action
  off()

  // Expectations
  t.equal(store.form.submitting, false, '"form" state no more "submitting"')
})

test('Manage touched fields state', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Action
  store.manageTouchedFieldsState()

  // Expectations
  t.same(store.touchedFields, { [name]: true }, '"touchedFields" should contain "username"')
})

test('Reset values', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)

  // Action
  store.setInitialValues({ [name]: value })
  const { useState } = store.registerFormControl({ name })

  // Expectations
  t.equal(store.state[name], value, '"state" should contain "username" value')

  // Action
  const [, setValue] = useState()
  setValue(value + 1)

  // Expectations
  t.equal(store.state[name], value + 1, '"state" should contain updated "username" value')

  // Action
  store.resetValues()

  // Expectations
  t.equal(store.state[name], value, '"state" should contain original "username"')
})

test('Reinitialize values', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const arrayName = 'array'
  const arrayValue = [{ a: 'b' }]
  const objectName = 'object'
  const objectValue = { c: 'd' }
  const initialValues = {
    [name]: value,
    [arrayName]: arrayValue,
    [objectName]: objectValue,
  }

  const store = new Vue(VueFormStoreParams)

  // Action
  store.setInitialValues(initialValues)
  const { useState, setError, validateOnReinitialize } = store.registerFormControl({ name })
  store.registerFormControl({ name: arrayName })
  store.registerFormControl({ name: objectName })

  // Expectations
  t.equal(store.state[name], value, '"state" should contain "username" value')
  t.same(store.state[arrayName], arrayValue, '"state" should contain `[{ a: "b" }]` value')
  t.same(store.state[objectName], objectValue, '"state" should contain `{ c: "d" }` value')

  // Action
  const [, setValue] = useState()
  setValue(value + 1)

  // Expectations
  t.equal(store.state[name], value + 1, '"state" should contain updated "username" value')

  // Prerequisites
  const errorMessage = `${name} should be equal 43`
  const validators = [controlValue => (controlValue !== 43 ? errorMessage : undefined)]

  const reinitializeCallback = sinon.spy(state => {
    setError(validators)(state[name])
  })
  validateOnReinitialize(reinitializeCallback)

  // Action
  store.reinitializeValues({ ...initialValues, [arrayName]: null, [objectName]: null })

  // Expectations
  t.equal(store.state[name], value, '"state" should contain original "username"')
  t.same(store.state[arrayName], arrayValue, '"state" should contain `[{ a: "b" }]` value')
  t.same(store.state[objectName], objectValue, '"state" should contain `{ c: "d" }` value')
  t.ok(reinitializeCallback.calledOnce, '"reinitializeCallback" should be called')
  t.ok(
    reinitializeCallback.calledWith(store.state),
    '"reinitializeCallback" should be called with store state'
  )
})

test('Add Form Sync Errors', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42
  const errorMessage = `${name} is required`

  const store = new Vue(VueFormStoreParams)
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  // Action
  store.addFormSyncErrors({ [name]: errorMessage })

  // Expectations
  t.equal(store.syncErrors[name], errorMessage, '"syncErrors" should contain an error')
})

test('Remove Form Field Errors', async t => {
  // Prerequisites
  const name = 'username'
  const value = 42

  const store = new Vue(VueFormStoreParams)
  store.registerFormControl({ name, fieldLevelInitialValue: value })

  store.$set(store.syncErrors, name, 'syncError')
  store.$set(store.asyncErrors, name, 'asyncError')
  store.$set(store.touchedFields, name, true)

  // Expectations
  t.equal(store.syncErrors[name], 'syncError', `"syncErrors" should contain error for "${name}"`)
  t.equal(store.asyncErrors[name], 'asyncError', `"asyncErrors" should contain error for "${name}"`)
  t.equal(store.touchedFields[name], true, `"touchedFields" should contain "${name}"`)

  // Action
  store.removeFormFieldErrors(name)

  // Expectations
  t.ok(!has(store.syncErrors, name), `"syncErrors" should not contain error for "${name}"`)
  t.ok(!has(store.asyncErrors, name), `"asyncErrors" should not contain error for "${name}"`)
  t.ok(!has(store.touchedFields, name), `"touchedFields" should not contain "${name}"`)
})
