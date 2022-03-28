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
                status_code: 200,
                logs: {
                    tag: Object.keys(tags)[req.params.id],
                    page: req.query.page || 'undefined or all',
                    status: Object.keys(status)[req.query.status] || 'undefined or all',
                    country: Object.keys(country)[req.query.country] || 'undefinded or all',
                    sort: Object.keys(sort)[req.query.sort] || 'undefinded or all',
                    count: listBook.length

                },
                data: listBook
            })
        })
}

var urlRequest
class bookTags {
    index(req, res) {
        if (req.query.sort)
            crawlDataToJson(req, res, `${urlRequest}&sort=${req.query.sort}`)
        else
            crawlDataToJson(req, res, urlRequest)
    }
    handle(req, res, next) {

        // page=value , status=null, country=null
        // id là index của tags
        const subUrl = `${TAGS}${Object.values(tags)[req.params.id]}/trang-${req.query.page}`
        if (!req.query.status && !req.query.country)
            urlRequest =
                `${subUrl}`
        // page=value , status=value, country=null
        else if (req.query.status && !req.query.country)
            urlRequest =
                `${subUrl}?status=${Object.values(status)[req.query.status]}`

        // page=value , status=null,country=value
        else if (!req.query.status && req.query.country)
            urlRequest =
                `${subUrl}?country=${Object.values(country)[req.query.country]}`
        // page=value , status=value,country=value
        else
            urlRequest =
                `${subUrl}?status=${Object.values(status)[req.query.status]}&country=${Object.values(country)[req.query.country]}`

        next()
    }
    documents(req, res) {
    }
}
module.exports = new bookTags