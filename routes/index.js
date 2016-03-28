var express = require('express');
var router = express.Router();
var multiIsbn = require('multi-isbn');
var db = require('../services/db.js')
multiIsbn.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/book', function(req, res) {


  var isbn = req.body.isbn.substring(0, 13);
  console.log(isbn)

  multiIsbn.find(isbn, function(err, data) {
    if (err) throw err
    if (!data.error) {
      book = new db.books(data.data[0]);
      book.save(function(err, doc) {
        if (err && err.code == 11000) {
          console.log('Book Already in System!')
          book = data.data[0];
          book.duplicate = true;
          res.send(book);
        } else {
          res.send(book);
          console.log(doc)
        }
      });

    } else {
      res.send(data);
    }
  })

});


router.get('/books', function(req, res) {
  db.books.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    res.send(doc);
  });
});


router.get('*', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
