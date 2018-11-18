<script>
import BasicForm from './BasicForm'
import InlineValidationsForm from './InlineValidationsForm'
import AsyncValidationForm from './AsyncValidationForm'

export default {
  render() {
    return (
      <div class="forms">
        <BasicForm />
        <br />
        <hr />
        <InlineValidationsForm />
        <br />
        <hr />
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
</style>
