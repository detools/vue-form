import noop from 'lodash/noop'

export const BUTTONS_POSITION = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  LABEL: 'label',
}

const formProps = {
  cancel: [String, Boolean],
  save: [String, Boolean],
  submit: [String, Boolean],

  labelWidth: String,
  labelSuffix: String,
  labelPosition: String,

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
  handleModelChange: {
    type: Function,
    default: noop,
  },
  handleDisabled: {
    type: Function,
    default: noop,
  },
  handleCancel: Function,

  validate: Function,
  asyncValidate: Function,
  asyncBlurFields: Array,

  // Activates Popover
  confirmMessage: String,

  // Popover Enhancements
  confirmNo: String,
  confirmYes: String,
  confirmWidth: [String, Number],
  confirmPlacement: String,
  confirmTrigger: String,

  // Extra buttons between Cancel and Save for now
  renderExtraButtons: Function,
}

export default formProps
