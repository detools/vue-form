import Form, { Autocomplete } from '@detools/vue-form'

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

    fetchSuggestions(query, callback) {
      if (query !== '') {
        setTimeout(() => {
          callback(
            [
              { id: 1, name: 'Leonard Leblanc' },
              { id: 2, name: 'Mitzi Rocha' },
              { id: 3, name: 'Marquita Giles' },
            ].filter(({ name: item }) => item.toLowerCase().includes(query))
          )
        }, 500)
      } else {
        callback([])
      }
    },
  },

  render() {
    return (
      <div>
        <h1>Sync Validation Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              submit
              labelWidth="150px"
              labelPosition="left"
              labelSuffix=":"
              buttonsPosition="label"
              handleSubmit={this.handleSubmit}>
              <Autocomplete
                formItem
                name="username"
                label="Type A and wait"
                fetchSuggestions={this.fetchSuggestions}
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
          </div>
        </div>
      </div>
    )
  },
}
