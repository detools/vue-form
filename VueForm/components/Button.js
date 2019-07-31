import Button from 'element-ui/lib/button'

export default {
  props: [
    'size', // string  medium/small/mini
    'type', // string  primary/success/warning/danger/info/text
    'plain', // boolean — false
    'round', // boolean — false
    'circle', // boolean — false
    'loading', // boolean — false
    'disabled', // boolean — false
    'icon', // string
    'autofocus', // boolean false
    'native-type', // native-type string  button/submit/reset button
  ],

  data() {
    return {
      isLoading: false,
      isDisabled: false,
    }
  },

  methods: {
    async handleClick(...args) {
      if (this.$listeners.click) {
        const result = this.$listeners.click(...args)

        if (result && result.then) {
          this.isLoading = true
          this.isDisabled = true

          try {
            await result
          } finally {
            this.isLoading = false
            this.isDisabled = false
          }
        }
      }
    },
  },

  render() {
    const loading = this.$props.loading || this.isLoading
    const disabled = this.$props.disabled || this.isDisabled

    const props = {
      props: { ...this.$props, loading, disabled },
      attrs: this.$attrs,
      on: {
        ...this.$listeners,
        click: this.handleClick,
      },
    }

    return <Button {...props}>{this.$slots.default}</Button>
  },
}
