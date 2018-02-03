var mongoose = require('mongoose'),
  Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [{
    name: 'Star\'s Camp',
    image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg',
    description: 'Blah blah blah blah'
  },
  {
    name: 'Darkness\'s Camp',
    image: 'https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg',
    description: 'Blah blah blah blah'
  },
  {
    name: 'House\'s Camp',
    image: 'https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg',
    description: 'Blah blah blah blah'
  }
];

function seedDB() {
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('removed campgrpunds!');
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if (err) {
            console.log(err);

          } else {
            console.log('added a campground')
            //create a comment
            Comment.create({
              text: "This place is greate, but I wish there was Internet",
              author: 'Homer'
            }, function(err,comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment._id);
                campground.save();
                console.log('created new comment')
              }
            });
          }
        });
      });
    }
  });

}

module.exports = seedDB;