'use strict';

const Controller = require('egg').Controller;

class NotesController extends Controller {
  async create() {
    this.ctx.validate({
      title: { type: 'string' },
      content: { type: 'string' },
    });
    const { _id } = await this.ctx.service.note.create(this.ctx.request.body);
    this.ctx.body = {
      result: {
        id: _id,
      },
      status: 'ok',
    };
  }

  async update() {
    this.ctx.validate({
      id: { type: 'string' },
    }, this.ctx.params);
    this.ctx.validate({
      title: { type: 'string' },
      content: { type: 'string' },
    });
    if (!await this._checkAuthority(this.ctx, this.ctx.params.id)) {
      return;
    }
    const count = await this.ctx.service.note.update(
      Object.assign(this.ctx.request.body, {
        id: this.ctx.params.id,
      })
    );
    this.ctx.body = {
      result: {
        count,
      },
      status: 'ok',
    };
  }

  async index() {
    const notes = await this.ctx.service.note.getUserNotes(this.ctx.session.userId);
    this.ctx.body = {
      result: {
        notes,
      },
      status: 'ok',
    };
  }

  async show() {
    this.ctx.validate({
      id: { type: 'string' },
    }, this.ctx.params);
    if (!await this._checkAuthority(this.ctx, this.ctx.params.id)) {
      return;
    }
    const note = await this.ctx.service.note.getNote(this.ctx.params.id);
    this.ctx.body = {
      result: note,
      status: 'ok',
    };
  }

  async destroy() {
    this.ctx.validate({
      id: { type: 'string' },
    }, this.ctx.params);
    if (!await this._checkAuthority(this.ctx, this.ctx.params.id)) {
      return;
    }
    const count = await this.ctx.service.note.deleteNote(this.ctx.params.id);
    this.ctx.body = {
      result: {
        count,
      },
      status: 'ok',
    };
  }

  async _checkAuthority(ctx, id) {
    const authority = await this.ctx.service.note.hasAuthority(id);
    if (!authority) {
      ctx.status = 401;
      ctx.body = {
        result: {
          message: 'No authority.',
        },
        status: 'error',
      };
      return false;
    }
    return true;
  }
}

module.exports = NotesController;
