import { Autocomplete } from 'element-ui'
import noop from 'lodash/noop'
import isNull from 'lodash/isNull'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedAutocomplete = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number],
      default: '',
    },

    labelKey: {
      type: String,
      default: 'name',
    },

    valueKey: {
      type: String,
      default: 'id',
    },

    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    debounce: Number,
    placement: String,
    popperClass: String,
    triggerOnFocus: Boolean,
    selectWhenUnmatched: Boolean,
    prefixIcon: String,
    suffixIcon: String,
    hideLoading: Boolean,
    popperAppendToBody: Boolean,
    tabindex: Number,
    autofocus: Boolean,
    autosize: Boolean,
    autocomplete: {
      type: String,
      default: 'off',
    },
    size: String,

    validators: Array,
    asyncValidators: Array,

    fetchSuggestions: {
      type: Function,
      required: true,
    },

    handleFocus: {
      type: Function,
      default: noop,
    },

    handleBlur: {
      type: Function,
      default: noop,
    },

    handleSelect: {
      type: Function,
      default: noop,
    },

    /* FormItem Props */
    label: [String, Boolean],
    formItem: Boolean,
    labelWidth: String,
  },

  mixins: [ConnectedControlMixin],

  data() {
    return {
      viewValue: this.value,
    }
  },

  methods: {
    handleFieldSelect(value) {
      const nextValue = isNull(this.valueKey) ? value : value[this.valueKey]

      this.setTouched()
      this.handleSelect(nextValue)

      this.viewValue = isNull(this.labelKey) ? value : value[this.labelKey]

      const [, setValue] = this.state
      setValue(nextValue)
    },

    renderComponent() {
      return (
        <Autocomplete
          class={this.class}
          name={this.name}
          type={this.type}
          value={this.viewValue}
          placeholder={this.placeholder}
          clearable={this.clearable}
          disabled={this.disabled}
          value-key={this.labelKey}
          debounce={this.debounce}
          placement={this.placement}
          popper-class={this.popperClass}
          trigger-on-focus={this.triggerOnFocus}
          select-when-unmatched={this.selectWhenUnmatched}
          prefix-icon={this.prefixIcon}
          suffix-icon={this.suffixIcon}
          hide-loading={this.hideLoading}
          popper-append-to-body={this.popperAppendToBody}
          tabindex={this.tabindex}
          autofocus={this.autofocus}
          autosize={this.autosize}
          autocomplete={this.autocomplete}
          size={this.size}
          fetch-suggestions={this.fetchSuggestions}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-select={this.handleFieldSelect}>
          {Boolean(this.prefix) && <template slot="prefix">{this.prefix}</template>}
          {Boolean(this.suffix) && <template slot="suffix">{this.suffix}</template>}
          {Boolean(this.append) && <template slot="append">{this.append}</template>}
          {Boolean(this.prepend) && <template slot="prepend">{this.prepend}</template>}
        </Autocomplete>
      )
    },
  },
}

export default ConnectedAutocomplete
