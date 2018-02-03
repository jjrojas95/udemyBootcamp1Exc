var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');

var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model('Post', postSchema);
// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  post: [postSchema]
});

var User = mongoose.model('User', userSchema);

// POST - title, content



// var newUser = new User({
//   email: 'hermione@hogwarts.edu',
//   name: 'Hermione Granger'
// });
// newUser.post.push({
//   title: 'How to bre polyjuice potion',
//   content: 'Just kidding. Go to potion class to learn it'
// });

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// var newPost = new Post({
//   title: 'Reflections on Apples',
//   content: 'They are delicious'
// });
// newPost.save(function(err, post) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);

//   }
// });
User.findOne({
  name: 'Hermione Granger'
}, function(err, user) {
  if (err) {
    console.log(err);
  } else {
    user.post.push({
      title: '3 Things I really hate',
      content: 'Voldemort, Voldemort, Voldemort'
    });
    user.save(function(err, user) {
      if (err) {
        console.log(err);

      } else {
        console.log(user);

      }
    });
  }
});