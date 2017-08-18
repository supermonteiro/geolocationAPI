'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LocationSchema = new Schema({
  locationName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    Required: true
  },
  geolocation: { 
    type: { type: String, default:"Point" }, 
    coordinates: [Number], 
  },
  photos: { 
    data: Buffer, 
    contentType: String 
  },
  zipCode: {
    type: String,
    Required: true
  },
  province: {
    type: String,
    Required: true
  },
  country: {
    type: String,
    Required: true
  },
  city: {
    type: String,
    Required: true
  },
  address: {
    type: String,
    Required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Locations', LocationSchema);