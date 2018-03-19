'use strict';
const Hapi = require('hapi');
const boom = require('boom');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const server = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST
});

const mongoDbUri = process.env.MONGO_URL;
const Webhook = require('./models/webhook.model');

mongoose.connect(mongoDbUri);
mongoose.connection.on('connected', () => {
  console.log(`app is connected to ${mongoDbUri}`);
});
mongoose.connection.on('error', err => {
  console.log('error while connecting to mongodb', err);
});

server.route({
  method: 'POST',
  path: '/webhook/brookby',
  handler: async (req, res) => {
    let modelData = {
      rego: req.payload.rego,
      latitude: req.payload.latitude,
      longitude: req.payload.longitude,
      address: req.payload.address,
      googleLocation: req.payload.googleLocation,
      timeNow: req.payload.timeNow,
      vehicleName: req.payload.vehicleName,
      odometer: req.payload.odometer,
    }
    try {
      const user = await Webhook.create(modelData);
      if (!user._id) {
        throw boom.badRequest('problem with data')
      } else {
        return {
          "success": "true",
          "id": user._id
        };
      }
    } catch (err) {
      console.log(err);
      throw boom.boomify(err)
    }
  }
})

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
