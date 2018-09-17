'use strict';
const uuid = require('uuid');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MapScheme = new Schema({
    _id: { type: String, default: uuid.v4 },
    title: String,
    description: String,
    parent_id: {
      type: String,
      index: true,
    },
    user_id: {
      type: String,
      index: true,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('Map', MapScheme);
};
