<script>
import { Button } from 'element-ui'
import Form, {
  FormItem,
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  DatePicker,
  validations,
} from '@detools/vue-form'

export default {
  data() {
    return {
      formValues: {},
      heroesOptions: [
        'The Wasp',
        'Ant-Man',
        'Ghost',
        'Hulk',
        'Thor',
        'Star-lord',
        'Doctor Strange',
        'Ebony Maw',
      ],
    }
  },

  methods: {
    handleSubmit(values) {
      this.formValues = values
    },

    validateUsername(value) {
      const name = 'Username'

      return [
        validations.isRequired(value, name),
        validations.length(value, name, { min: 6 }),
      ].reduce((error, validator) => {
        if (error) {
          return error
        }

        return validator()
      }, undefined)
    },
  },

  render() {
    return (
      <div>
        <h1>Inline Validations Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form reset save submit handleSubmit={this.handleSubmit}>
              <Input
                formItem
                name="validUsername"
                label="Username"
                validate={this.validateUsername}
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
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form, .values {
  width: 320px;
}
</style>
