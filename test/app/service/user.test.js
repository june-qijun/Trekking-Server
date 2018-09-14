'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  before(async () => {
    const ctx = app.mockContext();
    await ctx.model.User.remove();
  });
  it('create user', async () => {
    const ctx = app.mockContext();
    const user = {
      id: '123',
      name: 'test',
    };
    const newUser = await ctx.service.user.createUserIfNotExistGithub(user);
    assert(newUser);
    assert(newUser.name === 'test');
  });
});
