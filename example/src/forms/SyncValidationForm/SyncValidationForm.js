import Form, { Input } from '@detools/vue-form'

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

    formValidate({ username }) {
      const errors = {}

      if (username && username.length < 6) {
        errors.username = 'Username should be at least 6 characters'
      }

      if (!username) {
        errors.username = 'Username is required'
      }

      return errors
    },
  },

  render() {
    return (
      <div>
        <h1>Sync Validation Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form cancel save submit validate={this.formValidate} handleSubmit={this.handleSubmit}>
              <Input formItem name="username" label="Username" />
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
