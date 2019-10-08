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
import { mapActions } from 'vuex'
import Form, { Input } from '@detools/vue-form'

export default {
  data() {
    return {
      formValues: {},
    }
  },

  methods: {
    ...mapActions('cart', ['checkout']),

    handleSubmit(values) {
      return this.checkout(values)
    },
  },

  render() {
    return (
      <div>
        <h1>Basic Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form cancel submit handleSubmit={this.handleSubmit} v-model={this.formValues}>
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

- [5.10.8](/CHANGELOG.md#5108)
- [5.10.7](/CHANGELOG.md#5107)
- [5.10.6](/CHANGELOG.md#5106)
- [5.10.5](/CHANGELOG.md#5105)
- [5.10.4](/CHANGELOG.md#5104)
- [5.10.3](/CHANGELOG.md#5103)
- [5.10.2](/CHANGELOG.md#5102)
- [5.10.1](/CHANGELOG.md#5101)
- [5.10.0](/CHANGELOG.md#5100)
- [5.9.0](/CHANGELOG.md#590)
- [5.8.0](/CHANGELOG.md#580)
- [5.7.1](/CHANGELOG.md#571)
- [5.7.0](/CHANGELOG.md#570)
- [5.6.7](/CHANGELOG.md#567)
- [5.6.6](/CHANGELOG.md#566)
- [5.6.5](/CHANGELOG.md#565)
- [5.6.4](/CHANGELOG.md#564)
- [5.6.3](/CHANGELOG.md#563)
- [5.6.2](/CHANGELOG.md#562)
- [5.6.1](/CHANGELOG.md#561)
- [5.6.0](/CHANGELOG.md#560)
- [5.5.1](/CHANGELOG.md#551)
- [5.5.0](/CHANGELOG.md#550)
- [5.4.7](/CHANGELOG.md#547)
- [5.4.6](/CHANGELOG.md#546)
- [5.4.5](/CHANGELOG.md#545)
- [5.4.4](/CHANGELOG.md#544)
- [5.4.3](/CHANGELOG.md#543)
- [5.4.2](/CHANGELOG.md#542)
- [5.4.1](/CHANGELOG.md#541)
- [5.4.0](/CHANGELOG.md#540)
- [5.3.2](/CHANGELOG.md#532)
- [5.3.1](/CHANGELOG.md#531)
- [5.3.0](/CHANGELOG.md#530)
- [5.2.3](/CHANGELOG.md#522)
- [5.2.1](/CHANGELOG.md#521)
- [5.2.0](/CHANGELOG.md#520)
- [5.1.0](/CHANGELOG.md#510)
- [5.0.4](/CHANGELOG.md#504)
- [5.0.3](/CHANGELOG.md#503)
- [5.0.2](/CHANGELOG.md#502)
- [5.0.1](/CHANGELOG.md#501)
- [5.0.0](/CHANGELOG.md#500)
- [4.x.x](/CHANGELOG.md#4140)
- [3.x.x](/CHANGELOG.md#3619)
- [2.x.x](/CHANGELOG.md#278)
- [1.x.x](/CHANGELOG.md#150)
