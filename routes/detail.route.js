const router = require('express').Router()
const detail = require('../api/detail.api')
router.get('/', detail.documents)
router.get('/:key', detail.index)
module.exports = router