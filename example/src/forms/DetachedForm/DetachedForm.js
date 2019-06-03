import Vue from 'vue'
import { Input, InputNumber } from '@detools/vue-form'
import Table from '@/components/Table'

export default {
  data() {
    return {
      data: [
        { id: 1, name: 'John', age: 23, weight: 80, height: 190 },
        { id: 2, name: 'Tom', age: 31, weight: 95, height: 180 },
        { id: 3, name: 'Gina', age: 18, weight: 65, height: 165 },
        { id: 4, name: 'Ellis', age: 29, weight: 70, height: 160 },
      ],
      columns: [
        { prop: 'name', width: 150, editable: Input },
        { prop: 'age', width: 150, editable: InputNumber },
        { prop: 'weight', width: 150, editable: InputNumber },
        { prop: 'height', width: 150, editable: InputNumber },
      ],
      actions: [{ icon: 'el-icon-delete', handler: (row, index) => Vue.delete(this.data, index) }],
    }
  },

  methods: {
    renderColumn({ column: { property }, row }) {
      const cellValue = row[property]

      return cellValue
    },

    handleSaveEditableField({ value, row, property }) {
      const manIndex = this.data.findIndex(({ id }) => id === row.id)

      Vue.set(this.data[manIndex], property, value)
    },
  },

  render() {
    return (
      <div>
        <h1>Detached Form</h1>
        <Table
          name="people"
          data={this.data}
          columns={this.columns}
          actions={this.actions}
          renderColumn={this.renderColumn}
          handleSaveEditableField={this.handleSaveEditableField}
        />
        <br />
        <br />
      </div>
    )
  },
}
