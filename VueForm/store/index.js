import Vue from 'vue'
import { union, without, has, isNil, noop, isFunction, mapValues, merge } from 'lodash'
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

      form: {
        submitting: false,
        validating: false,
      },

      props: {
        // { [fieldName]: Any }
        initialValues: {},

        handleModelChange: noop,
      },
    }
  },

  computed: {
    isValid() {
      return isValid([this.syncErrors, this.asyncErrors])
    },

    isDisabled() {
      const { submitting, validating } = this.form

      return submitting || validating
    },

    allErrors() {
      return merge({}, this.syncErrors, this.asyncErrors)
    },
  },

  methods: {
    // ON MOUNT FORM START
    setInitialValues(initialValues) {
      this.props.initialValues = initialValues
    },

    setHandleModelChange(handleModelChange) {
      this.props.handleModelChange = handleModelChange
    },
    // ON MOUNT FORM END

    registerFormControl(name, fieldLevelInitialValue, validators) {
      const vm = this

      vm.addFormField(name)

      const setError = vm.createSetError(name)
      const setAsyncError = vm.createSetAsyncError(name)
      const setValue = vm.createSetValue(name, setError)
      const cleanFormValue = vm.createCleanFormValue(name)
      const validateOnReinitialize = vm.createValidateOnReinitialize(name)
      const setTouched = vm.createSetTouched(name)

      const formLevelInitialValue = vm.props.initialValues[name]
      const value = !isNil(formLevelInitialValue) ? formLevelInitialValue : fieldLevelInitialValue
      if (!has(vm.state, name)) {
        setValue(validators)(value)
      }

      return {
        setError,
        setAsyncError,
        cleanFormValue,
        validateOnReinitialize,
        setTouched,
        useState: syncValidators => {
          const isFieldTouched = vm.touchedFields[name]

          return [
            // Current value
            vm.state[name],

            // Value handler — setValue
            setValue(syncValidators),

            // Current error
            isFieldTouched && vm.allErrors[name],

            // Touched indicator
            isFieldTouched,

            // Initial value
            vm.props.initialValues[name],
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
      this.removeFormFieldErrors(name)
    },

    removeFormFieldErrors(name) {
      this.$delete(this.syncErrors, name)
      this.$delete(this.asyncErrors, name)
      this.$delete(this.touchedFields, name)
    },

    addFormSyncErrors(syncErrors) {
      // Let's try use Form Level Sync errors as base
      // And override them with existing sync errors
      this.syncErrors = merge({}, syncErrors, this.syncErrors)
    },

    createSetError(name) {
      const vm = this

      return validators => (nextValue = vm.state[name]) => {
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

      return asyncValidators => (nextValue = vm.state[name]) => {
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

      return validators => nextValue => {
        vm.$set(vm.state, name, nextValue)

        // When control value changes we need to clean async errors
        if (vm.asyncErrors[name]) {
          vm.$delete(vm.asyncErrors, name)
        }

        if (isFunction(vm.props.handleModelChange)) {
          vm.props.handleModelChange(vm.state)
        }

        setError(validators)(nextValue)
      }
    },

    createCleanFormValue(name) {
      const vm = this

      return () => {
        vm.$delete(vm.state, name)
        vm.removeFormFieldErrors(name)
        vm.removedFields = vm.removedFields.concat(name)
      }
    },

    createSetTouched(name) {
      const vm = this

      return () => {
        vm.$set(vm.touchedFields, name, true)
      }
    },

    createValidateOnReinitialize(name) {
      const vm = this

      return callback => {
        vm.$on(CONSTANTS.VUE_FORM_REINITIALIZE, () => {
          callback(vm.state[name])
        })
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
      this.touchedFields = this.formFields.reduce((memo, name) => ({ ...memo, [name]: true }), {})
    },

    resetValues() {
      this.reinitializeValues(this.props.initialValues)
    },

    reinitializeValues(nextInitialValues) {
      this.setInitialValues(nextInitialValues)

      this.state = mapValues(this.state, (value, name) => {
        const initialValue = nextInitialValues[name]

        this.removeFormFieldErrors(name)

        if (!isNil(initialValue)) {
          return initialValue
        }

        return Array.isArray(value) ? [] : undefined
      })

      this.$emit(CONSTANTS.VUE_FORM_REINITIALIZE, this.state)
    },
  },
}

export default new Vue(VueFormStoreParams)
