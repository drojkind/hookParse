//import the mongoose package
const mongoose = require('mongoose');
//get the Schema class
const Schema = mongoose.Schema;

const WebhookSchema = new Schema({
  rego: {
    required: true,
    type: String
  },
  latitude: {
    required: true,
    type: String
  },
  longitude: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String
  },
  googleLocation: {
    required: true,
    type: String
  },
  timeNow: {
    required: true,
    type: String
  },
  vehicleName: {
    required: true,
    type: String
  },
  odometer: {
    type: String
  },
});

module.exports = mongoose.model('Webhook', WebhookSchema);
