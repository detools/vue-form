import { Select, Option } from 'element-ui'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import castArray from 'lodash/castArray'
import resolveRegisterFormComponent from './utils/resolveRegisterFormComponent'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    value: [Number, String, Array],

    valueKey: {
      type: String,
      default: () => 'id',
    },

    labelKey: {
      type: String,
      default: () => 'name',
    },

    multiple: {
      type: Boolean,
      default: () => false,
    },

    autocomplete: {
      type: String,

      // Autocomplete === 'off' does not work in Chrome
      default: () => 'nope',
    },

    disabled: Boolean,
    size: String,
    clearable: Boolean,
    collapseTags: Boolean,
    multipleLimit: Number,
    placeholder: String,
    filterable: Boolean,
    allowCreate: Boolean,
    filterMethod: Function,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    reserveKeyword: String,
    defaultFirstOption: [String, Number],
    popperAppendToBody: Boolean,
    automaticDropdown: Boolean,

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

    let initialValue = this.value
    if (this.multiple) {
      // If there is no defined "value" inside props — use an empty array
      if (isNil(initialValue)) {
        initialValue = []
      } else if (!Array.isArray(initialValue)) {
        // If there is a non-null value, but it is not an array — cast it to an array
        initialValue = castArray(initialValue)
      }
    }

    return $registerFormComponent(this.name, initialValue, this.validate)
  },

  destroyed() {
    this.cleanFormValue()
  },

  methods: {
    generateOptions(option) {
      let { [this.valueKey]: optionValue, [this.labelKey]: optionLabel } = option

      if (isNil(optionLabel)) {
        optionValue = option
        optionLabel = option
      }

      return <Option key={optionValue} label={optionLabel} value={optionValue} />
    },

    handleFieldBlur(...args) {
      this.touched = true

      this.handleBlur(...args)
    },

    renderSelect(value, setValue) {
      return (
        <Select
          class={this.class}
          name={this.name}
          value={value}
          multiple={this.multiple}
          disabled={this.disabled}
          value-key={this.valueKey}
          size={this.size}
          clearable={this.clearable}
          collapse-tags={this.collapseTags}
          multiple-limit={this.multipleLimit}
          autocomplete={this.autocomplete}
          placeholder={this.placeholder}
          filterable={this.filterable}
          allow-create={this.allowCreate}
          filter-method={this.filterMethod}
          remote={this.remote}
          remote-method={this.remoteMethod}
          loading={this.loading}
          loading-text={this.loadingText}
          no-match-text={this.noMatchText}
          no-data-text={this.noDataText}
          reserve-keyword={this.reserveKeyword}
          default-first-option={this.defaultFirstOption}
          popper-append-to-body={this.popperAppendToBody}
          automatic-dropdown={this.automaticDropdown}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleChange}>
          {this.options.map(this.generateOptions)}
        </Select>
      )
    },
  },

  render() {
    const [value, setValue, error] = this.useState()
    const fieldError = this.touched ? error : undefined

    if (this.formItem) {
      return (
        <FormItem label={this.label || this.name} label-width={this.labelWidth} error={fieldError}>
          {this.renderSelect(value, setValue)}
        </FormItem>
      )
    }

    return this.renderSelect(value, setValue)
  },
}
