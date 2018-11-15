![image](twitter_header_photo_1.png)

# vue-form

Form State Management for VueJS

[![npm version](http://img.shields.io/npm/v/@detools/vue-form.svg?style=flat)](https://npmjs.org/package/@detools/vue-form 'View this project on npm')
[![npm downloads](https://img.shields.io/npm/dm/@detools/vue-form.svg)](https://npmjs.org/package/@detools/vue-form 'View this project on npm')
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Installation

```bash
npm i @detools/vue-form
```

## Usage

```vue
<script>
import { Button } from 'element-ui'
import Form, { Input } from '@detools/vue-form'

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
              <Button nativeType="reset">Reset</Button>
              <Button nativeType="submit" type="primary">
                Save
              </Button>
            </Form>
          </div>
          <div class="values">
            <strong>Form Values</strong>
            <br />
            <br />
            <div>{JSON.stringify(this.formValues, null, 2)}</div>
          </div>
        </div>
      </div>
    )
  },
}
</script>
```

## More Examples

See source in [example/src](/example/src) folder.  
See demo at [https://detools.github.io/vue-form](https://detools.github.io/vue-form)

## Available Connected Components

- Checkbox
- DatePicker
- Input
- InputNumber
- Radio
- Select
- Slider
- Switch
- TimePicker
- Form

## Roadmap

- Add remaining components
- Add validation examples
