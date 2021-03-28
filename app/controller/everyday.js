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
    ctx.body = {
      success: true,
      data: result,
    };
    ctx.status = 201;
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
      },
      req = await ctx.service.everyday.addED(op);
    ctx.body = {
      success: true,
      data: req,
    };
    ctx.status = 201;
  }
};
