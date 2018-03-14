var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var index = require('./routes/index');
var users = require('./routes/users');
var request = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


app.post('/search',function (req,res) {
  console.log(req.body.topic);


  if (req.body.topic==null || req.body.topic=='') {
    res.render('error',{message : "No search parameters provided"});
  }else {

      var options = {
        url: 'https://api.github.com/search/repositories?q='+req.body.topic+'&sort=stars&order=desc',
        headers: {
          'User-Agent': 'demoApp'
        }
      };
      request(options, function (error, response, body) {
        // console.log('statusCode:', response.headers); // Print the response status code if a response was received
        var result = JSON.parse(body)
        res.render('index',{title : 'Demo App',query:req.body.topic,items:result.items});
      });
  };
});


app.listen(3001,function () {
  console.log("Listening on localhost/3001");
})
