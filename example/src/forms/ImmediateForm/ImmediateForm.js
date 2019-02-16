import Form, { Input } from '@detools/vue-form'

export default {
  data() {
    return {
      form: {},
    }
  },

  render() {
    return (
      <div>
        <h1>Immediate Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form v-model={this.form}>
              <Input class="input" name="name" placeholder="Type and see to Form Values" />
              <br />
              <br />
              <Input class="input" name="type" placeholder="Type and see to Form Values" />
            </Form>
            <br />
            <br />
          </div>
          <div class="values">
            <strong>Form Values</strong>
            <br />
            <br />
            <div>
              <pre>{JSON.stringify(this.form, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
