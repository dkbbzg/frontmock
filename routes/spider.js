const express = require('express');
const superagent = require('superagent'); // http 方面的库，可以发起 get 或 post 请求
const cheerio = require('cheerio'); // 相当于jquery
const router = express.Router();
const NovelModels = require('../models/novelModels');
const BookModels = require('../models/bookModels');

// 根据书名模糊查询小说信息
// https://www.xbiquwx.la/modules/article/search.php?searchkey=XXXX
router.post('/searchBookFromxbiquwx', function (req, res, next) {
  let name = req.body.name;
  let url = 'https://www.xbiquwx.la/modules/article/search.php?searchkey=' + encodeURI(name);
  console.log(url);
  superagent.get(url)
    .end(async function (err, sres) {
      if (err) {
        return next(err);
      }
      const $ = cheerio.load(sres.text);
      const elem = $('table > tbody > tr');
      let list = [];
      if (elem.length > 1) {
        elem.map((index, item) => {
          if (index) {
            let el = elem.eq(index).find('td');
            let obj = {};
            obj.bookName = el.eq(0).find('a').text();
            obj.bookId = el.eq(0).find('a').attr('href').replace(/\//g, '');
            obj.latestChapterName = el.eq(1).find('a').text();
            obj.latestChapterUrl = el.eq(1).find('a').attr('href').replace(/\//g, '');
            obj.author = el.eq(2).text();
            obj.wordNumber = el.eq(3).text();
            obj.latestUpdate = el.eq(4).text();
            obj.status = el.eq(5).text();
            list.push(obj);
          }
        })
      }
      res.json({
        list: list,
        status: 200,
      })
    });
})

// 获取书籍目录
router.post('/spiderBook', function (req, res, next) {
  let hostname = req.body.hostname;
  let bookId = req.body.bookId;
  let url = hostname + '/' + bookId;
  console.log(url)
  superagent.get(url)
    .end(async function (err, sres) {
      if (err) {
        return next(err);
      }
      const $ = cheerio.load(sres.text);
      let obj = {};
      obj.bookName = $("meta[property=og:novel:book_name]").attr('content');
      obj.bookId = bookId;
      obj.bookBg = $("meta[property=og:image]").attr('content');
      obj.author = $("meta[property=og:novel:author]").attr('content');
      obj.status = $("meta[property=og:novel:status]").attr('content');
      obj.category = $("meta[property=og:novel:category]").attr('content');
      obj.update_time = $("meta[property=og:novel:update_time]").attr('content');
      obj.description = $("meta[property=og:description]").attr('content');
      obj.latestChapterName = $("meta[property=og:novel:latest_chapter_name]").attr('content');
      obj.latestChapterUrl = $("meta[property=og:novel:latest_chapter_url]").attr('content').split('/').pop().split('.html')[0];
      obj.latestvisited = new Date;
      BookModels.update({ bookName: obj.bookName }, obj, { multi: true, upsert: true }, function (err, docs) {
        if (err) console.log(err);
        console.log('获取书籍目录');
      })

      res.send('spidering');
    });
})
// 获取每个章节的内容
router.post('/spiderCharacter', function (req, res, next) {
  let hostname = req.body.hostname;
  let bookId = req.body.bookId;
  let url = hostname + '/' + bookId;
  superagent.get(url)
    .end(async function (err, sres) {
      if (err) {
        return next(err);
      }
      const $ = cheerio.load(sres.text);
      $('#list a').each(async function (idx, element) {
        let $element = $(element);
        let item = {
          bookName: $("meta[property=og:novel:book_name]").attr('content'),
          bookId: bookId,
          CharacterId: `${parseInt($element.attr('href').split('.')[0])}`,
          title: $element.attr('title'),
          href: url + '/' + $element.attr('href')
        }

        await superagent.get(item.href).end(async function (err, eres) {
          if (err) {
            return next(err);
          }
          let content = '';
          const _$ = cheerio.load(eres.text);
          content += _$('#content').html();
          item.content = content;

          NovelModels.update({ bookId: item.bookId }, item, { multi: true, upsert: true }, function (err, docs) {
            if (err) console.log(err);
            console.log('获取每个章节的内容');
          })

          // let _data = new NovelModels(item);
          // await _data.save(function (err, res) {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log(item.title);
          //   }
          // })
        })
      });
      res.send('spidering');
    });
});

module.exports = router;
