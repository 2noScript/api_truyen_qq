const router = require('express').Router()
const manga = require('../api/manga.api')
router.get('/suggest', manga.suggest)

module.exports = router