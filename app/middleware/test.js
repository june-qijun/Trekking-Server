'use strict';

module.exports = () => {
  return async function test(ctx, next) {
    ctx.session.userId = 'test';
    await next();
  };
};
