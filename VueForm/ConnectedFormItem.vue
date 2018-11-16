<script>
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
</script>

<style lang="less">
  .is-vue-form-warn .el-form-item__error {
    color: #FF9800;
  }

  .is-vue-form-warn .el-form-item.is-error .el-input__inner,
  .is-vue-form-warn .el-form-item.is-error .el-input__inner:focus,
  .is-vue-form-warn .el-form-item.is-error .el-textarea__inner,
  .is-vue-form-warn .el-form-item.is-error .el-textarea__inner:focus,
  .is-vue-form-warn .el-message-box__input input.invalid,
  .is-vue-form-warn .el-message-box__input input.invalid:focus {
    border-color: #FF9800;
  }
</style>
