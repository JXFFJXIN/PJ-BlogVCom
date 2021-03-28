'use strict';

const { Controller } = require('egg');

module.exports = class extends Controller {
  /**
   * GET /cmt/new ? page=X & pageSize=X
   * 获取标签
   * queryRandomCade
   */
  async new() {
    const { ctx } = this,
      { page = 1, pageSize = 10 } = ctx.request.query,
      op = {
        limit: parseInt(pageSize),
        offset: (parseInt(page) - 1) * parseInt(pageSize),
      },
      { count, rows } = await ctx.service.comment.findCmtAll(op),
      cmtList = [];
    rows.map(it => cmtList.push(it.dataValues));
    ctx.body = {
      success: true,
      data: {
        count,
        data: cmtList,
      },
    };
    ctx.status = 201;
  }
  /**
   * POST /cmt
   * 添加数据
   * addComment
   */
  async create() {
    const { ctx } = this,
      { blogId, userName, comment, userEmail = '未留下联系方式', parentId = -1 } = ctx.request.body,
      op = {
        blogId: parseInt(blogId),
        userName,
        comment,
        userEmail,
        parentId: parseInt(parentId),
      },
      req = await ctx.service.comment.addCmt(op);
    ctx.body = {
      success: true,
      data: req,
    };
    ctx.status = 201;
  }
  // 修改博客页面
  async edit() {
    // GET /b/：id/edit 获取某一篇博客的编辑界面
    this.ctx.body = '博客编辑页面';
  }
  async update() {
    // PUT /b 修改一篇博客
    this.ctx.body = '处理提交的修改博客内容';
  }
  async destroy() {
    // DELETE /b/：id 删除一篇博客
    this.ctx.body = '删除博客';
  }
};
