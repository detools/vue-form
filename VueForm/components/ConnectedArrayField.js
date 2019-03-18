import without from 'lodash/without'
import last from 'lodash/last'
import isFunction from 'lodash/isFunction'
import { ConnectedArrayFieldMixin } from '../mixins/ConnectedControl'
import CONSTANTS from '../constants'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: Array,
      default: () => [],
    },

    validators: Array,
    asyncValidators: Array,

    renderField: {
      type: [Function, Object],
      required: true,
    },

    /* FormItem Props */
    formItem: Boolean,
    label: [String, Boolean],
    labelWidth: String,
    required: Boolean,
  },

  mixins: [ConnectedArrayFieldMixin],

  computed: {
    [CONSTANTS.IS_ARRAY_FIELD]() {
      return true
    },

    controlValue() {
      return this.state[0]
    },

    setValue() {
      return this.state[1]
    },

    fields() {
      return {
        forEach: this.forEach,
        get: this.get,
        getAll: this.getAll,
        insert: this.insert,
        length: this.length,
        map: this.map,
        move: this.move,
        pop: this.pop,
        push: this.push,
        remove: this.remove,
        removeAll: this.removeAll,
        shift: this.shift,
        swap: this.swap,
        unshift: this.unshift,
      }
    },
  },

  methods: {
    forEach(callback) {
      return this.controlValue.forEach(callback)
    },

    get(index) {
      return this.controlValue[index]
    },

    getAll() {
      return this.controlValue
    },

    insert(index, value) {
      const nextArray = [
        ...this.controlValue.slice(0, index),
        value,
        ...this.controlValue.slice(index + 1),
      ]

      this.setValue(nextArray)

      return nextArray
    },

    length() {
      return this.controlValue.length
    },

    map(callback) {
      return this.controlValue.map(callback)
    },

    move(fromIndex, toIndex) {
      const elementToMove = this.controlValue[fromIndex]
      const arrayWithout = without(this.controlValue, elementToMove)
      const nextArray = [
        ...arrayWithout.slice(0, toIndex),
        elementToMove,
        ...arrayWithout.slice(toIndex),
      ]

      this.setValue(nextArray)

      return nextArray
    },

    pop() {
      const elementToRemove = last(this.controlValue)
      const nextArray = without(this.controlValue, elementToRemove)

      this.setValue(nextArray)

      return nextArray
    },

    push(value) {
      const nextArray = this.controlValue.concat(value)

      this.setValue(nextArray)

      return nextArray
    },

    remove(index) {
      const nextArray = without(this.controlValue, this.controlValue[index])

      this.setValue(nextArray)

      return nextArray
    },

    removeAll() {
      const nextArray = []

      this.setValue(nextArray)

      return nextArray
    },

    shift() {
      const nextArray = without(this.controlValue, this.controlValue[0])

      this.setValue(nextArray)

      return nextArray
    },

    swap(firstIndex, secondIndex) {
      const [smallerIndex, biggerIndex] = [firstIndex, secondIndex].sort()

      const firstElement = this.controlValue[smallerIndex]
      const secondElement = this.controlValue[biggerIndex]

      const nextArray = [
        ...this.controlValue.slice(0, smallerIndex),
        secondElement,
        ...this.controlValue.slice(smallerIndex + 1, biggerIndex),
        firstElement,
        ...this.controlValue.slice(biggerIndex + 1),
      ]

      this.setValue(nextArray)

      return nextArray
    },

    unshift(value) {
      const nextArray = [value].concat(this.controlValue)

      this.setValue(nextArray)

      return nextArray
    },

    renderComponent(value, setValue, createElement) {
      const props = {
        data: value,
        fields: this.fields,
        name: this.name,
        extra: this.$attrs,
        setValue: this.setValue,
        label: this.label,
      }

      if (isFunction(this.renderField)) {
        return <div id={this.name}>{this.renderField(props)}</div>
      }

      return <div id={this.name}>{createElement(this.renderField, { props })}</div>
    },
  },
}
