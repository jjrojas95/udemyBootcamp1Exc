var express = require('express');
var app =  express();
var request = require('request')

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('search');
});

app.get('/results', function(req,res){
  var searchTerm = req.query.search;
  var urlSearch = 'http://www.omdbapi.com/?s=' + searchTerm;
  var apiKey = '&apikey=thewdb';
  var url = urlSearch + apiKey;
  request(url,function(error,response,body){
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render('results',{data: data});
    } else {
      
    }
  });
  
});

app.listen(3000,function(){
  console.log('Movie search, started!')
});