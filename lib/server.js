'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

app.use(express.static('public'));

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/todo', function(request, response) {
    response.end('Added todo: "' + request.query.todo + '"');
});

app.get('/:name', function(request, response) {
  response.render('name', { name: request.params.name, lastName: request.query.lastName, inseam: request.query.inseam });
  // response.json(request.query);
  // if(request.query.lastName) {
  //   response.end('Hello, ' + request.params.name + ' ' + request.query.lastName + '!');
  // } else {
  //   response.end('Hello, ' + request.params.name + '!');
  // }
});

app.post('/todo/new', function(request, response) {
  response.redirect('/todo?todo=' + request.body.todo);
});

// allow other modules to use the server
module.exports = app;
