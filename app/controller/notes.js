'use strict';

const Controller = require('egg').Controller;

class NotesController extends Controller {
  async create() {
    const id = await this.ctx.service.notes.create();
    this.ctx.body = {
      result: {
        id,
      },
      status: 'ok',
    };
  }
}

module.exports = NotesController;
