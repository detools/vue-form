import Form, { ArrayField, Notification } from '@detools/vue-form'
import { Table, TableColumn, Button } from 'element-ui'

const styles = {
  actions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '0 0 -10px 10px',
  },
  button: {
    margin: '0 20px 10px -10px',
  },
}

export default {
  data() {
    return {
      formValues: {},
      initialValues: {
        tasklist: [{ id: 1, name: 'Hello' }, { id: 2, name: 'World' }],
      },
    }
  },

  methods: {
    handleSubmit(values) {
      this.formValues = values
    },

    renderFieldTable({ data, fields }) {
      return (
        <div>
          <Table data={data}>
            <TableColumn label="ID" prop="id" width="100px" />
            <TableColumn label="Name" prop="name" width="250px" />
          </Table>
          <br />
          <br />
          <br />
          <div style={styles.actions}>
            <Button
              style={styles.button}
              on-click={() => {
                fields.forEach((item, index) => {
                  setTimeout(() => {
                    Notification.success(JSON.stringify(item, null, 2))
                  }, index * 500)
                })
              }}>
              forEach
            </Button>
            <Button
              style={styles.button}
              on-click={() => {
                Notification.success(JSON.stringify(fields.get(0), null, 2))
              }}>
              get (1st element for example)
            </Button>
            <Button
              style={styles.button}
              on-click={() => {
                Notification.success(JSON.stringify(fields.getAll(), null, 2))
              }}>
              getAll
            </Button>
            <Button
              style={styles.button}
              on-click={() => fields.insert(2, { id: 3, name: 'Everyone' })}>
              insert (new element — {JSON.stringify({ id: 3, name: 'Everyone' }, null, 2)}
              &nbsp;at index 2)
            </Button>
            <Button style={styles.button} on-click={() => Notification.success(fields.length())}>
              length
            </Button>
            <Button
              style={styles.button}
              on-click={() =>
                Notification.success(JSON.stringify(fields.map(item => item), null, 2), null, 2)
              }>
              map (callback — item => item)
            </Button>
            <Button
              style={styles.button}
              on-click={() => Notification.success(JSON.stringify(fields.move(0, 1), null, 2))}>
              move (from 0 — to 1)
            </Button>
            <Button
              style={styles.button}
              on-click={() => Notification.success(JSON.stringify(fields.pop(), null, 2))}>
              pop
            </Button>
            <Button
              style={styles.button}
              on-click={() =>
                Notification.success(
                  JSON.stringify(fields.push({ id: 3, name: 'Everyone' }), null, 2)
                )
              }>
              push (new element — {JSON.stringify({ id: 3, name: 'Everyone' }, null, 2)})
            </Button>
            <Button
              style={styles.button}
              on-click={() => Notification.success(JSON.stringify(fields.remove(0), null, 2))}>
              remove (at index 0)
            </Button>
            <Button
              style={styles.button}
              on-click={() => Notification.success(JSON.stringify(fields.removeAll(), null, 2))}>
              removeAll
            </Button>
            <Button
              style={styles.button}
              on-click={() => Notification.success(JSON.stringify(fields.shift(), null, 2))}>
              shift
            </Button>
            <Button
              style={styles.button}
              on-click={() => Notification.success(JSON.stringify(fields.swap(0, 1), null, 2))}>
              swap (firstIndex, secondIndex)
            </Button>
            <Button
              style={styles.button}
              on-click={() =>
                Notification.success(
                  JSON.stringify(fields.unshift({ id: 3, name: 'Everyone' }), null, 2)
                )
              }>
              unshift (new element — {JSON.stringify({ id: 3, name: 'Everyone' }, null, 2)})
            </Button>
          </div>
        </div>
      )
    },
  },

  render() {
    return (
      <div>
        <h1>Array Field Form</h1>
        <div class="wrapper">
          <div class="form">
            <Form submit initialValues={this.initialValues} handleSubmit={this.handleSubmit}>
              <ArrayField name="tasklist" renderField={this.renderFieldTable} />
            </Form>
            <br />
            <br />
          </div>
          <div class="values">
            <strong>Form Values</strong>
            <br />
            <br />
            <div>
              <pre>{JSON.stringify(this.formValues, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
