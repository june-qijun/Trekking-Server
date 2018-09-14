'use strict';

module.exports = () => {
  return async function passport(ctx, next) {
    if (!ctx.session.userId) {
      ctx.status = 401;
      ctx.body = 'Please login.';
    } else {
      await next();
    }
  };
};
