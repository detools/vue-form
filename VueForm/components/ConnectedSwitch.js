import Switch from 'element-ui/lib/switch'
import noop from 'lodash/noop'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const ConnectedSwitch = {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Boolean,
      default: () => false,
    },

    disabled: Boolean,
    width: String,
    activeIconClass: String,
    inactiveIconClass: String,
    activeText: String,
    inactiveText: String,
    activeValue: [String, Number],
    inactiveValue: [String, Number],
    activeColor: String,
    inactiveColor: String,

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

  mixins: [ConnectedControlMixin],

  methods: {
    renderComponent(value, setValue) {
      return (
        <Switch
          class={this.class}
          name={this.name}
          value={value}
          disabled={this.isFieldDisabled}
          width={this.width}
          active-icon-class={this.activeIconClass}
          inactive-icon-class={this.inactiveIconClass}
          active-text={this.activeText}
          inactive-text={this.inactiveText}
          active-value={this.activeValue}
          inactive-value={this.inactiveValue}
          active-color={this.activeColor}
          inactive-color={this.inactiveColor}
          on-input={setValue}
          on-focus={this.handleFocus}
          on-blur={this.handleFieldBlur}
          on-change={this.handleFieldChange}
        />
      )
    },
  },
}

export default ConnectedSwitch
