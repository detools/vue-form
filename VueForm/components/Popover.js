import { Popover, Button } from 'element-ui'

export default {
  props: {
    message: {
      type: String,
      required: true,
    },

    cancel: {
      type: String,
      default: 'Cancel',
    },

    confirm: {
      type: String,
      default: 'Confirm',
    },

    width: {
      type: [String, Number],
      default: '300',
    },

    placement: {
      type: String,
      default: 'top',
    },

    trigger: {
      type: String,
      default: 'manual',
    },

    handleConfirm: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      confirmIsVisible: false,
    }
  },

  methods: {
    show() {
      this.confirmIsVisible = true
    },

    handleClickCancel() {
      this.confirmIsVisible = false
    },

    handleClickConfirm(event) {
      this.confirmIsVisible = false

      return this.handleConfirm(event, true)
    },
  },

  render() {
    return (
      <Popover
        placement={this.placement}
        width={String(this.width)}
        trigger={this.trigger}
        value={this.confirmIsVisible}>
        <p style="text-align: left">{this.message}</p>
        <br />
        <div>
          <Button size="mini" type="text" on-click={this.handleClickCancel}>
            {this.cancel}
          </Button>
          <Button
            autoFocus
            type="primary"
            size="mini"
            name="popoverConfirm"
            on-click={this.handleClickConfirm}>
            {this.confirm}
          </Button>
        </div>
        <div slot="reference">{this.$slots.default}</div>
      </Popover>
    )
  },
}
