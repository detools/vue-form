<script>
import Table from 'element-ui/lib/table'
import TableColumn from 'element-ui/lib/table-column'
import Pagination from 'element-ui/lib/pagination'
import Tooltip from 'element-ui/lib/tooltip'
import PureCheckbox from 'element-ui/lib/checkbox'
import Button from 'element-ui/lib/button'
import { startCase, chunk, omit, noop, get, isFunction } from 'lodash'
import { Notification } from '@detools/vue-form'
import getEntities from '../../utils/getEntities'

const borderStyle = '1px solid #EBEEF5'
const DEFAULT_ACTIONS_WIDTH = 80
const DEFAUL_PAGE_SIZE = 10

export default {
  props: {
    value: Object,

    name: {
      type: String,
      required: true,
    },

    columns: {
      type: Array,
      required: true,
    },

    data: {
      type: Array,
      required: true,
    },

    stripe: {
      type: Boolean,
      default: () => true,
    },

    handleRowClick: {
      type: Function,
      default: noop,
    },

    handleRowDoubleClick: {
      type: Function,
      default: noop,
    },

    // { column, prop, order }
    handleSortChange: {
      type: Function,
      default: noop,
    },

    renderColumn: Function,

    actions: [Array, Function],

    actionsWidth: {
      type: Number,
      default: () => DEFAULT_ACTIONS_WIDTH,
    },

    actionsTitle: {
      type: String,
      default: () => 'Actions',
    },

    actionsFixed: {
      type: [Boolean, String],
      default: false,
      validatator(value) {
        return value === true || value === false || value === 'leff'
      },
    },

    layout: {
      type: String,
      default: () => 'total,->,slot,sizes,prev,pager,next,jumper',
    },

    emptyText: String,

    maxHeight: Number,

    filterBy: Object,
    filterByAliases: {
      type: Object,
      default: () => ({}),
    },

    pageSize: {
      type: Number,
      default: DEFAUL_PAGE_SIZE,
    },

    pageSizes: {
      type: Array,
      default: () => [10, 20, 30],
    },

    showPagination: {
      type: Boolean,
      default: true,
    },

    rowStyle: Function,
    cellStyle: Function,

    sortable: {
      type: [String, Boolean],
      default: 'custom',
    },

    selection: {
      type: Boolean,
      default: false,
    },

    renderSelection: {
      type: Function,
      default: params => params,
    },

    requireMessageOnDelete: {
      type: Boolean,
      default: false,
    },

    handleSaveEditableField: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      page: 1,
      localPageSize: this.pageSize,
      activeColumns: this.getCorrectActiveColumns(),
      activeColumnsValues: {},
      columnsForm: {},

      // Selection Checkboxes
      checkAll: false,
      isIndeterminate: false,
      checkedRows: {},

      // Editable Cells
      editableCell: {
        id: null,
        property: null,
      },
    }
  },

  beforeMount() {
    const remotePageSize = this.tableParams.pageSize

    if (this.pageSize === DEFAUL_PAGE_SIZE) {
      // Currently there is a bug on the backend
      // Table Clients exists twice in data
      // And the latest options rewrite correct ones
      // The most important part — page size 0
      // That's why I have added logical OR as workaround (0 || 10)
      this.localPageSize = remotePageSize || this.pageSize
    }

    this.activeColumns = this.getCorrectActiveColumns()
  },

  watch: {
    pageSize(pageSize) {
      if (this.localPageSize !== pageSize) {
        this.localPageSize = pageSize
      }
    },
  },

  computed: {
    tableParams() {
      return {}
    },

    tableData() {
      return chunk(this.data, this.localPageSize)
    },

    tableTotal() {
      return this.data.length
    },

    tablePage() {
      return this.page - 1
    },

    currentPageTableData() {
      return this.tableData[this.tablePage]
    },

    allColumns() {
      if (!this.actions) {
        return this.activeColumns
      }

      return this.activeColumns.concat({ width: this.actionsWidth })
    },

    columnsEntities() {
      return getEntities(this.activeColumns, 'prop')
    },

    columnScopedSlots() {
      if (!this.renderColumn) {
        return undefined
      }

      return {
        default: columnProps => {
          const { column, row } = columnProps
          const { property } = column
          const EditableFormComponent = get(this.columnsEntities, [property, 'editable'], null)

          if (EditableFormComponent) {
            const isEdit = this.editableCell.property === property && row === this.editableCell.row

            if (isEdit) {
              return (
                <EditableFormComponent
                  detached
                  name={property}
                  initialValues={row}
                  handleChange={value => this.handleEditableFieldChange({ value, row, property })}
                />
              )
            }

            return this.renderColumn(columnProps, isEdit)
          }

          return this.renderColumn(columnProps)
        },
      }
    },

    styles() {
      return {
        headerCell: {
          backgroundColor: '#DDDDDD',
          color: '#15171c',
          borderRight: borderStyle,
          borderBottom: borderStyle,
          padding: !this.sortable ? '6px 0 5px' : '0',
          lineHeight: 1,
        },
        cell: {
          borderRight: borderStyle,
          borderBottom: borderStyle,
          cursor: 'pointer',
          lineHeight: 1,
        },
      }
    },
  },

  methods: {
    handleEditableFieldChange({ value, row, property }) {
      this.editableCell = {
        id: null,
        property: null,
      }

      return this.handleSaveEditableField({ value, row, property })
    },

    // size-change triggers when page-size changes the new page size
    handleSizeChange(nextPageSize) {
      this.localPageSize = nextPageSize
    },

    // current-change triggers when current-page changes the new current page
    handleCurrentChange(nextPage) {
      this.page = nextPage
    },

    handleHeaderDragend(columnWidth, oldWidth, { property: columnName }) {
      const index = this.activeColumns.findIndex(item => item.prop === columnName)

      // Actions column is not provided in columns array
      if (index !== -1) {
        this.$set(this.activeColumns, index, {
          ...this.activeColumns[index],
          width: columnWidth,
        })
      }
    },

    getCorrectActiveColumns(activeColumnsValues) {
      return this.columns.reduce((memo, column) => {
        if (activeColumnsValues && !activeColumnsValues[column.prop]) {
          return memo
        }

        return memo.concat({
          ...column,
          width: get(this.tableParams, ['columnsWidth', column.prop], column.width),
        })
      }, [])
    },

    handleSubmitChangeModalColumns(values) {
      this.activeColumnsValues = omit(values, ['search'])
      this.activeColumns = this.getCorrectActiveColumns(this.activeColumnsValues)

      this.$refs.columnsModal.hide()
    },

    handleInternalRowClick(row, event, column) {
      if (column.label !== 'Actions') {
        this.handleRowClick(row, event, column)
      }
    },

    handleInternalRowDoubleClick(row, event, column) {
      const columnEntity = this.columnsEntities[column.property]
      const isColumnEditable = get(columnEntity, 'editable', false)

      if (column.label !== 'Actions' && isColumnEditable) {
        this.editableCell = {
          row,
          id: column.id,
          property: column.property,
        }

        this.handleRowDoubleClick(row, event, column)
      }
    },

    renderActionsWrapper({ row, $index }) {
      const actionsArray = isFunction(this.actions) ? this.actions(row, $index) : this.actions
      const actions = actionsArray.map(({ messages = {}, ...action }) => {
        const disabled = isFunction(action.disabled) ? action.disabled(row) : action.disabled
        const icon = isFunction(action.icon) ? action.icon(row) : action.icon
        const title = isFunction(action.title) ? action.title(row) : action.title

        const handleClick = (event, isPopover, comment) => {
          event.stopPropagation()

          const promise = Promise.resolve(action.handler(row, $index, comment))

          promise.then(
            () => Notification.success(messages.success),
            ({ error }) => Notification.error(error || messages.error)
          )

          return promise
        }

        if (icon === 'el-icon-delete') {
          return (
            <Tooltip
              effect="light"
              visibleArrow={false}
              openDelay={500}
              disabled={disabled}
              content={action.tooltip || 'Remove'}
              placement="top">
              <Button
                circle
                class="actions-wrapper__button tooltip"
                size="small"
                icon={icon}
                disabled={disabled}
                on-click={handleClick}>
                {title}
              </Button>
            </Tooltip>
          )
        }

        return (
          <Tooltip
            effect="light"
            visibleArrow={false}
            openDelay={500}
            disabled={disabled}
            content={action.tooltip}
            placement="top">
            <Button
              circle
              class={[
                'actions-wrapper__button tooltip',
                { 'actions-wrapper__button_text': !!title },
              ]}
              size="small"
              icon={icon}
              type="text"
              disabled={disabled}
              on-click={handleClick}>
              {title}
            </Button>
          </Tooltip>
        )
      })

      return <div class="actions-wrapper">{actions}</div>
    },

    renderColumns() {
      return this.activeColumns.map(({ prop, title, width, align, sortable = this.sortable }) => {
        const id = prop || title
        const label = title || startCase(prop)

        return (
          <TableColumn
            resizable
            key={id}
            prop={id}
            width={width}
            label={label}
            sortable={sortable}
            align={align}
            scopedSlots={this.columnScopedSlots}
          />
        )
      })
    },

    renderActionsColumn() {
      if (this.actions) {
        return (
          <TableColumn
            label={this.actionsTitle}
            width={this.actionsWidth}
            fixed={this.actionsFixed}
            scopedSlots={{ default: this.renderActionsWrapper }}
          />
        )
      }

      return null
    },

    forEachRows(memo, row, $index) {
      const { name, disabled } = this.renderSelection({ row, $index })
      const checkboxName = name || (row && `${row.id}`) || $index

      if (disabled) {
        return memo
      }

      return { ...memo, [checkboxName]: true }
    },

    handleCheckAllChange(value) {
      if (value) {
        this.checkedRows = this.currentPageTableData.reduce(this.forEachRows, {})
      } else {
        this.checkedRows = {}
      }

      this.$emit('input', this.checkedRows)

      this.checkAll = value
      this.isIndeterminate = false
    },

    handleChangeCheckbox(checkboxValue) {
      const [action, value] = checkboxValue.split(':')

      const method = action !== 'add' ? this.$delete : this.$set
      method(this.checkedRows, value, true)

      this.$emit('input', this.checkedRows)

      const checkedCount = Object.keys(this.checkedRows).length
      this.checkAll = checkedCount === this.data.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.length
    },

    renderSelectionHeader() {
      return (
        <PureCheckbox
          value={this.checkAll}
          indeterminate={this.isIndeterminate}
          on-change={this.handleCheckAllChange}
        />
      )
    },

    renderSelectionWrapper(...params) {
      const { name, disabled, row, $index } = this.renderSelection(...params)
      const checkboxName = name || (row && `${row.id}`) || $index
      const value = this.checkedRows[checkboxName] || false

      return (
        <PureCheckbox
          key={`${value}_${checkboxName}`}
          disabled={disabled}
          checked={value}
          trueLabel={`add:${checkboxName}`}
          falseLabel={`omit:${checkboxName}`}
          on-change={this.handleChangeCheckbox}
        />
      )
    },

    renderSelectionColumn() {
      if (this.selection) {
        return (
          <TableColumn
            width="36"
            scopedSlots={{
              default: this.renderSelectionWrapper,
              header: this.renderSelectionHeader,
            }}
          />
        )
      }

      return null
    },

    renderBottomSlot() {
      return !this.$scopedSlots.bottom ? null : this.$scopedSlots.bottom(this.allColumns)
    },
  },

  render() {
    return (
      <div class="table-container">
        <Table
          border
          fit
          size="mini"
          class="table-wrapper"
          empty-text={this.data.isInitial ? 'Loading...' : this.emptyText}
          header-cell-style={this.styles.headerCell}
          cell-style={this.styles.cell}
          row-style={this.rowStyle}
          cell-style={this.cellStyle}
          stripe={this.stripe}
          data={this.currentPageTableData}
          max-height={this.maxHeight}
          on-row-click={this.handleInternalRowClick}
          on-row-dblclick={this.handleInternalRowDoubleClick}
          on-header-dragend={this.handleHeaderDragend}
          on-sort-change={this.handleSortChange}>
          {this.renderActionsColumn()}
          {this.renderSelectionColumn()}
          {this.renderColumns()}
        </Table>
        {this.renderBottomSlot()}
        <div style="height: 18px" />
        {this.showPagination && (
          <div class="pagination">
            <Pagination
              page-size={this.localPageSize}
              total={this.tableTotal}
              page-sizes={this.pageSizes}
              layout={this.layout}
              on-size-change={this.handleSizeChange}
              on-current-change={this.handleCurrentChange}
            />
          </div>
        )}
      </div>
    )
  },
}
</script>

<style scoped lang="less">
.table-container {
  width: min-content;
  max-width: 100%;
}

.table-wrapper {
  border: none;
  border-left: 1px solid #ebeef5;

  &:before,
  &:after {
    display: none;
  }
}

.input,
.checkbox {
  margin-bottom: 5px;
}

.actions-wrapper {
  text-align: center;

  &__button {
    border: none;
    padding: 0;
    color: #606266;
    font-size: 18px;

    &_text {
      font-size: 12px;
    }
  }

  &__popover {
    width: 18px;
    overflow: hidden;
    display: inline-block;
    position: relative;
    vertical-align: top;

    .actions-wrapper__button + & {
      margin-left: 10px;
    }
  }
}

.pagination {
  padding-left: 3px;
}

.manage-columns {
  font-weight: normal;
  margin-right: 10px;
  cursor: pointer;
}
</style>
