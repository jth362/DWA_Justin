//index.js
 
var express = require('express');
var hbs = require('express-handlebars');
 
var app = express();
 
var portNum = 1234;
app.set('port', portNum);
 
//tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
 
 
function getData(){
   return{
            shows:[
                {
                    title: "Stranger Things",
                    year_released: "2016",
                    genre: "science fiction"
                },
                {
                    title: "Breaking Bad",
                    year_released: "2012",
                    genre: "drama"
                },
                {  
                title: "The Walking Dead",
                year_released: "2016",
                genre: "horror"
                },
            ],
        };
}
 
app.use(function(req, res, next){
    if(!res.locals.partials)res.locals.partials={};
    res.locals.partials.dataContext = getData();
    next();
})
 
app.get('/:name', function(req, res){
   res.render('home', {
       name: req.params.name
   });
});
 
app.get('/', function(req, res){
    res.render('home',{
        //is this good coding practice? probably not
    });
});
 
app.listen(portNum, function(){
   console.log('listening on port', portNum);
});