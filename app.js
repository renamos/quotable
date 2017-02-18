/**
 * Created by reneramos on 2/16/17.
 */
// server.js

// BASE SETUP
// =============================================================================
var config = require('./config.js')
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

//require routes
var QuotesRoutes = require('./routes/quotes')


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || 8888; // set our port

mongoose.connect(config.databaseURL); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to a database')
});

// more routes for our API will happen here


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/quotes', QuotesRoutes);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);