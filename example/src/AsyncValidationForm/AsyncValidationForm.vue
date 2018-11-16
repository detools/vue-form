<script>
import Form, { Input } from '@detools/vue-form'
import { Notification } from 'element-ui'

export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    handleSubmit() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000)
      }).then(() => {
        Notification.success({
          title: 'Yay!',
          message: 'Async Validation is Working',
        })
      })
    },
  },

  render() {
    return (
      <div>
        <h1>Async Validation Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form reset submit handleSubmit={this.handleSubmit}>
              <Input
                formItem
                name="usename"
                label="Username"
                placeholder="Just submit me"
              />
              <div>
                You will see a notification
                <br />
                when form will be submitted
                <br />
                buttons will be disabled
              </div>
              <br />
            </Form>
          </div>
          <div class="values">
            <strong>Form Values</strong>
            <br />
            <br />
            <div>
              <pre>{JSON.stringify(this.formValues, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form, .values {
  width: 320px;
}
</style>
