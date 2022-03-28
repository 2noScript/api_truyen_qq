const manga = require('./manga.route')
const books = require('./books.route')
const bookTags = require('./bookTags.route')
const detail = require('./detail.route')
const watch = require('./watch.route')
function route(app) {
    app.get('/', (req, res) => {
        res.send('api of 2noscript')
    })
    app.use('/manga', manga)
    app.use('/books', books)
    app.use('/book-tags', bookTags)
    app.use('/detail', detail)
    app.use('/watch', watch)
}
module.exports = route

