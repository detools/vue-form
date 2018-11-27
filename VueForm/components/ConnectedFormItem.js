import { FormItem } from 'element-ui'

export default {
  props: {
    label: [String, Boolean],
    labelWidth: String,
    error: String,
    styles: [Object, Array],
  },

  render() {
    return (
      <FormItem
        style={this.styles}
        label={this.label}
        label-width={this.labelWidth}
        error={this.error}>
        {this.$slots.default}
      </FormItem>
    )
  },
}
