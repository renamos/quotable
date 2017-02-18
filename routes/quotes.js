var express = require('express');
var router = express.Router();
var quote = require('../models/quotes-models.js');


// Add headers
router.use(function (req, res, next) {
    console.log("hoola");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


router.route('/create')
    .post(function (req, res) {
        quote.findOne({
                quote: req.body.quote
            },
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data) {
                    res.json({
                        message: 'Quote already exists!'
                    })
                } else {
                    var newQuote = new quote();
                    newQuote.quote = req.body.quote;
                    newQuote.author = req.body.author;
                    newQuote.book = req.body.book;
                    newQuote.save(function (err, quote) {
                        if (err) {
                            console.log(err)
                            return
                        }

                        res.json({
                            message: 'New quote has been created!',
                            data: quote
                        })
                    })

                }
            })
    });


router.route('/all')
    .get(function (req, res) {
        quote.find(function (err, quotes) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                data: quotes
            })
        }).sort("author")
    });

router.route('/random')
    .get(function (req, res) {
        quote.findOneRandom(function (err, quote) {
            if (err) {
                console.log(err)
                return
            }
            res.json({
                data: quote
            })
        })
    });

router.route('/search/:value/:type')
    .get(function (req, res) {

        quote.find({queryType: new RegExp(req.params.value, "i")},
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data.length > 0) {
                    console.log(data)
                    res.json({
                        data: data
                    })
                } else {
                    res.json({
                        message: 'No results'
                    })
                }
            })
    });


router.route('/author/:author')
    .get(function (req, res) {
        quote.find({author: new RegExp(req.params.author, "i")},
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data.length > 0) {
                    res.json({
                        data: data
                    })
                } else {
                    res.json({
                        message: 'No results'
                    })
                }
            })
    });

router.route('/book/:book')
    .get(function (req, res) {
        quote.find({book: new RegExp(req.params.book, "i")},
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data.length > 0) {
                    res.json({
                        data: data
                    })
                } else {
                    res.json({
                        message: 'No results'
                    })
                }
            })
    });

router.route('/quote/:text')
    .get(function (req, res) {
        quote.find({quote: new RegExp(req.params.text, "i")},
            function (err, data) {
                if (err) {
                    console.log(err)
                    return
                }
                if (data.length > 0) {
                    res.json({
                        data: data
                    })
                } else {
                    res.json({
                        message: 'No results'
                    })
                }
            })
    });

router.route('/delete/:id')
    .post(function (req, res) {
        quote.findOne({
                _id: req.params.id
            },
            function (err) {
                if (err) {
                    console.log(err)
                    return
                } else {
                    quote.remove({
                        _id: req.params.id
                    }, function (err, quote) {
                        if (err) {
                            console.log(err)
                            return
                        }
                        res.json({
                            message: 'Quote successfully deleted!',
                            ok: true
                        });
                    });
                }
            })

    });


module.exports = router