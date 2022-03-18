const manga = require('./manga')

function route(app) {
    app.get('/', (req, res) => {
        res.send('api of 2noscript')
    })
    app.use('/manga', manga)
}
module.exports = route

