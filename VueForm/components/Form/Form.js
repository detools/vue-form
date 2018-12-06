import { isNil, isBoolean, isEmpty, has, mapValues, union, merge, without, omit } from 'lodash'
import { Form, Button } from 'element-ui'
import CONSTANTS from '../../constants'
import { validate, asyncValidate } from '../../validators/validate'
import isValid from '../../utils/isValid'
import FormItem from '../ConnectedFormItem'
import Notification from '../Notification'
import props, { BUTTONS_POSITION } from './props'
import styles from './styles'

export default {
  props,

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
    }
  },

  mounted() {
    this.defaultInitialValues = this.initialValues
  },

  updated() {
    if (this.defaultInitialValues !== this.initialValues) {
      this.defaultInitialValues = this.initialValues
      this.reinitializeValues(this.initialValues)
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

    isSubmitButtonDisabled() {
      return this.isDisabled || !this.isValid
    },

    submitButtonType() {
      return this.save ? 'danger' : 'primary'
    },

    buttons() {
      return {
        reset: isBoolean(this.reset) ? 'Reset' : this.reset,
        save: isBoolean(this.save) ? 'Save' : this.save,
        submit: isBoolean(this.submit) ? 'Submit' : this.submit,
      }
    },

    buttonsStyles() {
      const overridingStyles = {
        [BUTTONS_POSITION.CENTER]: styles.buttons_center,
        [BUTTONS_POSITION.END]: styles.buttons_end,
      }

      return [styles.buttons, overridingStyles[this.buttonsPosition]]
    },
  },

  methods: {
    // Should be called once
    [CONSTANTS.SECRET_VUE_FORM_METHOD](name, fieldLevelInitialValue, validators, asyncValidators) {
      const vm = this

      this.formFields = union(this.formFields, [name])
      this.removedFields = without(this.removedFields, name)

      const formLevelInitialValue = vm.initialValues[name]
      const value = !isNil(formLevelInitialValue) ? formLevelInitialValue : fieldLevelInitialValue

      const setError = nextValue => {
        if (validators) {
          const error = validate(validators, nextValue, name)
          const method = error ? vm.$set : vm.$delete

          method(vm.syncErrors, name, error)
        }
      }

      const on = {
        success: () => vm.$delete(vm.asyncErrors, name),
        error: error => vm.$set(vm.asyncErrors, name, error),
      }

      const setAsyncError = () => {
        if (!this.syncErrors[name] && asyncValidators) {
          const promise = asyncValidate(asyncValidators, this.state[name], name)
          const off = this.manageValidatingState(name, promise)

          promise
            .then(on.success)
            .catch(on.error)
            .then(off)

          return promise
        }

        return Promise.resolve()
      }

      const setValue = nextValue => {
        vm.$set(this.state, name, nextValue)

        // When control value changes we need to clean async errors
        if (this.asyncErrors[name]) {
          vm.$delete(this.asyncErrors, name)
        }

        if (this.handleModelChange) {
          this.handleModelChange(this.state)
        }

        setError(nextValue)
      }

      if (!has(this.state, name)) {
        setValue(value)
      }

      const cleanFormValue = () => {
        vm.$delete(this.state, name)
        vm.$delete(this.syncErrors, name)
        vm.$delete(this.asyncErrors, name)
        vm.$delete(this.touchedFields, name)

        this.removedFields = this.removedFields.concat(name)
      }

      const setTouched = () => {
        vm.$set(this.touchedFields, name, true)
      }

      return {
        cleanFormValue,
        setError,
        setAsyncError,
        setTouched,
        useState: () => {
          const isFieldTouched = vm.touchedFields[name]

          return [
            vm.state[name],
            setValue,
            isFieldTouched && (vm.syncErrors[name] || vm.asyncErrors[name]),
            isFieldTouched,
          ]
        },
      }
    },

    manageValidatingState(name, promise) {
      this.form.validating = true
      this.$set(this.asyncValidations, name, promise)

      return () => {
        this.form.validating = false
        this.$delete(this.asyncValidations, name)
      }
    },

    manageSubmittingState() {
      this.form.submitting = true

      return () => {
        this.form.submitting = false
      }
    },

    manageTouchedFieldsState() {
      this.touchedFields = this.formFields.reduce((memo, name) => ({ ...memo, [name]: true }), {})
    },

    handleFormDisabled(errors) {
      this.handleDisabled(errors || { ...this.syncErrors, ...this.asyncErrors })
    },

    nativeOnSubmit(event) {
      event.preventDefault()

      // Just do not anything some form process in progress
      if (this.form.submitting) {
        return false
      }

      const isSubmitButtonClick = event.type === 'click'

      this.manageTouchedFieldsState()

      // Form Level Sync Validate
      if (this.validate) {
        const syncErrors = this.validate(this.state)

        if (!isEmpty(syncErrors)) {
          this.syncErrors = syncErrors

          return this.handleFormDisabled(syncErrors)
        }

        this.syncErrors = {}
      }

      if (!this.isValid && isSubmitButtonClick) {
        return this.handleFormDisabled()
      }

      const messages = this.messages || {}

      const off = this.manageSubmittingState()
      const submitForm = () =>
        Promise.resolve(
          this.handleSubmit(merge({}, omit(this.initialValues, this.removedFields), this.state))
        )

      const submitPromise = this.form.validating
        ? Promise.all(Object.values(this.asyncValidations)).then(submitForm)
        : submitForm()

      // Just subscribe to promise, do not catch errors
      submitPromise
        .then(
          () => Notification.success(messages.success),
          () => {
            Notification.error(messages.error)

            this.handleFormDisabled()
          }
        )
        .then(off)

      return submitPromise
    },

    nativeOnReset(event) {
      event.preventDefault()

      Object.entries(this.state).forEach(([key, value]) => {
        const initialValue = this.initialValues[key]

        this.$set(this.state, key, initialValue || (Array.isArray(value) ? [] : ''))
        this.$delete(this.syncErrors, key)
        this.$delete(this.asyncErrors, key)
        this.$delete(this.touchedFields, key)
      })

      if (this.handleReset) {
        this.handleReset(this.initialValues)
      }
    },

    reinitializeValues(updatedInitialValues) {
      this.state = mapValues(this.state, (value, key) => {
        if (!isNil(updatedInitialValues[key])) {
          return updatedInitialValues[key]
        }

        return Array.isArray(value) ? [] : undefined
      })
      this.syncErrors = {}
      this.asyncErrors = {}
      this.touchedFields = {}
    },

    renderPlainButtons() {
      return (
        <div style={this.buttonsStyles}>
          {this.reset && (
            <Button nativeType="reset" disabled={this.isDisabled}>
              {this.buttons.reset}
            </Button>
          )}
          {this.save && (
            <Button nativeType="submit" type="primary" disabled={this.isDisabled}>
              {this.buttons.save}
            </Button>
          )}
          {this.submit && (
            <Button
              class={[
                `el-button--${this.submitButtonType}`,
                {
                  'is-disabled': this.isSubmitButtonDisabled,
                },
              ]}
              type={this.submitButtonType}
              nativeType={!this.save ? 'submit' : undefined}
              on-click={this.nativeOnSubmit}>
              {this.buttons.submit}
            </Button>
          )}
        </div>
      )
    },

    renderButtons() {
      if (this.buttonsPosition === BUTTONS_POSITION.LABEL) {
        return <FormItem>{this.renderPlainButtons()}</FormItem>
      }

      return this.renderPlainButtons()
    },
  },

  render() {
    return (
      <Form
        novalidate
        label-width={this.labelWidth}
        label-suffix={this.labelSuffix}
        label-position={this.labelPosition}
        nativeOnSubmit={this.nativeOnSubmit}
        nativeOnReset={this.nativeOnReset}>
        {this.$slots.default}
        {this.renderButtons()}
      </Form>
    )
  },
}
