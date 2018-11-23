<script>
import Form, { Input, validators } from '@detools/vue-form'

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

    asyncValidator(value, name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value === 'github') {
            resolve()
          } else {
            reject(`${name} should be "github"`)
          }
        }, 2000)
      })
    },
  },

  render() {
    return (
      <div>
        <h1 id="inline-validators-form">Inline Validators Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form reset save submit handleSubmit={this.handleSubmit}>
              <Input
                formItem
                name="asyncUsername"
                label="Username"
                validators={[
                  validators.isRequired(),
                  validators.length({ min: 6 }),
                ]}
                asyncValidators={[
                  this.asyncValidator,
                ]}
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
