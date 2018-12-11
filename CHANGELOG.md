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

- [`FieldArray`](/VueForm/components/ConnectedFieldArray.js) control
- [`Array Field Form`](https://detools.github.io/vue-form/#/array-field-form) to explain how `FieldArray` works

## 2.4.2

### Updated

- `length` validator. Now it supports arrays
- [`All Validations Form` demo](https://detools.github.io/vue-form/#/all-validations-form)

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

1.  Open [Inline Validators Form](https://detools.github.io/vue-form/#/inline-validators-form)
2.  Type `123456` => click `Submit`
3.  You will get an async error — form won't submit
4.  Type `github` => click `Submit`
5.  Form will be submitted after async form validation

## 2.3.0

### Added

- Form level sync validation. [Demo](https://detools.github.io/vue-form/#/sync-validation-form)

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

<Input
  validators={[validators.isRequired()]}
/>

// Before
import { Input, validations } from '@detools/vue-form'

<Input
  validate={validations.validate([validations.isRequired()])}
/>
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
- Example for immediate changes form [`<ImmediateForm />`](https://detools.github.io/vue-form#immediate-form)

### Changed:

- Example `<AsyncValidationForm />` renamed to `<AsyncSubmitForm />`

## 1.4.0

### Added:

- Support for integrated FormItem for all components via `formItem` prop
- [`<RadioGroup />`](/VueForm/ConnectedRadioGroup.js)
- [`<CheckboxGroup />`](/VueForm/ConnectedCheckboxGroup.js)
