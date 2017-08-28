'use strict';


var mongoose = require('mongoose'),
    Location = mongoose.model('Locations'),
    Favorite = mongoose.model('Favorites');
var lat = 0;
var lon = 0;

exports.list_all_locations = function (req, res) {
    Location.find({}, function (err, location) {
        if (err)
            res.send(err);
        res.json(location);
    });
};

exports.find_all_locations_near = function (req, res) {
    const $minDistance = req.query.minDistance;
    const $maxDistance = req.query.maxDistance;
    lat = req.query.lat;
    lon = req.query.lon;
    if ($minDistance > 0) {
        Location.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lat, lon] },
                    distanceField: "dist.calculated",
                    minDistance: $minDistance,
                    maxDistance: $maxDistance,
                    query: { type: "public" },
                    includeLocs: "dist.location",
                    num: 5,
                    spherical: true
                }
            }
        ]).pretty(), function (err, location) {
            if (err) {
                //console.log(err);
                res.send(err);
            }
            else if (location == '')
                //res.json({ message: 'No location was found.' });
                res.json({ message: 'No location was found.' });
            else {
                res.json(location);
                res.json({ message: 'The end.' });
            }
        };
    } else {
        Location.find({}, function (err, location) {
            if (err)
                res.send(err);
            res.json(location);
            res.json(req.params.minDistance);
        });
    }
}

exports.post_a_location = function (req, res) {
    var new_location = new Location(req.body);
    new_location.save(function (err, location) {
        if (err)
            res.send(err);
        res.json(location);
    });
};

exports.read_a_location = function (req, res) {
    Location.find({ "locationName": req.params.location }, function (err, location) {
        if (err)
            res.send(err);
        else if (location == '')
            res.json({ message: 'Location not found.' });
        else
            res.json(location);
    });
};

exports.update_a_location = function (req, res) {
    Location.findOneAndUpdate({ "locationName": req.params.location }, req.body, { new: true }, function (err, location) {
        if (err)
            res.send(err);
        res.json(location);
    });
};

exports.list_all_favorites = function (req, res) {
    Favorite.find({}, function (err, favorite) {
        if (err)
            res.send(err);
        res.json(favorite);
    });
};

exports.post_a_favorite = function (req, res) {
    var new_favorite = new Favorite(req.body);
    new_favorite.save(function (err, favorite) {
        if (err)
            res.send(err);
        res.json(favorite);
    });
};

exports.delete_a_favorite = function (req, res) {
    Favorite.remove({
        _id: req.params.favorite
    }, function (err, location) {
        if (err)
            res.send(err);
        res.json({ message: 'Favorite successfully deleted.' });
    });
};