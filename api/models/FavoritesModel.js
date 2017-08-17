'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
  locationID: {
    type: Number,
    Required: 'Enter the location ID of the favorite.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: Number,
    Required: 'Enter the user ID of the favorite.'
  }
});

module.exports = mongoose.model('Favorites', FavoriteSchema);