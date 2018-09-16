'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/logout', controller.login.logout);
  router.post('/login/github', controller.login.githubLogin);
  router.resources('notes', '/api/v1/notes', controller.notes);
  router.resources('maps', '/api/v1/maps', controller.maps);
};
