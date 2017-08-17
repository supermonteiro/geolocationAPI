'use strict';


var mongoose = require('mongoose'),
  //Task = mongoose.model('Tasks'),
  Location = mongoose.model('Locations'),
  Favorite = mongoose.model('Favorites');

exports.list_all_locations = function(req, res) {
  Location.find({}, function(err, location) {
    if (err)
      res.send(err);
    res.json(location);
  });
};

exports.post_a_location = function(req, res) {
  var new_location = new Location(req.body);
  new_location.save(function(err, location) {
    if (err)
      res.send(err);
    res.json(location);
  });
};

exports.read_a_location = function(req, res) {  
    Location.find({"locationName": req.params.location}, function(err, location) {
    if (err)
      res.send(err);
    else if (location =='')
      res.json({ message: 'Location not found.' });
    else
      res.json(location);    
  });
};

exports.update_a_location = function(req, res) {
  Location.findOneAndUpdate({_id: req.params.locationId}, req.body, {new: true}, function(err, location) {
    if (err)
      res.send(err);
    res.json(location);
  });
};

exports.list_all_favorites = function(req, res) {
  Favorite.find({}, function(err, favorite) {
    if (err)
      res.send(err);
    res.json(favorite);
  });
};

exports.post_a_favorite = function(req, res) {
  var new_favorite = new Favorite(req.body);
  new_favorite.save(function(err, favorite) {
    if (err)
      res.send(err);
    res.json(favorite);
  });
};

exports.delete_a_favorite = function(req, res) {
  Favorite.remove({
    _id: req.params.favoriteId
  }, function(err, location) {
    if (err)
      res.send(err);
    res.json({ message: 'Favorite successfully deleted.' });
  });
};