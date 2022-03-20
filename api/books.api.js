const { HOME, MANGA, PAGE } = require('../crawlSource/index')
const cheerio = require('cheerio')
const request = require('request')

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
const keyID = ['truyen-moi-cap-nhat', 'truyen-con-gai', 'truyen-con-trai',
    'top-ngay', 'top-tuan', 'top-thang', 'truyen-yeu-thich', 'truyen-tranh-moi',
    'truyen-hoan-thanh', 'truyen-ngau-nhien']
// function custom raw html-> dataJson 
function getListBook($) {
    console.log(keyID[9])
    const objListBook = $('#main_homepage .list_grid_out ul li')
    const listBook = []
    objListBook.each((index, item) => {
        const oneBook = {
            book_name: $($(item).find('.book_avatar a img')).attr('alt'),
            book_img: $($(item).find('.book_avatar a img')).attr('data-src'),
            key: ($($(item).find('.book_info .book_name a')).attr('href')).replace(MANGA, ''),
            last_chapter: (() => {
                let a = $($(item).find('.book_info .book_name a')).attr('href')
                let b = $($(item).find('.book_info .last_chapter a')).attr('href')
                let s = b.replace(a, '')
                return (s.replace('-chap-', '')).replace('.html', '')
            })(),
            time_ago: $($(item).find('.book_avatar .time-ago')).text(),
            more_info: {
                // lượt theo dõi
                info: (() => {
                    const info = []
                    const p = $(item).find('.book_info .more-info .info')
                    p.each((ind, it) => {
                        var src = $(it).text()
                        src = src.slice(src.indexOf(":") + 2, src.length)
                        info.push(src)
                    })

                    return {
                        status: info[0],
                        view: info[1],
                        follow: info[2]
                    }
                })(),
                list_tags: (() => {
                    const tags = []
                    const p = $(item).find('.book_info .more-info .list-tags .blue')
                    p.each((ind, it) => {
                        tags.push($(it).text())
                    })
                    return tags
                })(),
                excerpt: $($(item).find('.book_info .more-info .excerpt')).text(),
            }
        }
        listBook.push(oneBook)
    })
    return listBook
}

class Page {
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
    // pageID=value,staus=undefined,country=undefined
    index(req, res, next) {
        if (req.query.status || req.query.country) next()
        else {
            request(`${HOME}${keyID[req.params.id]}/trang-${req.query.page}`,
                (err, response, html) => {
                    err && res.json({ error: err.message })
                    const $ = cheerio.load(html)
                    const listBook = getListBook($)
                    res.json({
                        type: keyID[req.params.id],
                        count: listBook.length,
                        data: listBook
                    })
                })
        }
    }
    //pageID=value,staus=value,country=undefined
    filterStatus(req, res, next) {
        if (!req.query.status || req.query.country) next()
        else
            request(`${HOME}${keyID[req.params.id]}/trang-${req.query.page}?status=${req.query.status}`,
                (err, response, html) => {
                    err && res.json({ error: err.message })
                    const $ = cheerio.load(html)
                    const listBook = getListBook($)
                    res.json({
                        count: listBook.length,
                        data: listBook
                    })
                })
    }
    //pageID=value,staus=undefined,country=value

    filterCountry(req, res, next) {
        if (req.query.status || !req.query.country) next()
        else
            request(`${HOME}${keyID[req.params.id]}/trang-${req.query.page}?country=${req.query.country}`,
                (err, response, html) => {
                    err && res.json({ error: err.message })
                    const $ = cheerio.load(html)
                    const listBook = getListBook($)
                    res.json({
                        count: listBook.length,
                        data: listBook
                    })
                })

    }
    //pageID=value,staus=value,country=value
    filterStatusAndCountry(req, res, next) {
        request(`${HOME}${keyID[req.params.id]}/trang-${req.query.page}?status=${req.query.status}&country=${req.query.country}`,
            (err, response, html) => {
                err && res.json({ error: err.message })
                const $ = cheerio.load(html)
                const listBook = getListBook($)
                res.json({
                    count: listBook.length,
                    data: listBook
                })
            })
    }
    documents(req, res) {
        res.send('<a href="https://youtu.be/XsSC3mBJfok">đây là youtube của mình </a>')
    }

}
module.exports = new Page