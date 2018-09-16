'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const githubUser = {
  id: '123',
  name: 'test',
};

describe('test/app/controller/home.test.js', () => {
  before(async () => {
    const ctx = app.mockContext();
    await ctx.model.User.deleteMany();
  });
  it('create user', async () => {
    const ctx = app.mockContext();
    const newUser = await ctx.service.user.createUserIfNotExistGithub(githubUser);
    assert(newUser);
    assert(newUser.name === 'test');
  });
});
