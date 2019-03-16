import FormItem from 'element-ui/lib/form-item'

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
      <FormItem
        style={this.styles}
        label={this.label}
        label-width={this.labelWidth}
        error={this.error}
        required={this.required}>
        {this.$slots.default}
      </FormItem>
    )
  },
}
