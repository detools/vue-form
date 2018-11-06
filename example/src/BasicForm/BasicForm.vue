<script>
import { Button } from 'element-ui'
import Form, { Input } from '../../../VueForm'

export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    handleSubmit(values) {
      this.formValues = values
    },
  },

  render() {
    return (
      <div class="basic-form">
        <Form handleSubmit={this.handleSubmit}>
          <Input name="username" />
          <Button nativeType="submit" type="primary">
            Save
          </Button>
        </Form>
      </div>
    )
  },
}
</script>

<style scoped lang="scss">
.basic-form {
  display: flex;
  flex-direction: column;
}
</style>
