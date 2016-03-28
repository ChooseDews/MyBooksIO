var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.db);

exports = {};



exports.books = mongoose.model('book', {

  title: { type: String, unique: true },
  publisher: String,
  publishedDate: Date,
  language: String,
  authors: [String],
  isbn13: Number,
  isbn10: Number

});


module.exports = exports;
