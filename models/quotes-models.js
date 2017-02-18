var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random')

var quotesSchema = new Schema({
    quote: String,
    author: String,
    book: String
});

quotesSchema.plugin(random);

module.exports = mongoose.model('quote', quotesSchema);