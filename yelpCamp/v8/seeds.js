var mongoose = require('mongoose'),
  Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [{
    name: 'Star\'s Camp',
    image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg',
    description: 'Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb.'
},
  {
    name: 'Darkness\'s Camp',
    image: 'https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg',
    description: 'Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb.'
  },
  {
    name: 'House\'s Camp',
    image: 'https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg',
    description: 'Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that\'s what you see at a toy store. And you must think you\'re in a toy store, because you\'re here shopping for an infant named Jeb.'
  }
];

function seedDB() {
  Campground.remove({}, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('removed campgrpunds!');
//       data.forEach(function(seed) {
//         Campground.create(seed, function(err, campground) {
//           if (err) {
//             console.log(err);

//           } else {
//             console.log('added a campground')
//             //create a comment
//             Comment.create({
//               text: "This place is greate, but I wish there was Internet",
//               author: 'Homer'
//             }, function(err,comment) {
//               if (err) {
//                 console.log(err);
//               } else {
//                 campground.comments.push(comment._id);
//                 campground.save();
//                 console.log('created new comment')
//               }
//             });
//           }
//         });
//       });
//     }
  });

}

module.exports = seedDB;