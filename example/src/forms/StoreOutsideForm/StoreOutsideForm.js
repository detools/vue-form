import Form, { Input, Checkbox, Notification, validators } from '@detools/vue-form'
import { noop } from 'lodash'

export default {
  data() {
    return {
      formValues: {},
      initialValues: {},
    }
  },

  mounted() {
    setTimeout(() => {
      this.initialValues = { isRequired: true, password: 'asfaseaasradasda' }

      Notification.warning('Initial values have been updated like in real world apps')
    }, 1000)
  },

  methods: {
    handleModelChange(values) {
      this.formValues = values
    },

    handleSubmit() {
      Notification.success('Form has been submitted')
    },

    validate() {
      return {}
    },
  },

  render() {
    return (
      <div>
        <h1>Store Outside Form</h1>
        <div class="wrapper">
          <Form
            submit
            class="form"
            initialValues={this.initialValues}
            validate={this.validate}
            handleModelChange={this.handleModelChange}
            handleSubmit={this.handleSubmit}>
            <Checkbox formItem name="isRequired">
              Is name required?
            </Checkbox>
            <Input
              formItem
              name="name"
              placeholder="Name"
              validators={this.formValues.isRequired ? [validators.isRequired()] : []}
            />
            <Input
              formItem
              name="password"
              type="password"
              placeholder="Password"
              validators={[validators.length({ min: 8 })]}
            />
          </Form>
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
