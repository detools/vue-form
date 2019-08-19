import Vue from 'vue'
import { isBoolean, isEqual } from 'lodash'
import Form from 'element-ui/lib/form'
import CONSTANTS from '../../constants'
import { VueFormStoreParams } from '../../store'
import props, { BUTTONS_POSITION } from './props'
import submitHandler from './submitHandler'
import handleFocusToInvalidField from './handleFocusToInvalidField'
import styles from './styles'
import FormItem from '../ConnectedFormItem'
import Button from '../Button'
import Popover from '../Popover'

export default {
  props,

  beforeMount() {
    this.store = new Vue(VueFormStoreParams)

    this.store.setInitialValues(this.initialValues)
    this.store.setHandleModelChange(this.handleModelChange)
    this.store.setBehaviourOnRemoveControl(this.keepValueOnRemove)
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
      if (this.save) {
        return this.allButtonsDisabled
      }

      return (
        this.store.isDisabled || this.store.isPristine || !this.store.isValid || !!this.disabled
      )
    },

    allButtonsDisabled() {
      const { submitting, validating } = this.store.form

      return submitting || validating
    },

    submitButtonType() {
      return this.save ? 'danger' : 'primary'
    },

    submitButtonClassName() {
      return [`el-button--${this.submitButtonType}`, { 'is-disabled': this.isSubmitButtonDisabled }]
    },

    buttons() {
      return {
        reset: isBoolean(this.cancel) ? 'Cancel' : this.cancel,
        save: isBoolean(this.save) ? 'Save' : this.save,
        submit: isBoolean(this.submit) ? 'Submit' : this.submit,
      }
    },

    extraButtons() {
      if (!this.renderExtraButtons) {
        return null
      }

      return (
        <div style="margin-left: 10px; margin-right: 10px">
          {this.renderExtraButtons(this.allButtonsDisabled)}
        </div>
      )
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

    handleModelChange(values) {
      this.$emit('input', values)
    },

    handleFormDisabled(errors) {
      this.handleDisabled(errors || this.store.allErrors)
    },

    nativeOnSubmit(event, isConfirmSubmit) {
      return submitHandler({
        handleSave: this.handleSave,
        handleSubmit: this.handleSubmit,
        disabled: this.disabled,
        validate: this.validate,
        handleFocusToInvalidField: this.handleFocusToInvalidField,
        handleFormDisabled: this.handleFormDisabled,
        initialValues: this.initialValues,
        confirmMessage: this.confirmMessage,
        confirmHandler: this.confirmHandler,
        confirmPopoverRef: this.$refs.confirmPopover,
        isSubmitButtonDisabled: this.isSubmitButtonDisabled,
        messages: this.messages,
        store: this.store,
      })(event, isConfirmSubmit)
    },

    nativeOnReset(event) {
      event.preventDefault()

      this.store.resetValues()

      if (this.handleCancel) {
        this.handleCancel(this.initialValues)
      }
    },

    handleFocusToInvalidField(passedElementId) {
      return handleFocusToInvalidField({ store: this.store, formRef: this.$refs.vueFormNode })(
        passedElementId
      )
    },

    renderPlainSubmitButton() {
      return (
        <Button
          class={this.submitButtonClassName}
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
      return (
        <div style={this.vueFormButtonsStyles} class={this.buttonsClassName}>
          {this.cancel && (
            <Button nativeType="reset" disabled={this.allButtonsDisabled}>
              {this.buttons.reset}
            </Button>
          )}
          {this.extraButtons}
          {this.save && (
            <Button nativeType="submit" type="primary" disabled={this.allButtonsDisabled}>
              {this.buttons.save}
            </Button>
          )}
          {this.renderSubmitButton()}
        </div>
      )
    },

    renderButtons() {
      if (this.buttonsPosition === BUTTONS_POSITION.LABEL) {
        return <FormItem style="margin-bottom: 0">{this.renderPlainButtons()}</FormItem>
      }

      return this.renderPlainButtons()
    },

    renderFormContent() {
      if (this.$slots.default) {
        return this.$slots.default
      }

      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default({
          allButtonsDisabled: this.allButtonsDisabled,
          isSubmitButtonDisabled: this.isSubmitButtonDisabled,
          submitButtonClassName: this.submitButtonClassName,
          submitting: this.store.form.submitting,
          validating: this.store.form.validating,
          dirty: this.store.form.dirty,
          handleSubmit: this.nativeOnSubmit,
          handleCancel: this.nativeOnReset,
        })
      }

      return null
    },
  },

  beforeDestroy() {
    this.store.$destroy()
  },

  render() {
    return (
      <Form
        novalidate
        ref="vueFormNode"
        label-width={this.labelWidth}
        label-suffix={this.labelSuffix}
        label-position={this.labelPosition}
        status-icon={this.statusIcon}
        nativeOnSubmit={this.nativeOnSubmit}
        nativeOnReset={this.nativeOnReset}>
        {this.renderFormContent()}
        {this.renderButtons()}
        {this.buttonsSticky && <div style={styles.sticky_placeholder} />}
      </Form>
    )
  },
}
