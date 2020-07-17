var express = require('express')
var app = express()
var router = express.Router()
var Crawler = require("crawler");
var fs = require("fs");
let psl = require('psl');

let domain = ''

var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // fs.createWriteStream(`${res.options.filename}.html`).write($("a").text()+ '/n');
            $("a").each(function(i, link){
                fs.appendFile(`./sites/${domain}.txt`, $(link).attr('href') + '\n', (err) => {
                    if (err) console.log(err)
                })
            });
        }
        done();
    }
});

router.post('/', (req, res, next) => {
    let url = req.body.url.replace(/(^\w+:|^)\/\//, '');
    var parsed = psl.parse(url);
    console.log(parsed.sld); // 'google'
    domain = parsed.sld

    // Queue a list of URLs
    c.queue(req.body.url);
    res.render('home', { domain: domain, code: 200})
})


module.exports = router;
