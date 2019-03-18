import Select from 'element-ui/lib/select'
import Option from 'element-ui/lib/option'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import { ConnectedSelectMixin } from '../mixins/ConnectedControl'

const ConnectedSelect = {
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
      type: [String, Function],
      default: 'id',
    },

    labelKey: {
      type: [String, Function],
      default: 'name',
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    autocomplete: {
      type: String,
      default: 'new-password',
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
    defaultFirstOption: Boolean,
    popperAppendToBody: Boolean,
    automaticDropdown: Boolean,

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
  },

  mixins: [ConnectedSelectMixin],

  methods: {
    generateOptions(option) {
      const { valueKey, labelKey } = this

      let { [valueKey]: optionValue, [labelKey]: optionLabel } = option

      if (isFunction(valueKey)) {
        optionValue = valueKey(option)
      }

      if (isFunction(labelKey)) {
        optionLabel = labelKey(option)
      }

      if (isNil(optionLabel)) {
        optionValue = option
        optionLabel = option
      }

      return <Option key={optionValue} label={optionLabel} value={optionValue} />
    },

    handleFieldBlur(...args) {
      this.handleBlur(...args)

      return this.setAsyncError(this.asyncValidators)()
    },

    renderComponent(value, setValue) {
      const defaultFirstOption = Boolean(this.defaultFirstOption || this.filterable || this.remote)

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
          default-first-option={defaultFirstOption}
          popper-append-to-body={this.popperAppendToBody}
          automatic-dropdown={this.automaticDropdown}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}>
          {this.options.map(this.generateOptions)}
        </Select>
      )
    },
  },
}

export default ConnectedSelect
