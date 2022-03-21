const manga = require('./manga.route')
const books = require('./books.route')
const bookTags = require('./bookTags.route')
function route(app) {
    app.get('/', (req, res) => {
        res.send('api of 2noscript')
    })
    app.use('/manga', manga)
    app.use('/books', books)
    app.use('/book-tags', bookTags)
}
module.exports = route

