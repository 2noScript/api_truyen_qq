const manga = require('./manga')
const books = require('./books')

function route(app) {
    app.get('/', (req, res) => {
        res.send('api of 2noscript')
    })
    app.use('/manga', manga)
    app.use('/books', books)
}
module.exports = route

