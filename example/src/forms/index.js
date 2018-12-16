import Vue from 'vue'
import Router from 'vue-router'

import BasicForm from './BasicForm'
import InlineValidatorsForm from './InlineValidatorsForm'
import AsyncSubmitForm from './AsyncSubmitForm'
import ImmediateForm from './ImmediateForm'
import SyncValidationForm from './SyncValidationForm'
import AllValidationsForm from './AllValidationsForm'
import ArrayFieldForm from './ArrayFieldForm'
import AutocompleteForm from './AutocompleteForm'
import UploadForm from './UploadForm'
import StoreOutsideForm from './StoreOutsideForm'

Vue.use(Router)

const routes = [
  {
    name: 'BasicForm',
    component: BasicForm,
    path: '/basic-form',
    alias: '/',
  },
  {
    name: 'InlineValidatorsForm',
    component: InlineValidatorsForm,
    path: '/inline-validators-form',
  },
  {
    name: 'AsyncSubmitForm',
    component: AsyncSubmitForm,
    path: '/async-submit-form',
  },
  {
    name: 'ImmediateForm',
    component: ImmediateForm,
    path: '/immediate-form',
  },
  {
    name: 'SyncValidationForm',
    component: SyncValidationForm,
    path: '/sync-validation-form',
  },
  {
    name: 'AllValidationsForm',
    component: AllValidationsForm,
    path: '/all-validations-form',
  },
  {
    name: 'ArrayFieldForm',
    component: ArrayFieldForm,
    path: '/array-field-form',
  },
  {
    name: 'AutocompleteForm',
    component: AutocompleteForm,
    path: '/autocomplete-form',
  },
  {
    name: 'UploadForm',
    component: UploadForm,
    path: '/upload-form',
  },
  {
    name: 'StoreOutsideForm',
    component: StoreOutsideForm,
    path: '/store-outside-form',
  },
]

export default new Router({ routes })
