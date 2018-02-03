var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo_2');

var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model('Post', postSchema);
// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  post: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

var User = mongoose.model('User', userSchema);

Post.create({
  title: 'How to cook the best burger Pt2',
  content: 'bla bla bla'
}, function(err, postCreate) {
  if (err) {
    console.log(err);
  } else {
    User.findOne({
      email: 'bob@gmail.com'
    }, function(err, foundUser) {
      if (err) {
        console.log(err);

      } else {
        foundUser.post.push(postCreate._id);
        foundUser.save(function(err, data) {
          if (err) {
            console.log(err);

          } else {
            console.log(data);

          }
        });
      }
    })
  }
});