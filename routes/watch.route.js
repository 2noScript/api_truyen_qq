const router = require('express').Router()
const watch = require('../api/watch.api')
router.get('/:key', watch.index)
router.get('/', watch.documents)
module.exports = router