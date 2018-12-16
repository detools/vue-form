import Form, { Input, Notification } from '@detools/vue-form'

export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    handleSubmit(values) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.formValues = values

          resolve()
        }, 2000)
      }).then(() => {
        Notification.success('Async submission is working')
      })
    },
  },

  render() {
    return (
      <div>
        <h1>Async Submit Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form cancel submit handleSubmit={this.handleSubmit}>
              <Input formItem name="usename" label="Username" placeholder="Just submit me" />
              <div>
                You will see a notification when form will be submitted,
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
