var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose');

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground',campgroundSchema);

// Campground.create({
//   name: "Granite Hill", 
//   image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//   description: 'Now that there is the Tec-9, a crappy spray gun from South Miami'
// }, function(err,campground){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('el camp guardado es:');
//     console.log(campground);
//   }
// });

// FINISH SCHEMA SETUP


app.get('/',function(req,res){
  res.render('landing')
});

// INDEX route get
app.get('/campgrounds',function(req,res){
//   enter to database
  Campground.find({},function(err,allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds});
    }
  });
  
});

// CREATE route, generate a new item 
app.post('/campgrounds', function(req,res){
  var newName = req.body.name;
  var newImage = req.body.image;
  var newDescription = req.body.description;
  var newCampground = {
    name: newName,
    image: newImage,
    description: newDescription    
  };
//   create campgrounds in database
  Campground.create(newCampground,function(err,newlyCampgrund){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds'); 
    }
  });
  
});

// NEW route, display form to make new item
app.get('/campgrounds/new', function(req,res){
  res.render('new');
});

// SHOW route, show the camps description

app.get('/campgrounds/:id', function(req,res){
//   find campgound with the provide ID
  Campground.findById(req.params.id,function(err,selectCamp){
    if (err) {
      console.log(err);
    } else {
       res.render('show',{campground: selectCamp});
    }
  });
 
});

app.listen(3000,function(){
  console.log('The YelpCamp Server has started');
});