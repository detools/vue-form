import { Select, Option } from 'element-ui'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
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
      default: 'off',
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
    label: String,
    formItem: Boolean,
    labelWidth: String,
  },

  mixins: [ConnectedSelectMixin],

  methods: {
    generateOptions(option) {
      let { [this.valueKey]: optionValue, [this.labelKey]: optionLabel } = option

      if (isNil(optionLabel)) {
        optionValue = option
        optionLabel = option
      }

      return <Option key={optionValue} label={optionLabel} value={optionValue} />
    },

    renderComponent(value, setValue) {
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
}

export default ConnectedSelect
