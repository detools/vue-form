<script>
import { Autocomplete, Button } from '@detools/vue-form'

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    extra: {
      type: Object,
      required: true,
    },

    fields: {
      type: Object,
      required: true,
    },
  },

  methods: {
    add() {
      return this.data.length ? this.fields.push('') : this.fields.push(['', ''])
    },

    fetchSuggestions(query, callback) {
      if (query !== '') {
        setTimeout(() => {
          callback(
            [
              { id: 45, name: 'Donald Trump' },
              { id: 44, name: 'Barack Obama' },
              { id: 43, name: 'George W. Bush' },
              { id: 42, name: 'Bill Clinton' },
              { id: 41, name: 'George H. W. Bush' },
              { id: 40, name: 'Ronald Reagan' },
              { id: 39, name: 'Jimmy Carter' },
            ].filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
          )
        })
      } else {
        callback([])
      }
    },
  },

  render() {
    const inputs = this.data.length ? this.data : [{}]

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <div>
          {inputs.map((value, index) => (
            <div>
              <Autocomplete
                formItem
                placeholder="Autocomplete"
                name={`${this.name}[${index}]`}
                fetchSuggestions={this.fetchSuggestions}
                options={this.extra.options}
              />
            </div>
          ))}
        </div>
        <Button
          circle
          style={{ marginBottom: '22px' }}
          type="primary"
          icon="el-icon-plus"
          on-click={this.add}
        />
      </div>
    )
  },
}
</script>
