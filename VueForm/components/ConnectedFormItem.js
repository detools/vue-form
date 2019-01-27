import FormItem from 'element-ui/lib/form-item'

export default {
  props: {
    label: String,
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
