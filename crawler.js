var Crawler = require("crawler");
var fs = require("fs");

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
                fs.appendFile(`./sites/${$("title").text()}.txt`, $(link).attr('href') + '\n', () => {
                    console.log('ok1')
                })
                // console.log($(link).text() + ':\n  ' + $(link).attr('href'));
            });
        }
        done();
    }
});

// Queue a list of URLs
c.queue('http://www.amiagr.ir/');
