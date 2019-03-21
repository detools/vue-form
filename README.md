# vue-form

<img align="right" src="twitter_header_photo_1.png" />

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
            <Form cancel submit labelPosition="top" handleSubmit={this.handleSubmit}>
              <Input formItem label name="username" />
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
See demo at [https://detools-vue-form.netlify.com](https://detools-vue-form.netlify.com)

## Available Connected Components

- [Autocomplete](/VueForm/components/ConnectedAutocomplete.js)
- [Checkbox](/VueForm/components/ConnectedCheckbox.js)
- [CheckboxGroup](/VueForm/components/ConnectedCheckboxGroup.js)
- [DatePicker](/VueForm/components/ConnectedDatePicker.js)
- [Input](/VueForm/components/ConnectedInput.js)
- [InputNumber](/VueForm/components/ConnectedInputNumber.js)
- [Radio](/VueForm/components/ConnectedRadio.js)
- [RadioGroup](/VueForm/components/ConnectedRadioGroup.js)
- [Select](/VueForm/components/ConnectedSelect.js)
- [Slider](/VueForm/components/ConnectedSlider.js)
- [Switch](/VueForm/components/ConnectedSwitch.js)
- [TimePicker](/VueForm/components/ConnectedTimePicker.js)
- [Upload](/VueForm/components/ConnectedUpload.js)
- [ArrayField](/VueForm/components/ConnectedArrayField.js)
- [Form](/VueForm/components/Form/Form.vue)

## Changelog

- [4.9.4](/CHANGELOG.md#494)
- [4.9.3](/CHANGELOG.md#493)
- [4.9.2](/CHANGELOG.md#492)
- [4.9.1](/CHANGELOG.md#491)
- [4.9.0](/CHANGELOG.md#490)
- [4.8.0](/CHANGELOG.md#480)
- [4.7.5](/CHANGELOG.md#475)
- [4.7.4](/CHANGELOG.md#474)
- [4.7.3](/CHANGELOG.md#473)
- [4.7.2](/CHANGELOG.md#472)
- [4.7.1](/CHANGELOG.md#471)
- [4.6.4](/CHANGELOG.md#464)
- [4.6.3](/CHANGELOG.md#463)
- [4.6.2](/CHANGELOG.md#462)
- [4.6.1](/CHANGELOG.md#461)
- [4.6.0](/CHANGELOG.md#460)
- [4.5.0](/CHANGELOG.md#450)
- [4.4.0](/CHANGELOG.md#440)
- [4.3.3](/CHANGELOG.md#433)
- [4.3.2](/CHANGELOG.md#432)
- [4.3.1](/CHANGELOG.md#431)
- [4.3.0](/CHANGELOG.md#430)
- [4.2.0](/CHANGELOG.md#420)
- [4.1.1](/CHANGELOG.md#411)
- [4.1.0](/CHANGELOG.md#410)
- [4.0.0](/CHANGELOG.md#400)
- [3.x.x](/CHANGELOG.md#3619)
- [2.x.x](/CHANGELOG.md#278)
- [1.x.x](/CHANGELOG.md#150)
