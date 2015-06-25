var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quote_dojo');//TODO: change to new DB

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {//displays all units
 res.render('index');
})

app.get('/page/:id', function(req, res) {//show specific unit
  Quote.find({}, function(err, quotes) {
  if (err) {return console.error(err);}
    // keep in mind that everything you want to do AFTER you get the data from the database must happen inside of this callback for it to be synchronous 
    // Make sure you handle the case for when there is an error as well as the case for when there is no error
    else{
    res.render('main');
    }
  })
})

app.get('/page/new', function(req, res) { //display form for making new item

})

app.post('/page', function(req, res) {//Should be the action attribute for the form in the above route (GET '/page/new').
 
  var quote = new Quote({name: req.body.name, quote: req.body.quote, created_at: d});
  quote.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added quote');
    }
  })
 res.redirect('/quote');
})


app.get('/page/:id/edit', function(req, res) { //display form for editing item

})

app.post('/page/:id', function(req, res) { //Should be the action attribute for the form in the above route (GET '/page/:id/edit')

})

app.post('/page/:id/destroy', function(req, res) { //Should delete the item from the database by ID.

})




app.listen(8000, function() {
 console.log("listening on port 8000");
})