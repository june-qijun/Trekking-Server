'use strict';
const uuid = require('uuid');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NoteScheme = new Schema({
    _id: { type: String, default: uuid.v4 },
    title: String,
    content: String,
    map_ids: { type: [ String ], default: [] },
    user_id: {
      type: String,
      index: true,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('Note', NoteScheme);
};
