const router = require('express').Router()
const books = require('../api/books.api')

const middleware = [books.index, books.filterStatus,
books.filterCountry, books.filterStatusAndCountry]
router.get('/', books.documents)
console.log(...middleware)
router.get('/:id', middleware)



module.exports = router