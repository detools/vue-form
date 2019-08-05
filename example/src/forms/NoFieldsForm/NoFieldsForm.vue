<script>
import Form from '@detools/vue-form'

export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    async handleSubmit(values) {
      this.formValues = values
    },
  },

  render() {
    return (
      <div>
        <h1>Scoped Slot Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              cancel="Quit"
              submit="Generate Assignment Candidates"
              handleSubmit={this.handleSubmit}
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
