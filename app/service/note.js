'use strict';
const Service = require('egg').Service;

class NotesService extends Service {
  async create() {
    return true;
  }
}

module.exports = NotesService;
