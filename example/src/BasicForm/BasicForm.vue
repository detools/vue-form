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
      <div>
        <h1>Basic Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form handleSubmit={this.handleSubmit}>
              <Input name="username" placeholder="Username" />
              <br />
              <br />
              <Button nativeType="reset">
                Reset
              </Button>
              <Button nativeType="submit" type="primary">
                Save
              </Button>
            </Form>
          </div>
          <div class="values">
            <strong>Form Values</strong>
            <br />
            <br />
            <div>
              {JSON.stringify(this.formValues, null, 2)}
            </div>
          </div>
        </div>
      </div>
    )
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form, .values {
  width: 320px;
}
</style>
