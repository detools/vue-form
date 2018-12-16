import Form, { Autocomplete } from '@detools/vue-form'

export default {
  data() {
    return {
      formValues: {},
      autocompleteList: [
        { id: 1, name: 'Leonard Leblanc' },
        { id: 2, name: 'Mitzi Rocha' },
        { id: 3, name: 'Marquita Giles' },
      ],
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
            this.autocompleteList.filter(({ name: item }) => item.toLowerCase().includes(query))
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
        <h1>Autocomplete Form</h1>
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
            <br />
            <strong>Autocomplete List</strong>
            <br />
            <br />
            <div>
              <pre>{JSON.stringify(this.autocompleteList, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
