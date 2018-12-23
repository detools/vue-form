<script>
import { Input, Button } from '@detools/vue-form'

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

    fields: {
      type: Object,
      required: true,
    },
  },

  methods: {
    add() {
      return this.data.length ? this.fields.push({}) : this.fields.push([{}, {}])
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
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Input
                formItem
                style={{ marginRight: '10px' }}
                placeholder="First Name"
                name={`${this.name}[${index}].firstName`}
              />
              <Input formItem placeholder="Last Name" name={`${this.name}[${index}].lastName`} />
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
