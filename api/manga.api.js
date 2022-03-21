const { HOME, MANGA } = require('../crawlSource/index')
const cheerio = require('cheerio')
const request = require('request')
class Manga {
    // get /suggest
    suggest(req, res) {
        request(HOME, (err, response, html) => {
            if (err) {
                res.json({
                    error: `${err.message}`
                })
            }
            else {
                const $ = cheerio.load(html)
                const data = []
                const listSuggest = $('.homepage_suggest li')
                listSuggest.each((index, item) => {
                    var oneBook = {
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

                    }
                    data.push(oneBook)
                })
                res.json({
                    status_code: 200,
                    count: data.length,
                    data: data,
                })
            }
        })
    }

}
module.exports = new Manga;