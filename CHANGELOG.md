## 3.6.8

### Fixed

- Default internal value for `<Upload />` is an `Array`

## 3.6.7

### Fixed

- Default format for `<DatePicker />` is `M/d/yyyy`

## 3.6.6

### Fixed

- Default value format for `<Timepicker />` is `HH:mm:ss`

## 3.6.5

### Fixed

- Replace `<TimeSelect />` with `<TimePicker />`

## 3.6.4

### Fixed

- `<Timepicker />` prop `pickerOptions`. `Array` => `Object`

## 3.6.3

### Fixed

- Scroll to first invalid field on try to submit

## 3.6.2

### Fixed

- Pass `statusIcon` prop to `<Form />`. `true` by default

## 3.6.1

### Fixed

- Pass `disabled` state to `renderExtraButtons`

## 3.6.0

### Added

- Ability to pass `disabled` attribute as `String` message about error that exists outside form and does not accept us to submit form

## 3.5.1

### Fixed

- Do not show any errors on Save

## 3.5.0

### Added

- Ability to add extra buttons between Cancel and Save

## 3.4.14

### Fixed

- Destroy store on `<Form />` destroy

## 3.4.13

### Fixed

- `Phone` and `isNumber` validators

## 3.4.12

### Fixed

- `Phone` validator

## 3.4.11

### Fixed

- `Phone` validator

## 3.4.10

### Added

- Simple `Phone` validator — like isNumber, but with `length` property
- `length` equals 10 by default (US)

## 3.4.9

### Updated

- `<Select />` component prop `default-first-option` now depends on `remote` or `configurable`
- If these props are `true` then `default-first-option` is `true`.

## 3.4.8

### Fixed

- `<Upload />` correctly handle file remove

## 3.4.7

### Fixed

- Now confirm button in `Popover` autofocused pragrammaticaly

## 3.4.6

### Fixed

- Validators `isNumber`, `url` no more check if value is defined

## 3.4.5

### Added

- Added `url` validator, based on `uri-js`

## 3.4.4

### Fixed

- Back `<br />` between message and buttons

## 3.4.3

### Fixed

- Confirm button in `Popover` now has `autoFocus` when rendered

### Added

- `confirmNo`, `confirmYes`, `confirmWidth`, `confirmPlacement`, `confirmTrigger` props to `<Form />`

## 3.4.2

### Fixed

- Do not transform to `String` **null** or **undefined** `<Autocomplete />` value

## 3.4.1

### Fixed

- Margin for wrapped submit button

## 3.4.0

### Added

- Confirmation `<Popover />`
- Submit button has been wrapped with it

## 3.3.5

### Fixed

- Passed value to UIAutocomplete converted to `String`

## 3.3.4

### Fixed

- import for `isNumber` validator

## 3.3.3

### Added

- `isNumber` validator

## 3.3.2

### Fixed

- `zIndex` property for sticky buttons

## 3.3.1

### Added

- Support for prop `buttonsSticky` — Boolean

### Added

- Support for prop `buttonsClassName` — String
- Support for prop `buttonsStyles` — [Object, Array]

## 3.2.0

### Added

- Support for nested fields
- `options` prop for autocomplete

## 3.1.0

### Added

- Flag that indicates about "is field part of <ArrayField />"

## 3.0.1

### Breaking changes

- `reset` property renamed to `cancel`

## 3.0.0

### Breaking changes

- `handleReset` callback now `handleCancel`, because personally I didn't use any reset button, but every time I have a `Cancel` button
- Demo site now moved on from `Github Pages` to [`Netlify`](https://detools-vue-form.netlify.com)

### Updated

- `initialValues` now track changes via `watch` instead of `updated` callback
- `SECRET_VUE_FORM_METHOD` moved to store at all

### Fixed

- `length` validator
- `ArrayField`'s `move` method
- On success form level sync validation (if exists) `syncErrors` no more cleared
- On failed form level sync validation error messages now merge with existing errors
- Field Level Sync Error messages [have high priority](https://github.com/detools/vue-form/pull/12/files#diff-cc347fc7d9ff2647f1b2670fce6f2d0cR134)
- Validators now can react on any changes. See [**Dynamic Validators Form**](https://detools-vue-form.netlify.com/#/dynamic-validators-form)
- All time when `vue-form` needs to validate some value — it uses actual validators
- Values now validate on `reinitializeValues`

### Added

- Independent store to keep form state
- [Tests for this store](https://github.com/detools/vue-form/pull/12/files#diff-c1514b4bdc660c0a5cf1c0155331e290)

## 2.7.8

### Fixed

- Do deep equal of `initialValues` via `lodash.isEqual` on `updated`

## 2.7.7

### Fixed

- `vue-form` now passes itself initial value to every component
- User no need to define `fileList` if he passed `initalValues` to `Form`

## 2.7.6

### Fixed

- Pass `fileList` prop as `file-list` prop to `<Upload />`
- Can't use value for now as `file-list` prop

## 2.7.5

### Fixed

- Pass `<Upload />` value as `file-list` prop to UI component
- Add default noop value for `handleModelChange`
- Call `handleModelChange` on `reinitialize`

## 2.7.4

### Added

- `<Button />` component from `element-ui`, just for convenience

## 2.7.3

### Updated

- When form field has removed from form — it value won't be passed to submit

## 2.7.2

### Fixed

- Added `append`, `prepend` props to `<Input />`

## 2.7.1

### Fixed

- Merge values for submit instead of destructuring

## 2.7.0

### Added

- `<Upload />` control

## 2.6.1

### Fixed

- Check `<Autocomplete />` initial value. If it's string — use it. If there is a default value for this control — use it.

## 2.6.0

### Added

- `<Autocomplete />` control

## 2.5.11

### Fixed

- Omit Boolean type from `label` prop `<FormItem />`

## 2.5.10

### Fixed

- Do not pass `label` prop to `<Checkbox />`

## 2.5.9

### Fixed

- Do not pass `label` prop to `<Input />` and `<InputNumber />`

## 2.5.8

### Fixed

- `label` prop now accepts `[String, Boolean]`

## 2.5.7

### Added

- Every unrecognized props applied to `ArrayField` passed to `renderField` as `extra` prop

### Fixed

- `ArrayField` now also supports `FormItem` Props
- If you want to pass an empty label to a Control due to `element-ui` limitations — now you can. It won't be a `name` prop anymore.
- But if you will pass a `label` that means `label={true}` you will get a label `startCase(name)`

## 2.5.6

### Removed

- `marginTop` for buttons container

## 2.5.5

### Fixed

- `renderComponent` now accepts `createElement` as 3rd argument

## 2.5.4

### Updated

- `renderField` now supports not only a function as prop value, also it supports any Component
- A Component will get `{ data, fields, name }` options, where `data` is an Array, `fields` is an Object with methods to manipulate that Array, `name` is a String passed as a `name` to `ArrayField` component

```js
import Form, { ArrayField } from '@detools/vue-form'
import Tasklist from '@/components/Tasklist'

// OK
const renderAsFunction = {
  render() {
    methods: {
      renderTasklist({ data, fields, name }) {
        return <Tasklist data={data} fields={fields} name={name} />
      },
    },

    return (
      <Form>
        <ArrayField name="tasklist" renderField={this.renderTasklist} />
      </Form>
    )
  }
}

// NOW OK
const renderAsComponent = {
  render() {
    return (
      <Form>
        <ArrayField name="tasklist" renderField={Tasklist} />
      </Form>
    )
  }
}
```

## 2.5.3

### Fixed

- Reinitialization for all values types except Array

## 2.5.2

### Fixed

- Reinitialization for Array values

## 2.5.1

### Fixed

- Rename `ConnectedCheckboxGroupMixin` => `ConnectedArrayFieldMixin`
- Use `ConnectedArrayFieldMixin` for `ConnectedArrayField`, `ConnectedCheckboxGroup`

## 2.5.0

### Added

- [`ArrayField`](/VueForm/components/ConnectedArrayField.js) control
- [`Array Field Form`](https://detools-vue-form.netlify.com/#/array-field-form) to explain how `ArrayField` works

## 2.4.2

### Updated

- `length` validator. Now it supports arrays
- [`All Validations Form` demo](https://detools-vue-form.netlify.com/#/all-validations-form)

## 2.4.1

### Fixed

- Internal `manageTouchedFieldsState` method
- Passing touched state from vue-form to control

## 2.4.0

### Updated

- Common methods were moved to `ConnectedControlMixin`

## 2.3.1

### Fixed

- Form submission when async validation in progress

How to test:

1.  Open [Inline Validators Form](https://detools-vue-form.netlify.com/#/inline-validators-form)
2.  Type `123456` => click `Submit`
3.  You will get an async error — form won't submit
4.  Type `github` => click `Submit`
5.  Form will be submitted after async form validation

## 2.3.0

### Added

- Form level sync validation. [Demo](https://detools-vue-form.netlify.com/#/sync-validation-form)

## 2.2.0

### Changed

- `asyncValidators` will be called only on `blur` event
- As before, they will be called only if there is no sync errors

## 2.1.0

### Added

- `asyncValidators` property to every Form Control
- They will validate only if there is no sync errors or sync validators

## 2.0.0

### BREAKING CHANGES

- Every Form Control now accepts `validators`—Array prop instead of `validate`

```js
// Now
import { Input, validators } from '@detools/vue-form'

const After = {
  render() {
    return <Input validators={[validators.isRequired()]} />
  },
}

// Before
import { Input, validations } from '@detools/vue-form'

const Before = {
  render() {
    return <Input validate={validations.validate([validations.isRequired()])} />
  },
}
```

### Updated

- `isRequired` validator now supports Arrays, Objects.

## 1.5.0

### Added

- `<Notification />` component to show notifications on success/error

## 1.4.4

### Fixed

- `isRequired` validator

## 1.4.3

### Added

- `<Form />` has attribute novalidate by default

## 1.4.2

### Fixed

- `buttonsPosition` prop validator for `<Form />`

## 1.4.1

### Added:

- Support for immediate changes handler `handleModelChange`
- Example for immediate changes form [`<ImmediateForm />`](https://detools-vue-form.netlify.com#immediate-form)

### Changed:

- Example `<AsyncValidationForm />` renamed to `<AsyncSubmitForm />`

## 1.4.0

### Added:

- Support for integrated FormItem for all components via `formItem` prop
- [`<RadioGroup />`](/VueForm/ConnectedRadioGroup.js)
- [`<CheckboxGroup />`](/VueForm/ConnectedCheckboxGroup.js)
