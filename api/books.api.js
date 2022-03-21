const { HOME, MANGA, PAGE } = require('../crawlSource/index')
const cheerio = require('cheerio')
const request = require('request')
const { getListBook } = require('./handle')
const { status, country, keyID } = require('./base')
/**  
 * *ID:
 *    0 default(mới cập nhật)
 *    1 truyện con gái
 *    2 truyện con trai
 *    3 top ngày
 *    4 top tuần
 *    5 top tháng
 *    6 yêu thích 
 *    7 truyện mới
 *    8 truyện full
 *    9 truyện ngẫu nhiên
*/
// const keyID = ['truyen-moi-cap-nhat', 'truyen-con-gai', 'truyen-con-trai',
//     'top-ngay', 'top-tuan', 'top-thang', 'truyen-yeu-thich', 'truyen-tranh-moi',
//     'truyen-hoan-thanh', 'truyen-ngau-nhien']
// function custom raw html-> dataJson 
function crawlDataToJson(req, res, urlRequest) {
    request(urlRequest,
        (err, response, html) => {
            err && res.json({ error: err.message })
            if (!keyID[req.params.id]) res.json({
                status_code: 404,
                message: `keyID ${keyID[req.params.id]}`
            })
            else {
                const $ = cheerio.load(html)
                const listBook = getListBook($)
                res.json({
                    status_code: 200,
                    type: keyID[req.params.id] || 'undefinde or all',
                    logs: {
                        page: req.params.id,
                        status: Object.keys(status)[req.query.status] || 'undefined or all',
                        country: Object.keys(country)[req.query.country] || 'undefinded or all'
                    },
                    count: listBook.length,
                    data: listBook
                })
            }
        })
}
var urlRequest
class books {
    /**
     * *ID:
     *    0 default(mới cập nhật)
     *    1 truyện con gái
     *    2 truyện con trai
     *    3 top ngày
     *    4 top tuần
     *    5 top tháng
     *    6 yêu thích 
     *    7 truyện mới
     *    8 truyện full
     *    9 truyện ngẫu nhiên
     * 
     * *page
     * *parameters:staus,country
     *  ?staus:0 đang tiến hành ,2 hoàn thành
     * ? country:
     *           1 china
     *           2 vietnam
     *           3 korea
     *           4 japan
     *           5 america
     *  
     *
     */
    index(req, res, next) {
        console.log(urlRequest)
        crawlDataToJson(req, res, urlRequest)
    }
    handle(req, res, next) {
        // page=value , status=null, country=null
        if (!req.query.status && !req.query.country) {
            urlRequest =
                `${HOME}${keyID[req.params.id]}/trang-${req.query.page}`
            next()
        }
        // page=value , status=value, country=null
        else if (req.query.status && !req.query.country) {
            urlRequest =
                `${HOME}${keyID[req.params.id]}/trang-${req.query.page}?status=${Object.values(status)[req.query.status]}`
            next()
        }
        // page=value , status=null,country=value
        else if (!req.query.status && req.query.country) {
            urlRequest =
                `${HOME}${keyID[req.params.id]}/trang-${req.query.page}?country=${Object.values(country)[req.query.country]}`
            next()
        }
        // page=value , status=value,country=value
        else {
            urlRequest =
                `${HOME}${keyID[req.params.id]}/trang-${req.query.page}?status=${Object.values(status)[req.query.status]}&country=${Object.values(country)[req.query.country]}`
            next()
        }
    }
    // get "/" 
    documents(req, res) {
        res.send('<a href="https://youtu.be/XsSC3mBJfok">đây là youtube của mình </a>')
    }

}
module.exports = new books