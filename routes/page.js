const router = require('express').Router()
const page = require('../api/page.api')

const middleware = [page.index, page.filterStatus]
router.get('/', (req, res) => {
    res.send('ko có dữ liệu')
})
router.get('/:pageID', middleware)

module.exports = router