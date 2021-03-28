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
  router.resources('blogs', '/api/b', controller.blog);
  router.resources('everydays', '/api/ed', controller.everyday);
  router.resources('comments', '/api/cmt', controller.comment);
  router.resources('tags', '/api/tag', controller.tag);
  router.get('/api/test/:id', controller.test.get);
  router.post('/api/test/', controller.test.post);
  router.all('*', controller.home.index);
  // 中间件
  // 1. app.jsonp() 提供的JSONP安全中间件
};
