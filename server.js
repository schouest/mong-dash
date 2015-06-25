var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comicb');

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {//displays all units
 
 Comic.find({}, function(err, series) {
  if (err) {return console.error(err);}
    /*else{
       res.render('index', {comic: series});
    }*/
   res.render('index', {comic: series});
  })

})


app.get('/comic/new', function(req, res) { //display form for making new item
  res.render('addseries');
})


app.post('/comic', function(req, res) {//Should be the action attribute for the form in the above route (GET '/comic/new').
 console.log("POST DATA", req.body);
   var comic = new Comic({name: req.body.sname, publisher: req.body.pub, init_date: req.body.inidate, description: req.body.desc});
  comic.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added quote');
    }
  })
 res.redirect('/');
})

var ComicSchema = new mongoose.Schema({
name: String,
publisher: String,
init_date: Date,
description: String
})

var Comic = mongoose.model('Comic', ComicSchema);



app.get('/comic/:id', function(req, res) {//show specific unit
  Quote.find({}, function(err, quotes) {
  if (err) {return console.error(err);}
    // keep in mind that everything you want to do AFTER you get the data from the database must happen inside of this callback for it to be synchronous 
    // Make sure you handle the case for when there is an error as well as the case for when there is no error
    else{
    res.render('main');
    }
  })
})


app.get('/comic/:id/edit', function(req, res) { //display form for editing item

})

app.post('/comic/:id', function(req, res) { //Should be the action attribute for the form in the above route (GET '/comic/:id/edit')

})

app.post('/comic/:id/destroy', function(req, res) { //Should delete the item from the database by ID.

})


app.listen(8000, function() {
 console.log("listening on port 8000");
})
