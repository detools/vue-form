<script>
import Form, {
  Input,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  DatePicker,
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
      companiesOptions: ['Apple', 'Google', 'Amazon', 'Microsoft'],
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
        <h1>Basic Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form reset submit="Save" labelPosition="top" handleSubmit={this.handleSubmit}>
              <Input formItem name="username" label="Username" />
              <Input formItem name="password" type="password" label="Password" />
              <Checkbox formItem name="savePassword">Save password on this computer</Checkbox>
              <CheckboxGroup
                formItem
                name="companies"
                label="What companies do you prefer?"
                options={this.companiesOptions}
              />
              <InputNumber formItem controls name="age" label="Select your age" value={26} />
              <div>
                <Radio name="word" value="A">A</Radio>
                <Radio name="word" value="B">B</Radio>
              </div>
              <br />
              <Select
                formItem
                name="superhero"
                options={this.heroesOptions}
                label="Select a Superhero"
              />
              <Slider
                formItem
                name="coffee"
                label="How many controls in this form?"
                min={0}
                max={10}
              />
              <Switch
                formItem
                name="ligths"
                label="What should we do with lights?"
                activeText="ON"
                inactiveText="OFF"
              />
              <TimePicker formItem name="time" label="Select Time" />
              <DatePicker formItem name="date" label="Select Date" />
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

.form {
  width: 750px;
}

.values {
  width: 200px;
}
</style>
