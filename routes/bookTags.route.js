const router = require('express').Router()
const bookTags = require('../api/bookTags.api')

// router.get('/', function (req, res) {
//     res.send('xin chào')
// })
router.get('/:id', bookTags.index)
module.exports = router

