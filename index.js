const express = require('express')
const route = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})