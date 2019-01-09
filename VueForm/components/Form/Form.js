import Vue from 'vue'
import { isBoolean, isEmpty, isEqual, merge, omit } from 'lodash'
import { Form, Button } from 'element-ui'
import CONSTANTS from '../../constants'
import { VueFormStoreParams } from '../../store'
import FormItem from '../ConnectedFormItem'
import Notification from '../Notification'
import Popover from '../Popover'
import props, { BUTTONS_POSITION } from './props'
import styles from './styles'

export default {
  props,

  beforeMount() {
    this.store = new Vue(VueFormStoreParams)

    this.store.setInitialValues(this.initialValues)
    this.store.setHandleModelChange(this.handleModelChange)
  },

  watch: {
    initialValues(initialValues, prevInitialValues) {
      if (!isEqual(initialValues, prevInitialValues)) {
        this.store.reinitializeValues(initialValues)
        this.handleModelChange(this.store.state)
      }
    },
  },

  computed: {
    isSubmitButtonDisabled() {
      return this.store.isDisabled || !this.store.isValid
    },

    submitButtonType() {
      return this.save ? 'danger' : 'primary'
    },

    buttons() {
      return {
        reset: isBoolean(this.cancel) ? 'Cancel' : this.cancel,
        save: isBoolean(this.save) ? 'Save' : this.save,
        submit: isBoolean(this.submit) ? 'Submit' : this.submit,
      }
    },

    vueFormButtonsStyles() {
      const overridingStyles = {
        [BUTTONS_POSITION.CENTER]: styles.buttons_center,
        [BUTTONS_POSITION.END]: styles.buttons_end,
      }

      return [
        styles.buttons,
        overridingStyles[this.buttonsPosition],
        this.buttonsSticky && styles.buttons_container_sticky,
        this.buttonsStyles,
      ]
    },
  },

  methods: {
    // Should be called once
    [CONSTANTS.SECRET_VUE_FORM_METHOD](...args) {
      return this.store.registerFormControl(...args)
    },

    handleFormDisabled(errors) {
      this.handleDisabled(errors || this.store.allErrors)
    },

    nativeOnSubmit(event, isConfirmSubmit) {
      event.preventDefault()

      // Just don't do anything — some form process in progress
      if (this.store.form.submitting) {
        return false
      }

      const isSubmitButtonClick = event.type === 'click'
      const submitHandler =
        !isSubmitButtonClick && this.handleSave ? this.handleSave : this.handleSubmit

      this.store.manageTouchedFieldsState()

      // Form Level Sync Validate
      if (this.validate) {
        const syncErrors = this.validate(this.store.state)

        if (!isEmpty(syncErrors)) {
          this.store.addFormSyncErrors(syncErrors)

          return this.handleFormDisabled(syncErrors)
        }
      }

      if (!this.store.isValid && isSubmitButtonClick) {
        return this.handleFormDisabled()
      }

      if (!isConfirmSubmit && isSubmitButtonClick && this.confirmMessage) {
        return this.$refs.confirmPopover.show()
      }

      const messages = this.messages || {}

      const off = this.store.manageSubmittingState()
      const submitForm = () =>
        Promise.resolve(
          submitHandler(
            merge({}, omit(this.initialValues, this.store.removedFields), this.store.state)
          )
        )

      const submitPromise = this.store.form.validating
        ? Promise.all(Object.values(this.store.asyncValidations)).then(submitForm)
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

      this.store.resetValues()

      if (this.handleCancel) {
        this.handleCancel(this.initialValues)
      }
    },

    renderPlainSubmitButton() {
      return (
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
      )
    },

    renderSubmitButton() {
      if (!this.submit) {
        return null
      }

      if (this.confirmMessage) {
        return (
          <Popover
            ref="confirmPopover"
            message={this.confirmMessage}
            cancel={this.confirmNo}
            confirm={this.confirmYes}
            width={this.confirmWidth}
            placement={this.confirmPlacement}
            trigger={this.confirmTrigger}
            handleConfirm={this.nativeOnSubmit}
            style={this.cancel || this.save ? 'margin-left: 10px' : undefined}>
            {this.renderPlainSubmitButton()}
          </Popover>
        )
      }

      return this.renderPlainSubmitButton()
    },

    renderPlainButtons() {
      const extraButtons = this.renderExtraButtons && this.renderExtraButtons()

      return (
        <div style={this.vueFormButtonsStyles} class={this.buttonsClassName}>
          {this.cancel && (
            <Button nativeType="reset" disabled={this.store.isDisabled}>
              {this.buttons.reset}
            </Button>
          )}
          {extraButtons && <div style="margin-left: 10px; margin-right: 10px">{extraButtons}</div>}
          {this.save && (
            <Button nativeType="submit" type="primary" disabled={this.store.isDisabled}>
              {this.buttons.save}
            </Button>
          )}
          {this.renderSubmitButton()}
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

  beforeDestroy() {
    this.store.$destroy()
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
        {this.buttonsSticky && <div style={styles.sticky_placeholder} />}
      </Form>
    )
  },
}
