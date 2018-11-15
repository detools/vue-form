<script>
import { Button } from 'element-ui'
import Form, {
  Input,
  Checkbox,
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
            <Form handleSubmit={this.handleSubmit}>
              <Input name="username" placeholder="Username" />
              <br />
              <br />
              <Input name="password" type="password" placeholder="Password" />
              <br />
              <br />
              <Checkbox name="savePassword">Save password on this computer</Checkbox>
              <br />
              <br />
              <InputNumber controls name="age" value={26} />
              <br />
              <br />
              <div>
                <Radio name="word" value="A">A</Radio>
                <Radio name="word" value="B">B</Radio>
              </div>
              <br />
              <Select
                name="superhero"
                options={this.heroesOptions}
                placeholder="Select a Superhero"
              />
              <br />
              <br />
              <div>How many cups of coffee do you drink during a day?</div>
              <Slider
                name="coffee"
                min={0}
                max={10}
              />
              <br />
              <Switch
                name="ligths"
                activeText="Lights ON"
                inactiveText="Lights OFF"
              />
              <br />
              <br />
              <TimePicker name="time" placeholder="Select Time" />
              <br />
              <br />
              <DatePicker name="date" placeholder="Select Date" />
              <br />
              <br />
              <Button nativeType="reset">
                Reset
              </Button>
              <Button nativeType="submit" type="primary">
                Save
              </Button>
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
