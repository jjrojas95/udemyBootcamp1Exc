var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  seedDB = require('./seeds');

// mongoose.Promise = global.Promise;
seedDB();
mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('landing')
});

// INDEX route get
app.get('/campgrounds', function(req, res) {
  //   enter to database
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        campgrounds: allCampgrounds
      });
    }
  });

});

// CREATE route, generate a new item 
app.post('/campgrounds', function(req, res) {
  var newName = req.body.name;
  var newImage = req.body.image;
  var newDescription = req.body.description;
  var newCampground = {
    name: newName,
    image: newImage,
    description: newDescription
  };
  //   create campgrounds in database
  Campground.create(newCampground, function(err, newlyCampgrund) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });

});

// NEW route, display form to make new item
app.get('/campgrounds/new', function(req, res) {
  res.render('new');
});

// SHOW route, show the camps description

app.get('/campgrounds/:id', function(req, res) {
  //   find campgound with the provide ID
  var campgroundSelected = Campground.findById(req.params.id);
    campgroundSelected.populate("comments").exec(function(err, selectCamp) {
    if (err) {
      console.log(err);
    } else {
      console.log(selectCamp);
      res.render('show', {
        campground: selectCamp
      });
    }
  });

});

app.listen(3000, function() {
  console.log('The YelpCamp Server has started');
});