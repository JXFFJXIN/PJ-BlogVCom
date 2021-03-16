'use strict';

const { Controller } = require('egg');

module.exports = class extends Controller {
  /**
   * GET /tag
   * 查找所有内容
   * queryRandomTags
   */
  async index() {
    const { ctx } = this;
    const options = {
      limit: 10,
      offset: 0,
    };
    const req = await ctx.service.blogService.find(options);
    console.log(req);
  }
  /**
   * GET /tag/:id
   * 安装id值进行查找数据
   * queryByTag,queryCountByTag
   */
  async show() {
    const { ctx } = this;
    ctx.body = `获取第${ctx.params.id}篇的内容`;
  }
  /**
   * POST /tag
   * 添加数据
   */
  async create() {
    // POST /b 添加一篇博客
    // title,content,view,tag
    const { ctx } = this;
    ctx.validate({
      title: { type: 'string', require: 'true' },
      content: { type: 'string', require: 'true' },
      tag: { type: 'string', require: 'true' },
    });
    const op = ctx.request.body;
    const req = await ctx.service.blogService.add(op);
    console.log(req);
  }
};
