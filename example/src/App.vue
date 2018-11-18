<script>
import BasicForm from './BasicForm'
import InlineValidationsForm from './InlineValidationsForm'
import AsyncValidationForm from './AsyncValidationForm'

const Divider = {
  render() {
    return (
      <div class="divider" />
    )
  },
}

export default {
  render() {
    return (
      <div class="forms">
        <BasicForm />
        <Divider />
        <InlineValidationsForm />
        <Divider />
        <AsyncValidationForm />
      </div>
    )
  },
}
</script>

<style scoped lang="less">
.forms {
  max-width: 1000px;
  padding: 0 20px;
}

.divider {
  height: 2px;
  background-color: #757575;
  margin: 50px 0;
}
</style>
