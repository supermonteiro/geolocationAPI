var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),  
  bodyParser = require('body-parser');

var Location = require("./api/models/LocationsModel");
var Favorite = require("./api/models/FavoritesModel");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/geolocationAPIRoutes');
routes(app);

app.get('/', function(req, res) {
    res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
app.use(express.static(__dirname + '/public'));//allows loading other scripts

console.log('geolocation RESTful API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});