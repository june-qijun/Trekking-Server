'use strict';

const Controller = require('egg').Controller;

class MapsController extends Controller {
  async create() {
    this.ctx.validate({
      parentId: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    });
    const id = await this.ctx.service.map.create(
      Object.assign(this.ctx.request.body, {
        userId: this.ctx.session.userId,
      })
    );
    this.ctx.body = {
      result: {
        id,
      },
      status: 'ok',
    };
  }

  async index() {
    const maps = await this.ctx.service.map.getUserMaps(this.ctx.session.userId);
    this.ctx.body = {
      result: {
        maps,
      },
      status: 'ok',
    };
  }

  async show() {
    const { ctx } = this;
    ctx.validate({
      id: {
        type: 'string',
      },
    }, ctx.params);
    if (!await this._checkAuthority(ctx, ctx.params.id)) {
      return;
    }
    const map = await this.ctx.service.map.getMap(ctx.params.id);
    this.ctx.body = {
      result: {
        map,
      },
      status: 'ok',
    };
  }

  async update() {
    const { ctx } = this;
    ctx.validate({
      parentId: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    });
    ctx.validate({
      id: {
        type: 'string',
      },
    }, ctx.params);
    if (!await this._checkAuthority(ctx, ctx.params.id)) {
      return;
    }
    const count = await ctx.service.map.update(Object.assign(ctx.request.body, { id: ctx.params.id }));
    this.ctx.body = {
      result: {
        count,
      },
      status: 'ok',
    };
  }

  async delete() {
    const { ctx } = this;
    ctx.validate({
      id: {
        type: 'string',
      },
    }, ctx.params);
    if (!await this._checkAuthority(ctx, ctx.params.id)) {
      return;
    }
    const count = await this.ctx.service.map.delete(ctx.params.id);
    this.ctx.body = {
      result: {
        count,
      },
      status: 'ok',
    };
  }

  async _checkAuthority(ctx, id) {
    const authority = await this.ctx.service.map.hasAuthority(id, ctx.session.userId);
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

module.exports = MapsController;
