'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LocationSchema = new Schema({
  locationName: {
    type: String,
    Required: 'Enter the name of the location.'
  },
  description: {
    type: String,
    Required: 'Enter the description of the location.'
  },
  zipCode: {
    type: String,
    Required: 'Enter the zip code of the location.'
  },
  province: {
    type: String,
    Required: 'Enter the province of the location.'
  },
  country: {
    type: String,
    Required: 'Enter the country of the location.'
  },
  city: {
    type: String,
    Required: 'Enter the city of the location.'
  },
  address: {
    type: String,
    Required: 'Enter the address of the location.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Locations', LocationSchema);