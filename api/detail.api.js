const { DETAIL } = require('../crawlSource')
const cheerio = require('cheerio')
const request = require('request')
const express = require('express')
const { getDetailBook } = require('./handle')
var urlRequest
class Detail {
    index(req, res) {
        urlRequest = `${DETAIL}${req.params.key}`
        console.log(urlRequest)
        request(urlRequest, (err, response, html) => {
            if (err) {
                res.json({
                    status_code: 404,
                    error: err.message
                })
            }
            else {
                const $ = cheerio.load(html)
                res.json({
                    data: getDetailBook($, urlRequest)
                })
            }
        })

    }
    documents(req, res) {
        res.send('documents')
    }
}
module.exports = new Detail