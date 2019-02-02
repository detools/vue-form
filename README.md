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

- [3.6.15](/CHANGELOG.md#3615)
- [3.6.14](/CHANGELOG.md#3614)
- [3.6.13](/CHANGELOG.md#3613)
- [3.6.12](/CHANGELOG.md#3612)
- [3.6.11](/CHANGELOG.md#3611)
- [3.6.10](/CHANGELOG.md#3610)
- [3.6.9](/CHANGELOG.md#369)
- [3.6.8](/CHANGELOG.md#368)
- [3.6.7](/CHANGELOG.md#367)
- [3.6.6](/CHANGELOG.md#366)
- [3.6.5](/CHANGELOG.md#365)
- [3.6.4](/CHANGELOG.md#364)
- [3.6.3](/CHANGELOG.md#363)
- [3.6.2](/CHANGELOG.md#362)
- [3.6.1](/CHANGELOG.md#361)
- [3.6.0](/CHANGELOG.md#360)
- [3.5.1](/CHANGELOG.md#351)
- [3.5.0](/CHANGELOG.md#350)
- [3.4.14](/CHANGELOG.md#3414)
- [3.4.13](/CHANGELOG.md#3413)
- [3.4.12](/CHANGELOG.md#3412)
- [3.4.11](/CHANGELOG.md#3411)
- [3.4.10](/CHANGELOG.md#3410)
- [3.4.9](/CHANGELOG.md#349)
- [3.4.8](/CHANGELOG.md#348)
- [3.4.7](/CHANGELOG.md#347)
- [3.4.6](/CHANGELOG.md#346)
- [3.4.5](/CHANGELOG.md#345)
- [3.4.4](/CHANGELOG.md#344)
- [3.4.3](/CHANGELOG.md#343)
- [3.4.2](/CHANGELOG.md#342)
- [3.4.1](/CHANGELOG.md#341)
- [3.4.0](/CHANGELOG.md#340)
- [3.3.5](/CHANGELOG.md#335)
- [3.3.4](/CHANGELOG.md#334)
- [3.3.3](/CHANGELOG.md#333)
- [3.3.2](/CHANGELOG.md#332)
- [3.3.1](/CHANGELOG.md#331)
- [3.3.0](/CHANGELOG.md#330)
- [3.2.0](/CHANGELOG.md#320)
- [3.1.0](/CHANGELOG.md#310)
- [3.0.1](/CHANGELOG.md#301)
- [3.0.0](/CHANGELOG.md#300)
- [2.x.x](/CHANGELOG.md#278)
- [1.x.x](/CHANGELOG.md#150)
