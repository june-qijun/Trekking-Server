'use strict';
const Service = require('egg').Service;

class MapService extends Service {
  async create({ userId, parentId, title, description }) {
    const { _id: id } = await this.ctx.model.Map.create({
      title,
      description,
      parent_id: parentId,
      user_id: userId,
    });
    return id;
  }

  async getUserMaps(userId) {
    return await this.ctx.model.Map.find({ user_id: userId });
  }

  async getMap(id) {
    return await this.ctx.model.Map.findOne({ _id: id });
  }

  async update({ id, parentId, title, description }) {
    const { n } = await this.ctx.model.Map.updateOne({
      _id: id,
    }, {
      parent_id: parentId,
      title,
      description,
    });
    return n;
  }

  async hasAuthority(id, userId) {
    const res = await this.ctx.model.Map.findOne({
      _id: id,
      user_id: userId,
    });
    return res !== null;
  }
}

module.exports = MapService;
