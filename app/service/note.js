'use strict';
const Service = require('egg').Service;

class NotesService extends Service {
  async create({ title, content }) {
    return await this.ctx.model.Note.create({
      title,
      content,
      user_id: this.ctx.session.userId,
    });
  }

  async update({ id, title, content }) {
    const res = await this.ctx.model.Note.updateOne(
      {
        _id: id,
      },
      {
        title,
        content,
      });
    return res.n;
  }

  async getUserNotes(userId) {
    return await this.ctx.model.Note.find({
      user_id: userId,
    });
  }

  async getNote(id) {
    return await this.ctx.model.Note.findOne({
      _id: id,
    });
  }

  async deleteNote(id) {
    const res = await this.ctx.model.Note.deleteOne({
      _id: id,
    });
    return res.n;
  }

  async hasAuthority(id) {
    const res = await this.ctx.model.Note.findOne({
      _id: id,
      user_id: this.ctx.session.userId,
    });
    return res !== null;
  }
}

module.exports = NotesService;
