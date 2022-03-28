const { HOME, MANGA } = require('../crawlSource/index')
const cheerio = require('cheerio')
const request = require('request')

const url = `https://www.youtube.com/watch?v=QtZecjBUvsE&list=RD-Dxp285RQrs&index=2`
class Manga {
    // get /suggest
    suggest(req, res) {
        let options = {
            url: HOME,
            headers: {
                'Cookie': 'QiQiSession=1o5tuq9am9buhjnuf3j7gfksk3; visit-read=6240fc231e91c-6240fc231e91f; setting_dark_mode=dark; _ga=GA1.2.284885337.1648426019; _gid=GA1.2.1751870230.1648426019; VinaHost-Shield=b341b61e5599e62c7e3fc96993acfefc',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'
            }
        }
        request(options, (err, response, html) => {
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
                // res.send(html)
            }
        })
    }

}
module.exports = new Manga;