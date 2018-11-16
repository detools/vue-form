<script>
import BasicForm from './BasicForm'
import InlineValidationsForm from './InlineValidationsForm'

export default {
  render() {
    return (
      <div class="forms">
        <BasicForm />
        <br />
        <hr />
        <InlineValidationsForm />
      </div>
    )
  },
}
</script>

<style scoped lang="less">
.forms {
  max-width: 800px;
  padding: 0 20px;
}
</style>
