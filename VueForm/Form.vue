<script>
import { isNil, isBoolean, has } from 'lodash'
import { Form, Button } from 'element-ui'
import CONSTANTS from './constants'

const BUTTONS_POSITION = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
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
      validate: value => Object.values(BUTTONS_POSITION).includes(value),
    },

    initialValues: {
      type: Object,
      default: () => ({}),
    },

    handleSubmit: {
      type: Function,
      required: true,
    },

    handleModelChange: Function,
    handleDisabled: Function,
    handleReset: Function,
  },

  data() {
    return {
      state: {},
      errors: {},
      form: {},
    }
  },

  computed: {
    isValid() {
      return !Object.values(this.errors).some(error => !isNil(error))
    },
  },

  methods: {
    // Should be called once
    [CONSTANTS.SECRET_VUE_FORM_METHOD](name, fieldLevelInitialValue, validate) {
      const vm = this

      const formLevelInitialValue = vm.initialValues[name]
      const value = !isNil(formLevelInitialValue) ? formLevelInitialValue : fieldLevelInitialValue

      const setError = nextValue => {
        const error = validate(nextValue, name)
        const method = error ? vm.$set : vm.$delete

        method(this.errors, name, error)
      }

      const setValue = nextValue => {
        vm.$set(this.state, name, nextValue)

        setError(nextValue)
      }

      if (!has(this.state, name)) {
        setValue(value)
      }

      const cleanFormValue = () => {
        vm.$delete(this.state, name)
        vm.$delete(this.errors, name)
      }

      if (this.handleModelChange) {
        this.handleModelChange({ ...this.state, [name]: value })
      }

      return {
        cleanFormValue,
        setError,
        useState: () => [this.state[name], setValue, this.errors[name]],
      }
    },

    nativeOnSubmit(event) {
      event.preventDefault()

      // If Invalid
      // There is no SAVE BUTTON
      // There is a handleDisabled handler
      if (!this.isValid && !this.save && this.handleDisabled) {
        return this.handleDisabled(this.errors)
      }

      return this.handleSubmit({ ...this.initialValues, ...this.state })
    },

    nativeOnReset(event) {
      event.preventDefault()

      const vm = this

      Object.entries(this.state).forEach(([key, value]) => {
        const initialValue = this.initialValues[key]

        vm.$set(this.state, key, initialValue || Array.isArray(value) ? [] : '')
        vm.$set(this.errors, key, null)
      })

      if (this.handleReset) {
        this.handleReset(this.initialValues)
      }
    },
  },

  render() {
    const className = [
      this.class, {
        'is-vue-form-error': !this.isValid && !this.save,
        'is-vue-form-warn': !this.isValid && this.save,
      },
    ]

    const buttons = {
      reset: isBoolean(this.reset) ? 'Reset' : this.reset,
      save: isBoolean(this.save) ? 'Save' : this.save,
      submit: isBoolean(this.submit) ? 'Submit' : this.submit,
    }

    const buttonsClassName = [
      'buttons', {
        buttons_center: this.buttonsPosition === BUTTONS_POSITION.CENTER,
        buttons_end: this.buttonsPosition === BUTTONS_POSITION.END,
      },
    ]

    return (
      <Form
        class={className}
        label-width={this.labelWidth}
        label-suffix={this.labelSuffix}
        label-position={this.labelPosition}
        nativeOnSubmit={this.nativeOnSubmit}
        nativeOnReset={this.nativeOnReset}>
        {this.$slots.default}
        <div class={buttonsClassName}>
          {this.reset && <Button nativeType="reset">{buttons.reset}</Button>}
          {this.save && (
            <Button nativeType="submit" type="primary">
              {buttons.save}
            </Button>
          )}
          {this.submit && (
            <Button type="danger" on-click={this.nativeOnSubmit}>{buttons.submit}</Button>
          )}
        </div>
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
