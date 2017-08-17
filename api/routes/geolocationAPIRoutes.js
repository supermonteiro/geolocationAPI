'use strict';
module.exports = function(app) {
  var geolocation = require('../controllers/geolocationAPIController');
  var express = require('express');
  var router = express.Router();

  
  app.route('/')  
  	router.get('/', function(req, res, next) {
  	res.render('index', { title: 'ngTodo' });
  });  

  // geolocation Routes
  app.route('/api/places')
    .get(geolocation.list_all_locations);    

  app.route('/api/places/:location')
    .get(geolocation.read_a_location)
    .post(geolocation.post_a_location)
    .put(geolocation.update_a_location);
  
  app.route('/api/favorites')
    .get(geolocation.list_all_favorites);

  app.route('/api/favorite') 
    .post(geolocation.post_a_favorite);

   app.route('/api/favorite/:favorite') 
    .delete(geolocation.delete_a_favorite);
};
