'use strict';


var mongoose = require('mongoose'),  
  Location = mongoose.model('Locations'),
  Favorite = mongoose.model('Favorites'),
  lat, lon = 0;

function render(pos) {
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  console.log(lat +","+ lon);
};


exports.list_all_locations = function(req, res) {
  Location.find({}, function(err, location) {
    if (err)
      res.send(err);
    res.json(location);
  });
};

exports.find_all_locations_near = function(req, res) {
  const $minDistance = req.params.minDistance;
  const $maxDistance = req.params.maxDistance;
  if ($minDistance > 0) 
  {
    Location.find({
      geolocation: 
      { 
          $near: 
          {
              $geometry: 
              {
                  type: "Point",
                  coordinates: [lat, lon]
              },
              $minDistance,
              $maxDistance
          }
      }
    }), function(err, location) {
      if (err) {
        //console.log(err);
        res.send(err);
      }
      else if (location =='')
        //res.json({ message: 'No location was found.' });
        res.json({ message: 'No location was found.' });
      else
      {
        res.json(location);
        res.json({ message: 'The end.' });
      }          
    };
  } else 
  {
    Location.find({}, function(err, location) {
      if (err)
        res.send(err);
      res.json(location);
      res.json(req.params.minDistance);
    });
  }  
}

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
  Location.findOneAndUpdate({"locationName": req.params.location}, req.body, {new: true}, function(err, location) {
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
    _id: req.params.favorite
  }, function(err, location) {
    if (err)
      res.send(err);
    res.json({ message: 'Favorite successfully deleted.' });
  });
};