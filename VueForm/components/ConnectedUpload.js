import Upload from 'element-ui/lib/upload'
import noop from 'lodash/noop'
import isBoolean from 'lodash/isBoolean'
import isPlainObject from 'lodash/isPlainObject'
import camelCase from 'lodash/camelCase'
import ConnectedControlMixin from '../mixins/ConnectedControl'

const defaultHandler = {
  type: Function,
  default: noop,
}

const httpRequest = ({ headers, file, filename, action }) => {
  const method = 'POST'

  const body = new FormData()

  body.append(filename, file)

  return fetch(action, {
    method,
    headers,
    body,
  }).then(response => response.json())
}

const ConnectedUpload = {
  props: {
    name: {
      type: String,
      required: true,
    },

    endpoint: {
      type: String,
      required: true,
    },

    headers: Object,
    multiple: Boolean,
    data: Object,

    // name on element-ui
    prop: {
      type: String,
      default: 'file',
    },

    withCredentials: Boolean,
    showFileList: {
      type: [Boolean, Function, Object],
      default: false,
    },
    drag: Boolean,
    accept: String,

    // Unique Id of uploaded file in it model
    fileKey: {
      type: String,
      default: 'id',
    },

    // hook function when clicking the uploaded files
    handlePreview: defaultHandler,

    // hook function when files are removed
    handleRemove: defaultHandler,

    // hook function when uploaded successfully
    handleSuccess: defaultHandler,

    // hook function when some errors occurs
    handleError: defaultHandler,

    // hook function when some progress occurs
    handleProgress: defaultHandler,

    // hook function when select file or upload file success or upload file fail
    handleChange: defaultHandler,

    // hook function before uploading with the file to be uploaded as its parameter.
    // If false is returned or a Promise is returned and then is rejected, uploading will be aborted
    beforeUpload: defaultHandler,

    // hook function before removing a file with the file and file list as its parameters.
    // If false is returned or a Promise is returned and then is rejected, removing will be aborted
    beforeRemove: defaultHandler,

    // hook function when limit is exceeded
    handleExceed: defaultHandler,

    formatResponse: {
      type: Function,
      default: response => response,
    },

    fileList: {
      type: Array,
      default: () => [],
    },
    isEditDisabled: [Boolean, Function],
    isRemoveDisabled: [Boolean, Function],

    listType: {
      type: String,
      default: 'text',
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    httpRequest: {
      type: Function,
      default: httpRequest,
    },
    disabled: Boolean,
    limit: Number,

    // Slots
    trigger: [Function, Object],
    tip: [Function, Object],

    // vue-form Props
    validators: Array,
    asyncValidators: Array,

    // File List Props
    handleRowClick: Function,
  },

  mixins: [ConnectedControlMixin],

  computed: {
    callbacks() {
      return {
        props: {
          onPreview: this.handlePreview,
          onRemove: this.handleFieldRemove,
          onSuccess: this.handleFieldSuccess,
          onError: this.handleError,
          onProgress: this.handleProgress,
          onChange: this.handleChange,
          onExceed: this.handleExceed,
        },
      }
    },

    shouldRenderCustomFileList() {
      return !isBoolean(this.showFileList)
    },

    isFileListAComponent() {
      if (!this.shouldRenderCustomFileList) {
        return false
      }

      return isPlainObject(this.showFileList)
    },
  },

  methods: {
    clearFiles() {
      return this.$refs.uiUpload.clearFiles()
    },

    abort(...args) {
      return this.$refs.uiUpload.abort(...args)
    },

    submit() {
      return this.$refs.uiUpload.submit()
    },

    handleFieldRemove(...args) {
      this.setTouched()
      this.setDirty()

      return Promise.resolve()
        .then(() => this.handleRemove(...args))
        .then(() => {
          const [value, setValue] = this.state
          const { [this.fileKey]: id, uid } = args[0]
          let nextValue

          if (id) {
            nextValue = value.filter(file => file[this.fileKey] !== id)
          } else {
            nextValue = value.filter(file => file.uid !== uid)
          }

          setValue(nextValue)
        })
    },

    handleFieldSuccess(response, file, fileList) {
      this.setTouched()
      this.setDirty()

      this.handleSuccess(response, file, fileList)

      const [value = [], setValue] = this.state
      const formattedResponse = this.formatResponse(response, file, fileList)

      if (formattedResponse && formattedResponse.length) {
        const [uploadedFile] = formattedResponse
        const nextValue = value.concat({ ...uploadedFile, uid: file.id || file.uid })

        setValue(nextValue)
      }
    },

    renderFileList(fileList, removeFileHandler, labelWidth, handleRowClick) {
      const handleRemoveFile = this.handleRemove !== noop ? removeFileHandler : undefined
      if (this.isFileListAComponent) {
        const FileList = this.showFileList

        return (
          <FileList
            name={this.name}
            fileList={fileList}
            labelWidth={labelWidth}
            handleRowClick={handleRowClick}
            handleRemoveFile={handleRemoveFile}
            isEditDisabled={this.isEditDisabled}
            isRemoveDisabled={this.isRemoveDisabled}
          />
        )
      }

      return this.showFileList({
        name: this.name,
        fileList,
        labelWidth,
        handleRowClick,
        handleRemoveFile,
        isEditDisabled: this.isEditDisabled,
        isRemoveDisabled: this.isRemoveDisabled,
      })
    },

    renderComponent(value, setValue, createElement, initialValue) {
      const fileList = value || initialValue

      const uploadComponent = (
        <Upload
          {...this.callbacks}
          ref="uiUpload"
          action={this.endpoint}
          headers={this.headers}
          multiple={this.multiple}
          data={this.data}
          name={camelCase(this.prop)}
          with-credentials={this.withCredentials}
          show-file-list={this.shouldRenderCustomFileList ? false : this.showFileList}
          drag={this.drag}
          accept={this.accept}
          before-upload={this.beforeUpload}
          before-remove={this.beforeRemove}
          file-list={fileList || this.fileList}
          list-type={this.listType}
          auto-upload={this.autoUpload}
          http-request={this.httpRequest}
          disabled={this.isFieldDisabled}
          limit={this.limit}>
          {Boolean(this.trigger) && <template slot="trigger">{this.trigger}</template>}
          {Boolean(this.tip) && <template slot="tip">{this.tip}</template>}
          {this.$slots.default}
        </Upload>
      )

      if (this.shouldRenderCustomFileList) {
        return (
          <div>
            {uploadComponent}
            {this.renderFileList(
              fileList,
              this.handleFieldRemove,
              this.labelWidth,
              this.handleRowClick
            )}
          </div>
        )
      }

      return uploadComponent
    },
  },
}

export default ConnectedUpload
