var express = require('express');
var app = express();



//this is the same as
//var app = require('express')();

app.get('/', function(req, res){
        res.send('<h1>Home Page</h1> ');
});

app.get('/random', function(req, res){
  res.send(String(parseInt(String(Math.random() * 100))));
});

app.use('/static', express.static(__dirname + '/public'));


app.use( function(req, res){
        res.status(404);
        res.send('404 - not found ');
        next();
});



app.listen(3001);

console.log('listening on port 3001');
