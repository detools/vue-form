import Form, { Input } from '@detools/vue-form'

const pause = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms))

export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    async handleSubmit(values) {
      await pause()

      this.formValues = values
    },

    handleSave(values) {
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

    confirmHandler() {
      return pause().then(() => true)
    },
  },

  render() {
    const confirmMessage = 'There is a confirmation, please click Yes or No'

    return (
      <div>
        <h1>Sync Validation Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              cancel
              save
              submit
              messages={{ success: 'Username has been saved' }}
              confirmMessage={confirmMessage}
              confirmYes="Yes"
              confirmNo="No"
              confirmWidth="300px"
              confirmHandler={this.confirmHandler}
              validate={this.formValidate}
              handleSave={this.handleSave}
              handleSubmit={this.handleSubmit}>
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
