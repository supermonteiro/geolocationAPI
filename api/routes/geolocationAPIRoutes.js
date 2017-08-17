'use strict';
module.exports = function(app) {
  var geolocation = require('../controllers/geolocationAPIController');

  // geolocation Routes
  app.route('/api/places')
    .get(geolocation.list_all_locations);
    //.post(geolocation.create_a_location);

  app.route('/api/places/:location')
    .get(geolocation.read_a_location)
    .post(geolocation.post_a_location)
    .put(geolocation.update_a_location);
  
  app.route('/api/places/favorites')
    .get(geolocation.list_all_favorites);

  app.route('/api/places/favorite') 
    .post(geolocation.post_a_favorite);

   app.route('/api/places/favorite:favorite') 
    .delete(geolocation.delete_a_favorite);
};
