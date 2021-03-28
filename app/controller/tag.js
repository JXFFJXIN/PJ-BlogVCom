'use strict';

const { Controller } = require('egg');

module.exports = class extends Controller {
  /**
   * GET /tag
   * 查找所有内容
   * queryRandomTags
   */
  async index() {
    const { ctx } = this,
      { page = 1, pageSize = 10 } = ctx.query,
      op = {
        limit: parseInt(pageSize),
        offset: (parseInt(page) - 1) * parseInt(pageSize),
      },
      { rows, count } = await ctx.service.tag.findTagAll(op),
      tagList = [];
    rows.map(({ dataValues }) => tagList.push(dataValues));
    ctx.body = {
      success: true,
      data: {
        count,
        data: tagList,
      },
    };
    ctx.status = 201;
  }
  /**
   * GET /tag/:id
   * 安装id值进行查找数据
   * queryByTag,queryCountByTag
   */
  async show() {
    const { ctx } = this,
      { id } = ctx.params,
      op = {
        id: parseInt(id),
      },
      req = await ctx.service.tag.findTagById(op);
    ctx.body = {
      success: true,
      data: req,
    };
    ctx.status = 201;
  }
};
