import Form, { Input, Upload, validators } from '@detools/vue-form'
import { Button } from 'element-ui'

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
        <h1>Upload Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              submit
              labelWidth="150px"
              labelPosition="left"
              labelSuffix=":"
              buttonsPosition="start"
              handleSubmit={this.handleSubmit}>
              <Input formItem label name="username" />
              <Upload
                formItem
                label
                endpoint="upload"
                name="files"
                validators={[validators.isRequired()]}
                formatResponse={({ items }) => items}>
                <Button>Upload</Button>
              </Upload>
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
