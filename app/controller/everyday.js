'use strict';

const { Controller } = require('egg');

module.exports = class extends Controller {
  /**
   * GET /ed
   * 获取数据
   * queryEveryDay
   */
  async index() {
    const { ctx } = this,
      result = await ctx.service.everyday.findED();
    console.log(result);
  }
  /**
   * POST /ed
   * 添加数据
   * editEvery
   */
  async create() {
    const { ctx } = this,
      { content } = ctx.request.body,
      op = {
        content,
      };
    const req = await ctx.service.everyday.addED(op);
    console.log(req);
  }
};
