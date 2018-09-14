'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
  async create() {
    return true;
  }
}

module.exports = BaseService;
