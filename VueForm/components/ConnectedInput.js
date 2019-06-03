import Input from 'element-ui/lib/input'
import noop from 'lodash/noop'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedInput = {
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
      default: 'new-password',
    },
    readonly: Boolean,
    max: Number,
    min: Number,
    step: Number,
    resize: String,
    autofocus: Boolean,
    form: String,
    tabindex: Number,
    append: [String, Number, Boolean],
    prepend: [String, Number, Boolean],

    validators: Array,
    asyncValidators: Array,

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

    /* FormItem Props */
    label: [String, Boolean],
    formItem: Boolean,
    labelWidth: String,
    required: Boolean,

    /* Detached Store Props */
    detached: {
      type: Boolean,
      default: false,
    },
    initialValues: Object,
  },

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
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
          disabled={this.isFieldDisabled}
          size={this.controlSize}
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
          tabindex={this.tabindex}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}>
          {Boolean(this.append) && <template slot="append">{this.append}</template>}
          {Boolean(this.prepend) && <template slot="prepend">{this.prepend}</template>}
        </Input>
      )
    },
  },
}

export default ConnectedInput
