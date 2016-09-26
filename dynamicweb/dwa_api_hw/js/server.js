var express = require('express');
var app = express();

//this is the same as
//var app = require('express')();

app.get('/', function(req, res){
  res.send(String(Math.random()));
});

app.use('/static', express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.status(404);
  res.send('404 - page not found');
});


app.listen(3001);

console.log('listening on port 3001');
