<script>
import BasicForm from './BasicForm'
import InlineValidatorsForm from './InlineValidatorsForm'
import AsyncSubmitForm from './AsyncSubmitForm'
import ImmediateForm from './ImmediateForm'

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
        <InlineValidatorsForm />
        <Divider />
        <AsyncSubmitForm />
        <Divider />
        <ImmediateForm />
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
