//simple library server config

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const CTAtimes = require('./get-cta-times.js');

const PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//router
  app.get('/getCTATimes', CTAtimes.getUpdate);

  // catchall
  app.get('*', (req,res) =>{
    res.sendFile(__dirname+'/public/map.html');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(PORT,()=>console.log("bus-map-server on "+PORT+" on "+new Date()));

module.exports = app;
