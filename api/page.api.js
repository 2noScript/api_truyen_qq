const { HOME, MANGA, PAGE } = require('../crawlSource/index')
const cheerio = require('cheerio')
const request = require('request')
class Page {

    index(req, res, next) {
        (req.query.status || req.query.country) && next()

        request(`${PAGE}trang-${req.params.pageID}.html`, (err, response, html) => {
            if (err) {
                res.json({ error: err.message })
            }
            else {
                const $ = cheerio.load(html)
                const listManga = $('#main_homepage .list_grid_out ul li')
                const listBook = []
                listManga.each((index, item) => {
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
                                    info.push($(it).text())
                                })
                                return info
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

                res.json({
                    count: listBook.length,
                    data: listBook
                })
            }

        })


    }
    filterStatus(req, res, next) {
        res.send('vào status')
    }

}
module.exports = new Page