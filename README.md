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

```js
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
            <Form reset submit="Save" labelPosition="top" handleSubmit={this.handleSubmit}>
              <Input formItem name="username" label="Username" />
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
```

## More Examples

See source in [example/src](/example/src) folder.  
See demo at [https://detools.github.io/vue-form](https://detools.github.io/vue-form)

## Available Connected Components

- [Checkbox](/VueForm/Checkbox.js)
- [CheckboxGroup](/VueForm/CheckboxGroup.js)
- [DatePicker](/VueForm/DatePicker.js)
- [Input](/VueForm/Input.js)
- [InputNumber](/VueForm/InputNumber.js)
- [Radio](/VueForm/Radio.js)
- [RadioGroup](/VueForm/RadioGroup.js)
- [Select](/VueForm/Select.js)
- [Slider](/VueForm/Slider.js)
- [Switch](/VueForm/Switch.js)
- [TimePicker](/VueForm/TimePicker.js)
- [Form](/VueForm/Form.vue)

## Roadmap

- Add remaining components
  - <Upload />
  - <Rate />
- Add validation examples
  - [Field level sync validation](https://detools.github.io/vue-form/#inline-validations-form)
  - Form level sync validation
  - Field level async validation
  - Form level async validation
