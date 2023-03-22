const { Readability } = require('@mozilla/readability');
const { JSDOM } = require("jsdom");
const request = require('request');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  
  request(req.body.url, function (error, response, body) {
    if (error) {
      res.json({'code': 20002, 'msg': error})
    } else {
      const dom = new JSDOM(body);
      let reader = new Readability(dom.window.document);
      let article = reader.parse();
      res.json({'code': 20000, 'data': {title: article.title, content: article.textContent}})
    }
  });
});

module.exports = router;
