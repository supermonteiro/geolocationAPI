'use strict';
module.exports = function(app) {
  var geolocation = require('../controllers/geolocationAPIController');


  // geolocation Routes
  app.route('/tasks')
    .get(geolocation.list_all_tasks)
    .post(geolocation.create_a_task);


  app.route('/tasks/:taskId')
    .get(geolocation.read_a_task)
    .put(geolocation.update_a_task)
    .delete(geolocation.delete_a_task);
};
