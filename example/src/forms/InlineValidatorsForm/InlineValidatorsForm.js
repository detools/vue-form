import Form, { Input, Notification, validators } from '@detools/vue-form'

export default {
  data() {
    return {
      formValues: {},
      formErrors: {},
    }
  },

  methods: {
    handleSubmit(values) {
      this.formValues = values
    },

    handleCancel() {
      this.formValues = {}
    },

    handleDisabled(errors) {
      Notification.warning('handleDisabled method has been called')

      this.formErrors = errors
    },

    asyncValidator3000(value, name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value === 'github') {
            Notification.success(`${name} passed a validation (3s)`)
            resolve()
          } else {
            Notification.error(`${name} did not pass a validation (3s)`)
            reject(`${name} should be github`)
          }
        }, 3000)
      })
    },

    asyncValidator5000(value, name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value) {
            Notification.success(`${name} passed a validation (5s)`)
            resolve()
          } else {
            Notification.error(`${name} did not pass a validation (5s)`)
            reject(`${name} is required`)
          }
        }, 5000)
      })
    },
  },

  render() {
    return (
      <div>
        <h1>Inline Validators Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              reset
              save
              submit
              handleSubmit={this.handleSubmit}
              handleCancel={this.handleCancel}
              handleDisabled={this.handleDisabled}>
              <Input
                formItem
                name="username"
                label="Username with async validator for 3s"
                validators={[validators.isRequired(), validators.length({ min: 6 })]}
                asyncValidators={[this.asyncValidator3000]}
              />
              <Input
                formItem
                name="anything"
                label="Anything with async validator for 5s"
                asyncValidators={[this.asyncValidator5000]}
              />
            </Form>
          </div>
          <div class="values">
            <strong>Form Values</strong>
            <br />
            <br />
            <div>
              <pre>{JSON.stringify(this.formValues, null, 2)}</pre>
            </div>
            <br />
            <br />
            <strong>Form Errors</strong>
            <br />
            <br />
            <div>
              <pre>{JSON.stringify(this.formErrors, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
