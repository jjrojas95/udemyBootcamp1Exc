var bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose       = require('mongoose'),
express        = require('express'),
app            = express();


// APP CONFIG
mongoose.connect('mongodb://localhost/blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

// MONGOOSE/MODEL CONFIG
var blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now()
  }
});
var Blog = mongoose.model('Blog', blogSchema);
// Blog.create({
//   title: "Test Blog",
//   image: "https://i.pinimg.com/originals/7f/6c/47/7f6c4757d6192db84e913a24bb4b6613.jpg",
//   body: 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men'
// },function(err,newBlog){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Your post was created');
//     console.log(newBlog);
//   }
// });
// RESTFUL ROUTES

// INDEX ROUTE
app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, allBlogs) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        allBlogs: allBlogs
      });
    }
  });

});

// NEW ROUTE
app.get('/blogs/new', function(req, res) {
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', function(req, res) {
  //   create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render('new');
    } else {
      //   redirect to index
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTES
app.get('/blogs/:id', function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {
        blog: foundBlog
      });
    }
  });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {
        blog: foundBlog
      });

    }
  });

});

// UPDATE ROUTE
app.put('/blogs/:id', function(req, res) {
  //   Blog.findByIdAndUpdate(id,newdata,callback);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.rerdirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });

});

// DESTROY ROUTE
app.delete('/blogs/:id', function(req, res) {
  //   destroy the element
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs')
    }
  });
  //   redirect somewhere
});

app.get('/', function(req, res) {
  res.redirect('/blogs');
});


app.listen(3000, function() {
  console.log('Blog page has started!');
});