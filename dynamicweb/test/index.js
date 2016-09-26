var express = require('express');
var app = express();

//app.use(function(req, res, next){
//  console.log('your name is ' + req.query.name);
//  next();
//});

// a random route
app.get('/random', function(req, res){
  res.send(String(Math.random()));
});

app.get('/profile/:name', function(req, res) {
  res.status(200);
  res.type('json');
  res.send({
    name: req.params.name
  });
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.status(404);
  res.send('404 - page not found');
});


app.listen(3001);

console.log('listening on port 3001');