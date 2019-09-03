export default {
  name: 'VueFormItem',
  componentName: 'VueFormItem',

  props: {
    label: String,
    labelWidth: String,
    labelPosition: String,
    prop: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    showErrorUnderLabel: Boolean,
    validateStatus: String,
    for: String,
    size: String,
  },

  data() {
    return {
      validateState: '',
      validateMessage: '',
    }
  },

  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value
        this.validateState = value ? 'error' : ''
      },
    },

    validateStatus(value) {
      this.validateState = value
    },
  },

  computed: {
    labelFor() {
      return this.for || this.prop
    },

    labelStyle() {
      const styles = undefined

      if (this.form.labelPosition === 'top' || this.labelPosition === 'top') {
        return styles
      }

      return this.labelWidth || this.form.labelWidth || styles
    },

    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName

      while (parentName !== 'VueForm') {
        parent = parent.$parent
        parentName = parent.$options.componentName
      }

      return parent
    },

    sizeClass() {
      return (this.$ELEMENT || {}).size
    },
  },

  methods: {
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
    },
  },

  render() {
    const formItemClassNames = [
      'el-form-item--feedback',
      {
        [`el-form-item--${this.sizeClass}`]: this.sizeClass,
        'is-error': this.validateState === 'error',
        'is-validating': this.validateState === 'validating',
        'is-success': this.validateState === 'success',
        'is-required': this.isRequired || this.required,
      },
    ]

    return (
      <div class="el-form-item" class={formItemClassNames}>
        {this.label && (
          <label for={this.labelFor} class="el-form-item__label" style={{ width: this.labelStyle }}>
            <slot name="label">{this.label + this.form.labelSuffix}</slot>
          </label>
        )}
        <div class="el-form-item__content" style={{ marginLeft: this.labelStyle }}>
          {this.$slots.default}
          <transition name="el-zoom-in-top">
            {this.validateState === 'error' && (
              <slot name="error" error={this.validateMessage}>
                <div class="el-form-item__error">{this.validateMessage}</div>
              </slot>
            )}
          </transition>
        </div>
      </div>
    )
  },
}
