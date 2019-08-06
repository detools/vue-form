import Vue from 'vue'
import {
  union,
  without,
  has,
  isNil,
  noop,
  isFunction,
  mapValues,
  merge,
  get,
  set,
  cloneDeep,
} from 'lodash'
import { validate, asyncValidate } from '../validators/validate'
import isValid from '../utils/isValid'
import CONSTANTS from '../constants'

export const VueFormStoreParams = {
  data() {
    return {
      // { [fieldName]: Any }
      state: {},

      // { [fieldName]: String }
      syncErrors: {},
      asyncErrors: {},

      // { [fieldName]: Promise }
      asyncValidations: {},

      // Array<String>
      formFields: [],

      // Array<String>
      removedFields: [],

      // { [fieldName]: true }
      touchedFields: {},

      // { [fieldName]: true }
      dirtyFields: {},

      form: {
        submitting: false,
        validating: false,
        dirty: false,
      },

      props: {
        // { [fieldName]: Any }
        initialValues: {},

        handleModelChange: noop,

        keepValueOnRemove: false,
      },
    }
  },

  computed: {
    isValid() {
      return isValid([this.syncErrors, this.asyncErrors])
    },

    isDisabled() {
      const { submitting, validating, dirty } = this.form

      return submitting || validating || (Boolean(this.formFields.length) && !dirty)
    },

    allErrors() {
      return merge({}, this.syncErrors, this.asyncErrors)
    },

    allErrorsFields() {
      return Object.keys(this.allErrors)
    },
  },

  methods: {
    // ON MOUNT FORM START
    setInitialValues(initialValues) {
      this.props.initialValues = JSON.parse(JSON.stringify(initialValues))

      return this
    },

    setHandleModelChange(handleModelChange) {
      this.props.handleModelChange = handleModelChange
    },

    setBehaviourOnRemoveControl(keepValueOnRemove) {
      this.props.keepValueOnRemove = keepValueOnRemove
    },
    // ON MOUNT FORM END

    registerFormControl(name, fieldLevelInitialValue, validators, isComponentPartOfArrayField) {
      const vm = this

      vm.addFormField(name)

      const setError = vm.createSetError(name)
      const setAsyncError = vm.createSetAsyncError(name)
      const setValue = vm.createSetValue(name, setError)
      const cleanFormValue = vm.createCleanFormValue(name)
      const validateOnReinitialize = vm.createValidateOnReinitialize(name)
      const setTouched = vm.createSetTouched(name)
      const setDirty = vm.createSetDirty(name)

      const formLevelInitialValue = get(vm.props.initialValues, name)
      const value = !isNil(formLevelInitialValue) ? formLevelInitialValue : fieldLevelInitialValue

      if (!has(vm.state, name)) {
        setValue(validators)(value)
      } else {
        setError(validators)()
      }

      return {
        setError,
        setAsyncError,
        cleanFormValue,
        validateOnReinitialize,
        setTouched,
        setDirty,
        isComponentPartOfArrayField,
        asyncValidations: vm.asyncValidations,
        useState: syncValidators => {
          const isFieldTouched = vm.touchedFields[name]
          const isFieldDirty = vm.dirtyFields[name]

          return [
            // Current value
            get(vm.state, name),

            // Value handler — setValue
            setValue(syncValidators, setDirty),

            // Current error
            isFieldTouched && isFieldDirty && vm.allErrors[name],

            // Touched indicator
            isFieldTouched,

            // Initial value
            get(vm.props.initialValues, name),
          ]
        },
      }
    },

    addFormField(name) {
      this.formFields = union(this.formFields, [name])
      this.removedFields = without(this.removedFields, name)
    },

    removeFormField(name) {
      this.formFields = without(this.formFields, name)
      this.removedFields = this.removedFields.concat(name)

      if (!this.props.keepValueOnRemove) {
        this.$delete(this.state, name)
      }

      this.removeFormFieldErrors(name)
    },

    removeFormFieldErrors(name) {
      // Control Level
      this.$delete(this.syncErrors, name)
      this.$delete(this.asyncErrors, name)
      this.$delete(this.touchedFields, name)
      this.$delete(this.dirtyFields, name)

      // Form Level
      this.form.dirty = Boolean(Object.keys(this.dirtyFields).length)
    },

    addFormSyncErrors(syncErrors) {
      // Let's try use Form Level Sync errors as base
      // And override them with existing sync errors
      this.syncErrors = merge({}, syncErrors, this.syncErrors)
    },

    createSetError(name) {
      const vm = this

      return validators => (nextValue = get(vm.state, name)) => {
        if (validators) {
          const error = validate(validators, nextValue, name)
          const method = error ? vm.$set : vm.$delete

          method(vm.syncErrors, name, error)
        }
      }
    },

    createSetAsyncError(name) {
      const vm = this

      const on = {
        success: () => vm.$delete(vm.asyncErrors, name),
        error: error => vm.$set(vm.asyncErrors, name, error),
      }

      return asyncValidators => (nextValue = get(vm.state, name)) => {
        if (!vm.syncErrors[name] && asyncValidators) {
          const promise = asyncValidate(asyncValidators, nextValue, name)
          const off = vm.manageValidatingState(name, promise)

          promise
            .then(on.success)
            .catch(on.error)
            .then(off)

          return promise
        }

        return Promise.resolve()
      }
    },

    createSetValue(name, setError) {
      const vm = this

      return (validators, setDirty) => nextValue => {
        const useLodashSet = /[[]/.test(name)

        if (!useLodashSet) {
          vm.$set(vm.state, name, nextValue)
        } else {
          vm.state = merge({}, set(vm.state, name, nextValue))
        }

        // When control value changes we need to clean async errors
        if (vm.asyncErrors[name]) {
          vm.$delete(vm.asyncErrors, name)
        }

        if (isFunction(vm.props.handleModelChange)) {
          vm.props.handleModelChange(vm.state)
        }

        // setDirty passed only for setValue for Control
        if (setDirty) {
          setDirty()
        }

        setError(validators)(nextValue)
      }
    },

    createCleanFormValue(name) {
      const vm = this

      return () => {
        vm.removeFormField(name)
      }
    },

    createSetTouched(name) {
      const vm = this

      return () => {
        vm.$set(vm.touchedFields, name, true)
      }
    },

    createSetDirty(name) {
      const vm = this

      return () => {
        vm.$set(vm.dirtyFields, name, true)
        vm.$set(this.form, 'dirty', true)
      }
    },

    createValidateOnReinitialize() {
      const vm = this

      return callback => {
        vm.$on(CONSTANTS.VUE_FORM_REINITIALIZE, callback)

        return () => vm.$off(CONSTANTS.VUE_FORM_REINITIALIZE, callback)
      }
    },

    manageValidatingState(name, promise) {
      const vm = this

      vm.form.validating = true
      vm.$set(vm.asyncValidations, name, promise)

      return () => {
        vm.form.validating = false
        vm.$delete(vm.asyncValidations, name)
      }
    },

    manageSubmittingState() {
      const vm = this

      vm.form.submitting = true

      return () => {
        vm.form.submitting = false
      }
    },

    manageTouchedFieldsState() {
      const fields = this.formFields.reduce((memo, name) => ({ ...memo, [name]: true }), {})

      this.touchedFields = fields
      this.dirtyFields = fields
    },

    resetValues() {
      this.reinitializeValues(this.props.initialValues)
      this.props.handleModelChange(this.props.initialValues)
    },

    reinitializeValues(nextInitialValues) {
      this.setInitialValues(nextInitialValues)

      this.state = mapValues(this.state, (value, name) => {
        const initialValue = nextInitialValues[name]

        this.removeFormFieldErrors(name)

        if (!isNil(initialValue)) {
          return Array.isArray(initialValue) ? cloneDeep(initialValue) : initialValue
        }

        // Array that does not have formLevel value
        // Do not reset it state to empty array
        if (Array.isArray(value)) {
          return value
        }

        return undefined
      })

      this.$emit(CONSTANTS.VUE_FORM_REINITIALIZE, this.state)
    },

    creatDetached(initialValues) {
      return new Vue(VueFormStoreParams).setInitialValues(initialValues).registerFormControl
    },
  },
}

export default new Vue(VueFormStoreParams)
