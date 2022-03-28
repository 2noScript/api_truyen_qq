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
    },
    getDetailBook: ($, urlRequest) => {
        var listChap = []
        const info = {
            name: $('.book_info .book_avatar img').attr('alt'),
            other_name: $('.book_info .list-info .other-name').text() || 'unknown',
            avatar: $('.book_info .book_avatar img').attr('src'),
            author: $('.book_info .list-info .author a').text(),
            status: $('.book_info .list-info .status p.col-xs-9').text(),
            like: $('.book_info .list-info .number-like').text(),
            follow: (() => {
                const li = $('.book_info .txt .list-info li')
                return li.length > 5 ?
                    $(li[4]).find('.col-xs-9').text() :
                    $(li[3]).find('.col-xs-9').text()
            })(),
            view: (() => {
                const li = $('.book_info .txt .list-info li')
                return li.length > 5 ?
                    $(li[5]).find('.col-xs-9').text() :
                    $(li[4]).find('.col-xs-9').text()
            })(),
            tags: (() => {
                const a = $('.book_info .list01 li a')
                var tagz = []
                a.each((i, it) => {
                    tagz.push($(it).text())
                })
                return tagz
            })(),
            excerpt: $('.book_detail .story-detail-info.detail-content p').text(),
        }
        const ls = $('.list_chapter .works-chapter-item')
        ls.each((index, item) => {
            const oneChap = {
                date: ($($(item).find('.time-chap')).text()).replace(/\s/g, ''),
                chapter: ($($(item).find('.name-chap a')).text()).replace('Chương ', ''),
                key_chap: (() => {
                    var str = ($($(item).find('.name-chap a')).attr('href')).replace(`${urlRequest}-chap-`, '')
                    return str.replace('.html', '')
                })()
            }
            listChap.push(oneChap)
        })
        return {
            info: info,
            list_chap: listChap
        }
    }
}