import Form, { Input, Checkbox, Notification, ArrayField, validators } from '@detools/vue-form'
import InfiniteInput from '@/components/InfiniteInput'
import InfiniteAutocomplete from '@/components/InfiniteAutocomplete'

export default {
  data() {
    return {
      form: {},
      initialValues: {},
    }
  },

  mounted() {
    setTimeout(() => {
      this.initialValues = {
        isRequired: true,
        password: 'asfaseaasradasda',
        inputs: [
          { firstName: 'Anton', lastName: 'Kuznetsov' },
          { firstName: 'Hello', lastName: 'World' },
        ],
        autocompleteIds: [45, 44],
        autocomplete: [
          { id: 45, name: 'Donald Trump' },
          { id: 44, name: 'Barack Obama' },
          { id: 43, name: 'George W. Bush' },
          { id: 42, name: 'Bill Clinton' },
        ],
      }

      Notification.warning('Initial values have been updated like in real world apps')
    }, 1000)
  },

  methods: {
    handleModelChange(values) {
      this.form = values
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
        <h1>Dynamic Validators Form</h1>
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
              validators={this.form.isRequired ? [validators.isRequired()] : []}
            />
            <Input
              formItem
              name="password"
              type="password"
              placeholder="Password"
              validators={[validators.length({ min: 8 })]}
            />
            <ArrayField name="inputs" renderField={InfiniteInput} />
            <ArrayField
              name="autocompleteIds"
              renderField={InfiniteAutocomplete}
              options={this.initialValues.autocomplete}
            />
          </Form>
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
