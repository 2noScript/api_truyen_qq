const express = require('express')
const route = require('./routes')
const app = express()

route(app)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})