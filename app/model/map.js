'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MapScheme = new Schema({
    title: String,
    description: String,
    user_id: Schema.Types.ObjectId,
  }, {
    timestamps: true,
  });

  return mongoose.model('Map', MapScheme);
};
