import { FormItem } from 'element-ui'

export default {
  props: {
    label: String,
    labelWidth: String,
    error: String,
  },

  render() {
    return (
      <FormItem label={this.label} label-width={this.labelWidth} error={this.error}>
        {this.$slots.default}
      </FormItem>
    )
  },
}
