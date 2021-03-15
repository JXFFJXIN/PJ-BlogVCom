'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
  async index() {
    // GET /b 获取博客列表
    const { ctx } = this;
    const options = {
      limit: 10,
      offset: 0,
    };
    const req = await ctx.service.blogService.find(options);
    console.log(req);
  }
  async new() {
    // GET /b/new 获取添加博客的表单页面
    this.ctx.body = '新增博客的表单';
  }
  async show() {
    // GET /b/：id 获取某一篇博客
    const { ctx } = this;
    ctx.body = `获取第${ctx.params.id}篇的内容`;
  }
  async edit() {
    // GET /b/：id/edit 获取某一篇博客的编辑界面
    this.ctx.body = '博客编辑页面';
  }
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
  async update() {
    // PUT /b 修改一篇博客
    this.ctx.body = '处理提交的修改博客内容';
  }
  async destroy() {
    // DELETE /b/：id 删除一篇博客
    this.ctx.body = '删除博客';
  }
}

module.exports = BlogController;
