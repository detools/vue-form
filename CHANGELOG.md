## 5.5.1

### Added

- Pass `submitting` state to `scopedSlot`

## 5.5.0

### Added

- Ability to render form content inside [scopedSlot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)
- If you're using this approach you can use available options passed to scopedSlot:
  - allButtonsDisabled — Boolean
  - isSubmitButtonDisabled — Boolean
  - submitButtonClassName — String
  - handleSubmit — Function
  - handleCancel — Function
- Demo — [Scoped Slots Form](https://detools-vue-form.netlify.com/#/scoped-slots-form)

### Updated

- `<Button />` component now not just a plain `element-ui` `<Button />`
- Now it's my own implementation from main project that I'm working on
- It automatically handles promises inside `on-click` callback
- But you should explicitly `return` this promise from handler
- Button will have a spinner until promise fullfilled

## 5.4.7

### Updated

- zIndex for fixed buttons container

## 5.4.6

### Updated

- zIndex for fixed buttons container

## 5.4.5

### Updated

- Now submit button will be disabled if some form level validations are failed

## 5.4.4

### Updated

- Dependencies

## 5.4.3

### Changed

- `DatePicker` value format from `M/d/yyyy` to `yyyy-MM-dd`

## 5.4.2

### Added

- Second type for `trueLabel` and `falseLabel` — Number

## 5.4.1

### Fixed

- `<DatePicker />` doesn't support `on-clear` by default — fixed.

## 5.4.0

### Added

- Support for `handleClear` method for `<DatePicker />`, `<Input />`, `<Select />`, `<TimePicker />`

## 5.3.2

### Fixed

- Prop Type for `reserveKeyword` on `<Select />`

## 5.3.1

### Fixed

- Removed unnecessary `console.log`

## 5.3.0

### Added

- Support for `<OptionGroup />` for `<Select />` component
- You need to pass an object contains properties `groupLabel` and `options` to generate `<OptionGroup />`

## 5.2.3

### Added

- prop `required` as 5th argument to `renderComponent` method

## 5.2.1

### Updated

- Do not pass `valueKey` prop to `<UISelect />`

## 5.2.0

### Added

- `<VueFormItem />` component as lite copy of `<FormItem />`

## 5.1.0

### Added

- Initial solution to use `vue-form` without `<Form />` wrapper

## 5.0.4

### Fixed

- Array fields of initial values now doing deepClone instead a reference

## 5.0.3

### Fixed

- Array fields of initial values now doing deepClone instead a reference

## 5.0.2

### Added

- Ability to pass `disabled` prop to `<Select />` `<Option />`

## 5.0.1

### Added

- Validation on register for existing value in store

## 5.0.0

### Breaking changes

- Removed `<Autocomplete />` component
- `<ArrayField />` components' parts are doing `setValue` and `addFormField` on register

## 4.14.0

### Added

- Disable fields during async validations

## 4.13.1

### Fixed

- Move call of `asyncValidators` to `on-change` event for `<Select />` instead of `on-blur`. `on-blur` emits before change

## 4.13.0

### Updated

- `disabled` property. Now you can pass an object with `id` and `message` fields to show `message` as `<Notification />` and scroll to element by `id`

## 4.12.0

### Updated

- `omitFormItemLabel` now is a `prop` for `<Checkbox />` and `<Radio />`

## 4.11.5

### Fixed

- Call `handleModelChange` and `v-model` update on `reset`

## 4.11.4

### Fixed

- `createCleanFormValue` now uses internally method `removeFormField`

## 4.11.3

### Fixed

- User offsetTop of offsetParent to scroll to element on error
- Pass the name of the `<Upload />` to `<FileList />`

## 4.11.2

### Fixed

- Export of `VueFormPlugin`

## 4.11.1

### Fixed

- Export of `VueFormPlugin`

## 4.11.0

### Added

- Support for `VueFormPlugin`
- Just use it like any other plugin:

```
import Vue from 'vue'
import { VueFormPlugin } from '@detools/vue-form'

// `size` is the only available option for now
Vue.use(VueFormPlugin, { size: 'small' })
```

## 4.10.1

### Updated

- Preserve white space in the `<Notification />`

## 4.10.0

### Added

- Support for prop `keepValueOnRemove` on `<Form />`
- If you will use this prop — value of any control won't be cleared on remove

## 4.9.4

### Fixed

- Check correct mangled validator name for `isRequired`

## 4.9.3

### Fixed

- Check correct mangled validator name for `isRequired`

## 4.9.2

### Added

- Support for `handleRowClick` prop for `<FileList />` inside `<Upload />`

## 4.9.1

### Added

- Support for `required` prop for every form control
- You can pass `required={null}` if you do not want to show asterisk

## 4.9.0

### Added

- Support for `required` prop for `<FormItem />`
- Now `isRequired` validator will add an element-ui asterisk for required fields

## 4.8.0

### Added

- `valueKey` and `labelKey` can be functions that accept option as argument

## 4.7.5

### Fixed

- Check if field is a part of Array by regexp

## 4.7.4

### Fixed

- Check response before setValue on success `<Upload />`

## 4.7.3

### Fixed

- Unsubscribe from `validateOnReinitialize` if form control is hidden

## 4.7.2

### Fixed

- Support to pass a component as File List to `<Upload />`

## 4.7.1

### Added

- Support to pass a component as File List to `<Upload />`

## 4.7.0

### Added

- Support to render custom File List under `<Upload />`

## 4.6.4

### Updated

- Do not `setTouched` on change `<Upload />`

## 4.6.3

### Fixed

- Do not change uid of every file inside render

## 4.6.2

### Fixed

- `<Upload />` control did not remove items `onRemove`

## 4.6.1

### Fixed

- Smooth `HTMLElement.scrollIntoView()` does not work in Chrome

## 4.6.0

### Changed

- Replace `HTMLElement.focus()` with `HTMLElement.scrollIntoView()`

## 4.5.0

### Changed

- Use `file.id` as `file.uid` if it exists to keep initialValues of form with `Upload` controls consistent

## 4.4.0

### Changed

- `<Autocomplete />`, `<Input />`, `<Select />` prop `autocomplete` changed to `new-password` instead of `off`. https://stackoverflow.com/a/50927328/1671555

## 4.3.3

### Fixed

- `onChange` event for `<RadioGroup />`

## 4.3.2

### Fixed

- Return state value for an `Array` field instead of empty `Array`

## 4.3.1

### Added

- Pass `label` prop from `<ArrayField />` to child

## 4.3.0

### Added

- Pass `setValue` prop from `<ArrayField />` to child

## 4.2.0

### Added

- In 3.6.14 I have removed default value (0) for prop `value`
- Now I have added a separate prop `defaultValue`
- You can use this field in cases where user has removed any value from field, but this field does not support empty value (for example it can be `0`)

## 4.1.1

### Fixed

- Pass `null` on `submit` when value of control became `undefined`

## 4.1.0

### Changed

- `<DatePicker />` prop `editable` is `true` by default

## 4.0.0

### Breaking changes

- Removed `handleModelChange` prop
- Now just pass value to v-model that you've used inside `handleModelChange`

## 3.6.19

### Fixed

- On `Select` event `onBlur` emits the same time as `onChange` it produces an error state for required fields for 1 second
- Now `onBlur` event on `Select` does not set control as `touched`

## 3.6.18

### Fixed

- Pass mixin-level callback `handleFieldChange` to controls

## 3.6.17

### Fixed

- Defaut `precision` prop for `<InputNumber />` set to `0`

## 3.6.16

### Fixed

- Defaut `step` prop for `<InputNumber />` set to `1`

## 3.6.15

### Fixed

- Prefer only String `placeholder` prop for `<InputNumber />`

## 3.6.14

### Fixed

- `<InputNumber />` does not have default `0` value.
- Instead if this, now you can pass a `placeholder` prop (default is `0`)

## 3.6.13

### Fixed

- `pickerOptions` prop for `<DatePicker />` is an `Object`

## 3.6.12

### Fixed

- Do not merge arrays inside `values` on submit

## 3.6.11

### Fixed

- Imports inside `<Popover />` to Element UI

## 3.6.10

### Fixed

- Every import of Element UI component now absolute path to module inside `lib`

## 3.6.9

### Fixed

- Check `error` field inside `Error` on failed submission

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
