## 2.3.1

### Fixed

- Form submission when async validate in progress

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