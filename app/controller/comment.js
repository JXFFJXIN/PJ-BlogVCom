'use strict';

const { Controller } = require('egg');

module.exports = class extends Controller {
  /**
   * GET /cmt
   * 获取所有数据
   * queryCommentCount。queryCommentAll
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
   * GET /cmt/new
   * 获取验证码
   * queryRandomCade
   */
  async new() {
    this.ctx.body = '新增博客的表单';
  }
  /**
   * GET /cmt/:id
   * id查找数据
   * queryCommentByPage
   */
  async show() {
    const { ctx } = this;
    ctx.body = `获取第${ctx.params.id}篇的内容`;
  }
  /**
   * POST /cmt
   * 添加数据
   * addComment
   */
  async create() {
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
