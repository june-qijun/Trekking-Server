'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async createUserIfNotExistGithub(user) {
    const existUser = await this.ctx.model.User.findOne({ github_id: user.id });
    if (existUser) {
      this.logger.info(`User exist: ${user.name}`);
      return existUser;
    }
    this.logger.info(`Create user: ${user.name}`);
    const newUser = await this.ctx.model.User.create({
      github_id: user.id,
      name: user.name,
      origin_data: JSON.stringify(user),
    });
    return newUser;
  }
}

module.exports = UserService;
