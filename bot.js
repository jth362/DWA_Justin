var Twit = require('twit');
var fs = require('fs');

var celebFile = fs.readFileSync('corpora/celebrities.json', "utf8");
var celebs = JSON.parse(celebFile).celebrities;

var zodiacFile = fs.readFileSync('corpora/zodiac.json', "utf8");
var zodiac = JSON.parse(zodiacFile).zodiac;

var adverbFile = fs.readFileSync('corpora/adverbs.json', "utf8");
var adverbs = JSON.parse(adverbFile).adverbs;

var objectFile = fs.readFileSync('corpora/objects.json', "utf8");
var objects = JSON.parse(objectFile).objects;

var verbsFile = fs.readFileSync('corpora/verbs.json', "utf8");
var verbs = JSON.parse(verbsFile).verbs;

//load .env
require('dotenv').config();

var config = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
};

function randomChoice(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

function randomChoiceVerb(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index].past;
}


var T = new Twit(config);

function tweet(){
    
    var msg = 'WOW, ' + randomChoice(celebs)+ ' is such a ' + randomChoice(zodiac) + '!' + ' I heard they ' + randomChoice(adverbs) + ' ' + randomChoiceVerb(verbs) + ' a ' + randomChoice(objects) + '...';
   
 T.post('statuses/update', {status: msg}, tweeted);
    
function tweeted(err, data, response) {
    if(err){
        return console.log(err);
    }else{
     return console.log('Success: ' + data.text);
    }
  };
}
                         
setInterval(tweet, 5 * 60 * 1000);
tweet();