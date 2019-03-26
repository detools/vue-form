const express = require('express')
const fileUpload = require('express-fileupload')
const castArray = require('lodash/castArray')

const app = express()
const port = 33333

app.use(fileUpload())

app.post('/upload', (req, res) => {
  const { file } = req.files

  res.send({ items: castArray({ name: file.name }) })
})

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`PROD App Listening on Port: ${port}!`))
