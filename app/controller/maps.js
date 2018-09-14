'use strict';

const Controller = require('egg').Controller;

class MapsController extends Controller {
  async create() {
    const id = await this.ctx.service.maps.create();
    this.ctx.body = {
      result: {
        id,
      },
      status: 'ok',
    };
  }
}

module.exports = MapsController;
