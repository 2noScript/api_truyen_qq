// const cheerio = require('cheerio')
const { HOME, MANGA, PAGE } = require('../crawlSource/index')
module.exports = {
    getListBook: ($) => {
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
}