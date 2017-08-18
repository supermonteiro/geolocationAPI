'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavoriteSchema = new Schema({
  locationID: {
    type: String,
    Required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: Number,
    Required: true
  }
});

module.exports = mongoose.model('Favorites', FavoriteSchema);