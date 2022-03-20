const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const LocationSchema = new mongoose.Schema({
    locationId: {
        type: String,
        required: [true, 'Please add a location ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Location ID must be less than 10 chars']
    },
    address: {
        type: String,
        required: [true, 'Please Add An Address']
    },
    operator: {
      type: String,
      required: [true, 'Please Add An Operaor']
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
      createdAt: {
          type: Date,
          default: Date.now
      },
      phonenumber: {
        type: String,
        maxlength: [10, 'Phone Number Must Contain 10 Digits']
      },
      status: {
        type: String
      }
});

// Geocode & Creating Location
LocationSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Location', LocationSchema);