<script>
import { isNil, isBoolean, isEmpty, has, mapValues, noop } from 'lodash'
import { Form, Button } from 'element-ui'
import FormItem from './ConnectedFormItem'
import Notification from './Notification'
import CONSTANTS from './constants'
import { validate, asyncValidate } from './validators/validate'
import isValid from './utils/isValid'

const BUTTONS_POSITION = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  LABEL: 'label',
}

export default {
  props: {
    reset: [String, Boolean],
    save: [String, Boolean],
    submit: [String, Boolean],

    labelWidth: String,
    labelSuffix: String,
    labelPosition: String,

    buttonsPosition: {
      type: String,
      default: () => 'start',
      validator: value => Object.values(BUTTONS_POSITION).includes(value),
    },

    initialValues: {
      type: Object,
      default: () => ({}),
    },

    messages: Object,

    handleSubmit: {
      type: Function,
      default: noop,
    },
    handleModelChange: Function,
    handleDisabled: Function,
    handleReset: Function,

    validate: Function,
    asyncValidate: Function,
    asyncBlurFields: Array,
  },

  data() {
    return {
      state: {},
      syncErrors: {},
      asyncErrors: {},
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

    buttonsClassName() {
      return [
        'buttons', {
          buttons_center: this.buttonsPosition === BUTTONS_POSITION.CENTER,
          buttons_end: this.buttonsPosition === BUTTONS_POSITION.END,
        },
      ]
    },
  },

  methods: {
    // Should be called once
    [CONSTANTS.SECRET_VUE_FORM_METHOD](name, fieldLevelInitialValue, validators, asyncValidators) {
      const vm = this

      const formLevelInitialValue = vm.initialValues[name]
      const value = !isNil(formLevelInitialValue) ? formLevelInitialValue : fieldLevelInitialValue

      const setError = nextValue => {
        if (validators) {
          const offValidating = this.manageValidatingState()
          const error = validate(validators, nextValue, name)
          offValidating()

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
          const offValidating = this.manageValidatingState()

          return asyncValidate(asyncValidators, this.state[name], name)
            .then(on.success)
            .catch(on.error)
            .then(offValidating)
        }

        return Promise.resolve()
      }

      const setValue = nextValue => {
        vm.$set(this.state, name, nextValue)

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
      }

      return {
        cleanFormValue,
        setError,
        setAsyncError,
        useState: () => [
          this.state[name],
          setValue,
          this.syncErrors[name] || this.asyncErrors[name],
        ],
      }
    },

    manageValidatingState() {
      this.form.validating = true

      return () => {
        this.form.validating = false
      }
    },

    manageSubmittingState() {
      this.form.submitting = true

      return () => {
        this.form.submitting = false
      }
    },

    nativeOnSubmit(event) {
      event.preventDefault()

      if (this.validate) {
        const syncErrors = this.validate(this.state)

        if (!isEmpty(syncErrors)) {
          this.syncErrors = syncErrors
          return false
        }

        this.syncErrors = {}
      }

      // If Invalid
      // There is no SAVE BUTTON
      // There is a handleDisabled handler
      if (!this.isValid && !this.save && this.handleDisabled) {
        return this.handleDisabled({ ...this.syncErrors, ...this.asyncErrors })
      }

      const messages = this.messages || {}
      const off = this.manageSubmittingState()
      const submitPromise = Promise.resolve(
        this.handleSubmit({ ...this.initialValues, ...this.state })
      )

      // Just subscribe to promise, do not catch errors
      submitPromise.then(
        () => Notification.success(messages.success),
        () => Notification.error(messages.error)
      ).then(off)

      return submitPromise
    },

    nativeOnReset(event) {
      event.preventDefault()

      const vm = this

      Object.entries(this.state).forEach(([key, value]) => {
        const initialValue = this.initialValues[key]

        vm.$set(this.state, key, initialValue || (Array.isArray(value) ? [] : ''))
        vm.$delete(this.syncErrors, key)
        vm.$delete(this.asyncErrors, key)
      })

      if (this.handleReset) {
        this.handleReset(this.initialValues)
      }
    },

    reinitializeValues(updatedInitialValues) {
      this.state = mapValues(this.state, (value, key) => updatedInitialValues[key])
      this.syncErrors = {}
      this.asyncErrors = {}
    },

    renderPlainButtons() {
      return (
        <div class={this.buttonsClassName}>
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
              class={[`el-button--${this.submitButtonType}`, {
                'is-disabled': this.isSubmitButtonDisabled,
              }]}
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
        return (
          <FormItem>
            {this.renderPlainButtons()}
          </FormItem>
        )
      }

      return this.renderPlainButtons()
    },
  },

  render() {
    const className = [
      this.class, {
        'is-vue-form-error': !this.isValid && !this.save,
        'is-vue-form-warn': !this.isValid && this.save,
      },
    ]

    return (
      <Form
        novalidate
        class={className}
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
</script>

<style scoped lang="less">
  .buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: flex-start;
    align-items: flex-start;

    &_center {
      justify-content: center;
    }

    &_end {
      justify-content: flex-end;
    }
  }
</style>
