'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);
  router.resources('blogs', '/b', controller.blog);
  router.resources('everydays', '/ed', controller.everyday);
  router.get('/test/:id', controller.test.get);
  router.post('/test/', controller.test.post);
  // 中间件
  // 1. app.jsonp() 提供的JSONP安全中间件
};
