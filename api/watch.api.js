const { WATCH } = require('../crawlSource')
const request = require('request')
const cheerio = require('cheerio')
var urlRequest = ''
class Watch {
    index(req, res) {
        if (req.query.chap) {
            urlRequest = `${WATCH}${req.params.key}-chap-${req.query.chap}`
            request(urlRequest, (err, response, html) => {
                if (err) {
                    res.json({ error: err.message })
                }
                else {
                    const $ = cheerio.load(html)
                    const ls = $('.chapter_content .page-chapter img.lazy')
                    var data = []
                    ls.each((index, item) => {
                        console.log($(item).attr('data-cdn'))
                        data.push($(item).attr('data-cdn'))
                    })
                    res.json({
                        log: {
                            key_book: req.params.key,
                            key_chap: req.query.chap
                        },
                        data: data
                    })
                }
            })
        }
        else {
            res.send(`can't get chap`)
        }
    }


    documents(req, res) {
        res.send('this is documents');
    }
}
module.exports = new Watch