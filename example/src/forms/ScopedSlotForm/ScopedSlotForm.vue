<script>
import Form, { Input, Button, validators } from '@detools/vue-form'

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

    renderFormContent({ allButtonsDisabled, submitButtonClassName, handleSubmit, handleCancel }) {
      return (
        <div>
          <Input
            formItem
            name="username"
            label="Username"
            validators={[validators.isRequired('Username is required')]}
          />
          <Button on-click={handleCancel}>Cancel</Button>
          <Button type="primary" class={submitButtonClassName} on-click={handleSubmit}>
            Submit
          </Button>
        </div>
      )
    },
  },

  render() {
    return (
      <div>
        <h1>Scoped Slot Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              v-model={this.formValues}
              handleSubmit={this.handleSubmit}
              scopedSlots={{ default: this.renderFormContent }}
            />
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
