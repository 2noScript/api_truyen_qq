const manga = require('./manga')
const page = require('./page')

function route(app) {
    app.get('/', (req, res) => {
        res.send('api of 2noscript')
    })
    app.use('/manga', manga)
    app.use('/page', page)
}
module.exports = route

