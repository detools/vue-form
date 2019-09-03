import noop from 'lodash/noop'

export const BUTTONS_POSITION = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  LABEL: 'label',
}

const formProps = {
  // v-model
  value: Object,

  cancel: [String, Boolean],
  save: [String, Boolean],
  submit: [String, Boolean],

  labelWidth: String,
  labelPosition: { type: String, default: 'left' },
  labelSuffix: { type: String, default: ':' },

  statusIcon: {
    type: Boolean,
    default: true,
  },

  buttonsPosition: {
    type: String,
    default: () => 'start',
    validator: value => Object.values(BUTTONS_POSITION).includes(value),
  },

  buttonsClassName: String,
  buttonsStyles: [Object, Array],
  buttonsSticky: Boolean,

  initialValues: {
    type: Object,
    default: () => ({}),
  },

  messages: Object,

  handleSubmit: {
    type: Function,
    default: noop,
  },
  handleSave: Function,
  handleDisabled: {
    type: Function,
    default: noop,
  },
  handleCancel: Function,

  validate: Function,
  asyncValidate: Function,
  asyncBlurFields: Array,

  // Extra form props
  // This prop tells us that we can't submit a form (some extra check outside form)
  // It should be an error message that describes what type of error exists outside form
  disabled: [String, Object],

  // Activates Popover
  confirmMessage: String,

  // Popover Enhancements
  confirmNo: String,
  confirmYes: String,
  confirmWidth: [String, Number],
  confirmPlacement: String,
  confirmTrigger: String,

  // Async callback to activate popover
  confirmHandler: Function,

  // Extra buttons between Cancel and Save for now
  renderExtraButtons: Function,

  // Best way when filtering data grids
  keepValueOnRemove: Boolean,
}

export default formProps
