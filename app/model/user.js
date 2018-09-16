'use strict';
const uuid = require('uuid');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    _id: { type: String, default: uuid.v4 },
    github_id: String,
    name: String,
    origin_data: String,
  }, {
    timestamps: true,
  });

  return mongoose.model('User', UserSchema);
};
