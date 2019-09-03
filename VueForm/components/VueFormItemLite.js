import Tooltip from 'element-ui/lib/tooltip'

const VueFormItem = {
  name: 'VueFormItemLite',
  componentName: 'VueFormItemLite',

  provide() {
    return {
      elFormItem: this,
    }
  },

  props: {
    label: String,
    labelWidth: String,
    required: Boolean,
    error: String,
  },

  data() {
    return {
      validateState: '',
      validateMessage: '',
    }
  },

  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value
        this.validateState = value ? 'error' : ''
      },
    },
  },

  render() {
    const classNames = [
      'el-form-item',
      'el-form-item-lite',
      'el-form-item--feedback',
      {
        'is-error': !!this.error,
        'is-required': this.required,
      },
    ]

    return (
      <div class={classNames}>
        <div class="el-form-item__content">
          <Tooltip
            manual
            effect="light"
            visibleArrow={false}
            openDelay={0}
            content={this.error}
            placement="bottom"
            value={!!this.error}
            disabled={!this.error}
            popperClass="vue-form-item-popper">
            {this.$slots.default}
          </Tooltip>
        </div>
      </div>
    )
  },
}

export default {
  props: {
    label: String,
    labelWidth: String,
    error: String,
    styles: [Object, Array],
    required: Boolean,
  },

  render() {
    return (
      <VueFormItem
        style={this.styles}
        label={this.label}
        label-width={this.labelWidth}
        error={this.error}
        required={this.required}>
        {this.$slots.default}
      </VueFormItem>
    )
  },
}
