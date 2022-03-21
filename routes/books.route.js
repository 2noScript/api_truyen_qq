const router = require('express').Router()
const books = require('../api/books.api')

const middleware = [books.handle, books.index]
router.get('/', books.documents)
router.get('/:id', middleware)
module.exports = router