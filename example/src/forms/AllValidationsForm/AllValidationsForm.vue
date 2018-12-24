<script>
import Form, {
  Input,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TimePicker,
  DatePicker,
  validators,
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
      browsersOptions: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'],
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
        <h1>All Validations Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form
              cancel
              submit
              labelPosition="top"
              buttonsPosition="end"
              buttonsClassName="sticky-buttons"
              handleSubmit={this.handleSubmit}>
              <Input
                formItem
                name="username"
                label="Username"
                validators={[validators.isRequired()]}
              />
              <Input
                formItem
                name="password"
                type="password"
                label="Password"
                validators={[validators.isRequired(), validators.length({ min: 6 })]}
              />
              <Checkbox formItem name="policyAgreement" validators={[validators.isRequired()]}>
                I have read and agree to the Privacy Policy
              </Checkbox>
              <CheckboxGroup
                formItem
                name="companies"
                label="What companies do you prefer?"
                options={this.companiesOptions}
                validators={[validators.length({ min: 2 }, 'Please, select at least 2 companies')]}
              />
              <InputNumber
                formItem
                controls
                name="age"
                label="Select your age"
                value={26}
                min={15}
                max={30}
              />
              <div>
                <Radio name="word" value="A">
                  A
                </Radio>
                <Radio name="word" value="B">
                  B
                </Radio>
              </div>
              <br />
              <RadioGroup
                formItem
                name="browser"
                label="Which browser do you use?"
                options={this.browsersOptions}
                validators={[validators.isRequired('Please select a browser from list below')]}
              />
              <Select
                formItem
                name="superhero"
                options={this.heroesOptions}
                label="Select a Superhero"
                validators={[validators.isRequired()]}
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
                validators={[validators.isRequired()]}
              />
              <TimePicker
                formItem
                name="time"
                label="Select Time"
                validators={[validators.isRequired()]}
              />
              <DatePicker
                formItem
                name="date"
                label="Select Date"
                validators={[validators.isRequired()]}
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
  padding-bottom: 60px;

  /deep/ .sticky-buttons {
    height: 60px;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center !important;
    padding-right: 50px;
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    background-color: #ffffff;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
