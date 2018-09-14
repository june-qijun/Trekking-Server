'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NoteScheme = new Schema({
    title: String,
    content: String,
    map_ids: [ Schema.Types.ObjectId ],
    user_id: Schema.Types.ObjectId,
  }, {
    timestamps: true,
  });

  return mongoose.model('Note', NoteScheme);
};
