'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    github_id: String,
    name: String,
    origin_data: String,
  }, {
      timestamps: true,
    });

  return mongoose.model('User', UserSchema);
};
