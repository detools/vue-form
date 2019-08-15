import Popover from 'element-ui/lib/popover'
import Button from './Button'

const Buttons = {
  props: {
    cancel: {
      type: String,
      required: true,
    },

    confirm: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    handleClickCancel: {
      type: Function,
      required: true,
    },

    handleClickConfirm: {
      type: Function,
      required: true,
    },
  },

  mounted() {
    if (this.$refs.yes) {
      this.$refs.yes.$el.focus()
    }
  },

  render() {
    return (
      <div>
        <p style="text-align: left">{this.message}</p>
        <br />
        <div>
          <Button size="mini" type="text" on-click={this.handleClickCancel}>
            {this.cancel}
          </Button>
          <Button ref="yes" type="primary" size="mini" on-click={this.handleClickConfirm}>
            {this.confirm}
          </Button>
        </div>
      </div>
    )
  },
}

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
        {this.confirmIsVisible && (
          <Buttons
            cancel={this.cancel}
            confirm={this.confirm}
            message={this.message}
            handleClickCancel={this.handleClickCancel}
            handleClickConfirm={this.handleClickConfirm}
          />
        )}
        <div slot="reference">{this.$slots.default}</div>
      </Popover>
    )
  },
}
