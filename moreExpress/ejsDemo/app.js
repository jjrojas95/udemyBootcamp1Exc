var express = require('express');
var app = express();

// por defecto express revisará la carpeta views, así que se le cambia a la asignacion con la línea de abajo
app.use(express.static('public'));
// la linea que sigue es para que siempre tenga por defecto pensar en .ejs cuando vea los render
app.set('view engine', 'ejs');

app.get( '/' , function(req,res) {
  res.render('home');
});

// route ----> fallinlove/:thing
app.get( '/fallinlovewith/:thing', function(req,res){
  var thing = req.params.thing;
res.render('love', {thingVar: thing});
});
app.get( '/posts' , function(req,res){
  var posts = [
    { tittle: "Post 1", author: "Susy" },
    { tittle: "My adorable pet bunny", author: "Charlie" },
    { tittle: "can you believe this pomsky?", author: "Colt" }
  ];
  res.render("posts",{ posts: posts});
});

app.listen(3000, function(){
  console.log('listen by the port: 3000');
});