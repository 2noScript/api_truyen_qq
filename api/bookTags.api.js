const { HOME, MANGA, PAGE, TAGS } = require('../crawlSource/index')
const cheerio = require('cheerio')
const request = require('request')
const { getListBook } = require('./handle')
const { status, country, tags, sort } = require('./base')

function crawlDataToJson(req, res, urlRequest) {
    request(urlRequest,
        (err, response, html) => {
            err && res.json({ error: err.message })
            const $ = cheerio.load(html)
            const listBook = getListBook($)
            res.json({
                type: keyID[req.params.id],
                logs: {
                    page: req.params.id,
                    status: Object.keys(status)[req.query.status] || 'undefined or all',
                    country: Object.keys(country)[req.query.country] || 'undefinded or all'
                },
                count: listBook.length,
                data: listBook
            })
        })
}

class bookTags {
    index(req, res) {
        res.send('xin')
    }
    handle(req, res, next) {

    }
    documents(req, res) {

    }
}
module.exports = new bookTags