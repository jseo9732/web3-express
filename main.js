var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic.js');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next) {
  fs.readdir('./data', function(error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use('/topic', topicRouter);
app.use('/', indexRouter);

app.use(function(request, response, next) {
  response.status(404).send('Sorry cant find that');
});

app.use(function(err, request, response, next) {
  console.error(err.stack);
  response.status(500).send('Something broke!');
});

app.listen(3000, () => console.log("3000번 포트에서 대기 중"));