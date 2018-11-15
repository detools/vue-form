import { Input } from 'element-ui'
import noop from 'lodash/noop'
import resolveRegisterFormComponent from './resolveRegisterFormComponent'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    type: String,
    value: [String, Number],
    maxlength: Number,
    minLength: Number,
    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    size: String,
    prefixIcon: String,
    suffixIcon: String,
    rows: Number,
    autosize: Boolean,
    autocomplete: {
      type: String,

      // Autocomplete === 'off' does not work in Chrome
      default: () => 'nope',
    },
    readonly: Boolean,
    max: Number,
    min: Number,
    step: Number,
    resize: String,
    autofocus: Boolean,
    form: String,
    label: String,
    tabindex: Number,

    validate: {
      type: Function,
      default: noop,
    },

    handleFocus: {
      type: Function,
      default: noop,
    },

    handleBlur: {
      type: Function,
      default: noop,
    },

    handleChange: {
      type: Function,
      default: noop,
    },
  },

  data() {
    const $registerFormComponent = resolveRegisterFormComponent(this)

    return $registerFormComponent(this.name, this.value, this.validate)
  },

  destroyed() {
    this.cleanFormValue()
  },

  render() {
    const [value, setValue] = this.useState()

    return (
      <Input
        class={this.class}
        name={this.name}
        type={this.type}
        value={value}
        maxlength={this.maxlength}
        minLength={this.minLength}
        placeholder={this.placeholder}
        clearable={this.clearable}
        disabled={this.disabled}
        size={this.size}
        prefix-icon={this.prefixIcon}
        suffix-icon={this.suffixIcon}
        rows={this.rows}
        autosize={this.autosize}
        autocomplete={this.autocomplete}
        readonly={this.readonly}
        max={this.max}
        min={this.min}
        step={this.step}
        resize={this.resize}
        autofocus={this.autofocus}
        form={this.form}
        label={this.label}
        tabindex={this.tabindex}
        on-input={setValue}
        on-focus={this.handleFocus}
        on-blur={this.handleBlur}
        on-change={this.handleChange}>
        {Boolean(this.append) && <template slot="append">{this.append}</template>}
        {Boolean(this.prepend) && <template slot="prepend">{this.prepend}</template>}
      </Input>
    )
  },
}
